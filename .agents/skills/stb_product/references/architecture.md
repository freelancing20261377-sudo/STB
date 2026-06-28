# STB Architecture Reference

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + Vite + TypeScript |
| Routing | React Router v6 (BrowserRouter) |
| Animations | `motion/react` (Framer Motion alias) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Maps | Leaflet + Nominatim OSM (no paid API key) |
| Geocoding | Nominatim OpenStreetMap REST API |
| HTTP client | Axios |
| Date picker | `react-datepicker` |
| Auth | JWT-based, `AuthContext` + `ProtectedRoute` |
| Server | Express.js via `tsx server.ts` |
| Dev server | Vite (`npm run dev` → `tsx server.ts`) |
| Icons | `lucide-react` |

---

## Directory Structure

```
src/
├── App.tsx                     # All routes defined here
├── index.css                   # Design tokens + Tailwind import
├── main.tsx                    # React entrypoint
├── components/                 # Shared reusable components
│   ├── BookingWidget.tsx       # Main booking form (hero + new-booking)
│   ├── CTA.tsx                 # Call-to-action section
│   ├── ExperiencesFilters.tsx  # Tour experiences with filters
│   ├── FleetIntro.tsx          # Fleet showcase section
│   ├── FleetSelection.tsx      # Vehicle results + selection UI
│   ├── Hero.tsx                # Full-screen hero carousel
│   ├── ImageWithFallback.tsx   # Image with retry logic + fallback
│   ├── LocationInput.tsx       # OSM autocomplete address input
│   ├── MapComponent.tsx        # Leaflet map (pickup + destination)
│   ├── Navbar.tsx              # Floating glassmorphism navbar
│   ├── ReviewsFAQ.tsx          # Reviews + FAQ section
│   └── WhyChooseUs.tsx         # Trust-builder section
├── pages/                      # Top-level public pages
│   ├── AllFleets.tsx           # Public fleet listing
│   ├── BookingFlow.tsx         # Guest booking flow (step wizard)
│   ├── LandingPage.tsx         # Homepage (assembles all sections)
│   ├── Login.tsx               # Multi-role login page
│   ├── Register.tsx            # Registration page
│   └── TourDetails.tsx         # Individual tour package page
├── layouts/
│   └── MainLayout.tsx          # Wraps Navbar + Outlet (public pages)
├── admin/                      # Admin panel (role: ADMIN)
│   ├── AdminLayout.tsx         # Sidebar + outlet
│   └── pages/
│       ├── Dashboard.tsx       # Stats, revenue charts
│       ├── Bookings.tsx        # All bookings table + filters
│       ├── BookingDetails.tsx  # Single booking management
│       ├── Vehicles.tsx        # Vehicle CRUD
│       ├── Packages.tsx        # Tour package CRUD
│       ├── Customers.tsx       # Customer list + details
│       ├── Content.tsx         # CMS for homepage content
│       ├── SEO.tsx             # Meta tags, OG, sitemap
│       ├── Reports.tsx         # Revenue + usage reports
│       └── Settings.tsx        # Platform settings
├── customer/                   # Customer portal (role: CUSTOMER)
│   ├── CustomerLayout.tsx
│   └── pages/
│       ├── Dashboard.tsx
│       ├── Bookings.tsx
│       ├── NewBooking.tsx      # BookingWidget + BookingFlow embedded
│       ├── BookingDetails.tsx
│       ├── Packages.tsx
│       ├── Support.tsx
│       └── Profile.tsx
├── partner/                    # Fleet/driver portal (OPERATOR/DRIVER)
│   ├── PartnerLayout.tsx
│   └── pages/
│       ├── Dashboard.tsx
│       ├── Bookings.tsx
│       ├── Vehicles.tsx
│       ├── Drivers.tsx
│       ├── Profile.tsx
│       └── FleetOnboarding.tsx
├── context/
│   ├── AuthContext.tsx         # JWT auth state + user role
│   └── ProtectedRoute.tsx      # Role-gated route wrapper
├── data/                       # Static/seed data files
└── server/
    └── auth.ts                 # Express auth routes
```

---

## Route Map

| Path | Component | Auth Required |
|---|---|---|
| `/` | LandingPage | No |
| `/tours/:slug` | TourDetails | No |
| `/booking` | BookingFlow | No (guest session) |
| `/fleets` | AllFleets | No |
| `/login/:type` | Login | No |
| `/register` | Register | No |
| `/admin/*` | AdminLayout → pages | ADMIN |
| `/customer/*` | CustomerLayout → pages | CUSTOMER |
| `/partner/*` | PartnerLayout → pages | OPERATOR / DRIVER |

---

## Authentication

- JWT stored in `localStorage` (or cookie — see `src/server/auth.ts`).
- `AuthContext` exposes `{ user, login, logout }`.
- `user` shape: `{ id, name, email, role: "ADMIN"|"CUSTOMER"|"OPERATOR"|"DRIVER" }`.
- `ProtectedRoute` checks `allowedRoles` and redirects to `/login/customer` on fail.
- Guest users get a `guestSessionId` in `localStorage` (random 15-char string).

---

## Key Component Patterns

### ImageWithFallback
```tsx
<ImageWithFallback
  src={dynamicUrl}
  alt="description"
  fallbackSrc="/singapore-night-exp.avif"
  maxRetries={2}
  className="w-full h-full object-cover"
/>
```
- Retries failed loads (except Unsplash and local paths).
- Shows fallback on final failure.

### LocationInput
```tsx
<LocationInput
  value={pickup}
  onChange={setPickup}
  onSelect={(lat, lon, address) => setPickupCoords({ lat, lon })}
  required
/>
```
- Debounced (300ms) OSM Nominatim search restricted to Singapore (`countrycodes=sg`).
- Dropdown with up to 5 results; dismisses on outside click.

### MapComponent
```tsx
<MapComponent
  pickupCoords={pickupCoords}       // { lat, lon } | null
  destinationCoords={destinationCoords}
  className="h-64 rounded-xl"
/>
```
- Leaflet map centred on Singapore by default.
- Pins update reactively as coords change.

---

## State Management Approach

| Concern | How |
|---|---|
| Auth state | React Context (`AuthContext`) |
| Booking search result | `sessionStorage` key `"bookingSearch"` |
| Cross-component booking event | `CustomEvent("bookingSearchEvt")` on `window` |
| Guest session | `localStorage` key `"guestSessionId"` |
| All other UI state | Local `useState` in each component |

No Redux, Zustand, or global store — keep state as local as possible.

---

## API Conventions

All API calls go to `/api/*` (Vite proxies to Express on same port).

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/search` | POST | Search available vehicles |
| `/api/booking-drafts` | POST | Save guest draft |
| `/api/booking-drafts/:sessionId` | GET | Restore guest draft |
| `/api/auth/*` | POST | Login / register / refresh |

### Search Request Shape
```ts
{
  bookingType: "hourly" | "daily" | "airport",
  pickup: string,
  pickupCoords: { lat: number; lon: number } | null,
  destination: string,
  destinationCoords: { lat: number; lon: number } | null,
  date: string,           // ISO string
  time: string,           // "HH:MM"
  duration: number,       // hours or days
  passengers: number,
  flightNumber?: string,
  pickupType?: "Arrival" | "Departure",
  airport?: string,
  terminal?: string,
}
```

### Search Response Shape
```ts
{
  vehicles: Vehicle[],
  travelDistance: number,   // km
  travelTime: number,       // minutes
  eta: string,
}
```

---

## Adding a New Page (Checklist)

1. Create component file in the appropriate directory.
2. Add `<Route>` in `src/App.tsx`.
3. If auth-required, wrap in `<ProtectedRoute allowedRoles={[...]}>`.
4. Add nav link to the relevant layout sidebar/nav.
5. Follow design system — use `motion.div` entry animations.
6. Add SEO `<title>` and `<meta name="description">` via a `<Helmet>`
   (or inline document.title in useEffect).
7. Make all page content admin-editable (no hardcoded strings in production).
