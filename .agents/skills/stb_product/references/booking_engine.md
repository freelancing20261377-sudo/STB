# STB Booking Engine Reference

## Overview

The booking engine is the heart of the product. It must be:
- **Friction-free** — minimum taps/clicks to book.
- **Immersive** — no page reloads; everything is SPA state transitions.
- **Reliable** — graceful degradation on API/geo errors.

---

## Booking Types

| Type | `bookingType` value | Key Inputs |
|---|---|---|
| Hourly Booking | `"hourly"` | Pickup, Drop (optional), Date, Time, Duration (hrs), Passengers |
| Daily Booking – Single | `"daily"` | Pickup, Date, Time, Passengers |
| Daily Booking – Multiple | `"daily"` | Pickup, Start Date, End Date, Time, Passengers |
| Tour Package | `"tour"` | (handled separately via tour package CMS) |

---

## BookingWidget.tsx — State Map

```
activeTab: "vehicle" | "tour"           ← primary category (prop from parent)
vehicleSubTab: "hourly" | "daily"       ← vehicle sub-type (internal)
dailyMode: "single" | "multiple"        ← daily duration mode (internal)
airportDirection: "arrival"|"departure" ← (reserved, airport removed from UI)

pickup: string                           ← user-facing address
pickupCoords: { lat, lon } | null       ← used for map + API
destination: string                      ← hourly only
destinationCoords: { lat, lon } | null

date: Date | null
endDate: Date | null                     ← multiple-day daily only
time: string                             ← "HH:MM"
duration: string                         ← hours (hourly only)
passengers: string

geoStatus: "detecting"|"detected"|"failed"
isLoading: boolean
```

### Derived Values
```ts
const numDays = date && endDate
  ? Math.ceil((endDate - date) / 86400000) + 1 : 1;

const effectiveDuration =
  vehicleSubTab === "daily"
    ? (dailyMode === "multiple" ? numDays : 1)
    : parseInt(duration);
```

---

## Auto-Search Logic

```
Required fields:
  pickup (non-empty)
  date (non-null)
  endDate (if daily + multiple)

When ALL required fields satisfied:
  → debounce 800ms
  → call performSearch()

Any field change resets the 800ms debounce timer.
```

Implementation (`useEffect` dependency array):
```ts
[pickup, date, endDate, time, duration, passengers, vehicleSubTab, dailyMode]
```

Do NOT add `isLoading` to the dependency array — it causes a loop.
The guard `if (isLoading) return` inside `performSearch` prevents re-entry.

---

## Geolocation Auto-Detect

On component mount:
```
navigator.geolocation.getCurrentPosition(
  success → Nominatim reverse geocode → setPickup(address)
             → setPickupCoords({ lat, lon })
             → setGeoStatus("detected")
  failure → setGeoStatus("failed")   ← silent, user fills manually
  { timeout: 8000, maximumAge: 60000 }
)
```

Nominatim reverse endpoint:
```
GET https://nominatim.openstreetmap.org/reverse
  ?lat={lat}&lon={lon}&format=json
```

Response field used: `res.data.display_name`

---

## Loading Overlay

When `isLoading === true`, an `AnimatePresence` overlay covers the full
widget (`absolute inset-0 z-50`):

```
┌─────────────────────────────────┐
│                                 │
│   [Dual counter-rotating rings] │
│                                 │
│   Finding Available Fleets      │
│   Matching vehicles for trip…   │
│                                 │
│      ● ● ●  (pulsing dots)     │
│                                 │
└─────────────────────────────────┘
```

The outer ring spins amber (`border-t-[#E9A23B]`).
The inner ring (inset-6px) spins navy (`border-t-[#0a1128]/30`) in reverse.
The three dots animate with `opacity: [0.3,1,0.3], scale: [0.8,1.2,0.8]`
staggered by 0.2s each.

---

## performSearch() Flow

```
1. Guard: if (isLoading) return
2. setIsLoading(true)
3. Build searchParams object
4. POST /api/search → response
5. sessionStorage.setItem("bookingSearch", JSON.stringify({
     searchParams, results, tripMetadata
   }))
6. If guest (no user):
     - Get/create guestSessionId in localStorage
     - POST /api/booking-drafts  (save for recovery)
     - navigate("/booking")
   If authenticated:
     - If already on /customer/new-booking:
         dispatchEvent(new CustomEvent("bookingSearchEvt"))
       Else:
         navigate("/customer/new-booking")
7. catch: alert("Error finding vehicles...")
8. finally: setIsLoading(false)
```

---

## BookingFlow.tsx (Guest Flow)

File: `src/pages/BookingFlow.tsx`

Entry point after `performSearch()` for guest users.
Reads `sessionStorage.getItem("bookingSearch")` to restore search context.

Steps (approximate current implementation):
1. **Vehicle Selection** — display fleet results from `results` array.
2. **Extras / Add-ons** — optional add-ons.
3. **Passenger Details** — name, phone, email.
4. **Payment** — (Razorpay integration pending).
5. **Confirmation** — booking reference + summary.

`BookingFlow` can also be embedded inside the customer portal via
`<BookingFlow embedded={true} />`.

---

## Customer Portal Booking (NewBooking.tsx)

`/customer/new-booking` checks `sessionStorage("bookingSearch")`:

```
sessionStorage has data → render embedded BookingFlow
No data              → render BookingWidget (fresh search)
```

The `"bookingSearchEvt"` custom window event triggers `checkDraftAndData()`
when the user is already on `/customer/new-booking` and performs a new search
from within the page.

On logout / "Start Over": `sessionStorage.removeItem("bookingSearch")`.

---

## Draft Recovery

For guests, after a search is saved:
- `guestSessionId` stored in `localStorage`.
- Draft saved to `/api/booking-drafts` with `{ sessionId, searchParams }`.
- On next visit to `/customer/new-booking`, draft is fetched and
  a fresh `/api/search` is re-run with saved params (live results).

---

## Future Booking Features (Not Yet Built)

- [ ] Real-time vehicle availability via WebSocket
- [ ] Promo code / voucher input
- [ ] Preferred driver selection
- [ ] Recurring booking (weekly, monthly)
- [ ] Group bookings (split billing)
- [ ] WhatsApp confirmation notification
- [ ] Booking modification / cancellation flow

---

## Tour Package Flow

Currently: Tour Packages tab in BookingWidget → CTA button scrolls to
`#experiences` section → `ExperiencesFilters.tsx` shows tour cards →
`/tours/:slug` (TourDetails.tsx).

TourDetails.tsx contains tour-specific booking logic (separate from vehicle flow).

---

## Admin Booking Management

Admin can:
- View all bookings with status (Pending / Confirmed / In Progress / Completed / Cancelled).
- Edit booking details, assign vehicle/driver.
- Issue refunds.
- Export CSV.

See `src/admin/pages/Bookings.tsx` and `BookingDetails.tsx`.
