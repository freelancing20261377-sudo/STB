# STB UX & Design System Reference

## Vision

The STB interface must feel like a **premium concierge service in digital form**.
Every interaction should be smooth, intentional, and confidence-inspiring.
The user should never feel confused about what to do next.

---

## Brand Identity

| Token | Value |
|---|---|
| Primary amber | `#E9A23B` |
| Dark navy | `#0a1128` |
| Slate background | `bg-slate-50` (`#f8fafc`) |
| Success green | `text-emerald-500` |
| Error red | `#ba1a1a` |
| Border subtle | `border-gray-100` / `border-gray-200` |
| Shadow premium | `shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)]` |

---

## Typography

Loaded from Google Fonts in `src/index.css`:

| Role | Font | Weight |
|---|---|---|
| UI default | `Inter` | 400 / 500 / 600 / 700 |
| Headings / hero | `Manrope` | 700 / 800 |
| Display (serif accent) | `Playfair Display` | 600 / italic 400 |
| Data / mono labels | `JetBrains Mono` | 500 |
| Body rich text | `Plus Jakarta Sans` | 400–700 |

Hero heading rule: `font-light tracking-tight leading-[1.05]` —
**never** use `font-bold` on full-screen hero text. It feels heavy.

---

## Animation Principles

### Spring Defaults
```ts
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```
Use for tab indicators, pill toggles, tooltips.

### Fade + Slide (Page / Section)
```ts
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```
Use for section reveals, widget entry, modals.

### Stagger Children
```ts
// Parent
transition={{ staggerChildren: 0.1 }}
// Child
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
```
Use for card grids, filter lists, result sets.

### Micro-interaction (hover)
```css
hover:scale-[1.02] transition-all duration-200
```
Use on cards and CTA buttons. Never exceed `scale-[1.05]`.

### Rules
- **No abrupt changes** — everything transitions.
- **Use `AnimatePresence` with `mode="wait"`** for form/tab switches.
- **Use `layoutId`** for tab underline animations (shared layout).
- Use `motion/react` (not `framer-motion` import — alias is `motion/react`).

---

## Glassmorphism Patterns

### Navbar pill (floating)
```tsx
// Over hero (dark bg) — white text
className="bg-white/8 border border-white/10 backdrop-blur-[14px]"
// Past hero / non-home (light bg) — dark text
className="bg-white/75 border border-gray-200/60 backdrop-blur-[14px]"
```

### Modals / overlays
```tsx
className="bg-white/95 backdrop-blur-sm"
```

### Cards on dark
```tsx
className="bg-white/10 border border-white/15 backdrop-blur-md"
```

---

## Navbar Behaviour

- **Hidden on homepage load** (`isVisible = false` initially when `isHome`).
- **Appears on first scroll** (fade + slide from `-20px` to `0`, 600ms `ease-out`).
- **Direction-aware**: hides on scroll-down, re-appears on scroll-up.
- **pastHero detection**: when `scrollY > window.innerHeight * 0.85`:
  - `useWhiteText = false` → dark text, `bg-white/75` background.
  - Below that threshold: `useWhiteText = true` → white text, transparent bg.
- **Non-home pages**: always visible (`isVisible = true`), always dark text.
- State: `isVisible`, `scrolled`, `pastHero` in `Navbar.tsx`.

---

## Hero Section

File: `src/components/Hero.tsx`

- Full-screen carousel (`min-h-[100svh]` / `lg:h-[850px]`).
- 5 slides cycling every 5 seconds; draggable (`drag="x"`).
- Subtle Ken Burns scale: `initial={scale:1.05} animate={scale:1}` over 6s.
- Dark overlay `bg-black/40` over image for text contrast.
- Heading: `font-light` large text, fade + slide per slide.
- Carousel dots: `h-1.5 rounded-full` — active is `w-8 bg-white`, inactive `w-2 bg-white/40`.
- Booking widget sits in a `relative z-20 -mt-24 lg:-mt-32` section below.

---

## Booking Widget UX

File: `src/components/BookingWidget.tsx`

### Tab Hierarchy
```
Primary tabs:  [Vehicle Booking]  [Tour Packages]
                     │
              Sub-tabs (pills):
              [Hourly Booking] [Daily Booking]
                                    │
                             [Single Day] [Multiple Days]
```

### UX Rules
1. **Auto-detect pickup** on mount via `navigator.geolocation` →
   Nominatim reverse geocode → fills `pickup` field.
   - Label shows spinner while detecting, green dot + "Auto-detected" on success.
   - Silently falls back to manual input on failure.
2. **No submit button** — search fires automatically 800ms after last field change
   when `pickup && date && (not multiple-day OR endDate is set)`.
3. **Loading overlay** covers full widget when `isLoading`:
   - Dual counter-rotating spinner rings (amber + navy).
   - "Finding Available Fleets" heading + pulsing dots.
4. **AnimatePresence `mode="wait"`** on the form div — triggers on
   `vehicleSubTab + dailyMode + airportDirection` key change.
5. **Leaflet map** always visible below the form, updates as coords change.

### Form Fields by Mode

| Mode | Required Fields | Optional |
|---|---|---|
| Hourly | Pickup, Date, Time, Duration, Passengers | Drop Location |
| Daily Single | Pickup, Date, Time, Passengers | — |
| Daily Multiple | Pickup, Start Date, End Date, Time, Passengers | — |
| Tour Packages | (CTA only — scrolls to #experiences) | — |

---

## Design Anti-Patterns (Never Do)

- ❌ Plain white background on hero text (must have dark overlay).
- ❌ `font-bold` on full-screen hero headings.
- ❌ Hard-coded `#ff0000` or raw CSS color values — use design tokens.
- ❌ Alert dialogs for errors — use inline toasts or inline field messages.
- ❌ Page reload to switch booking sub-types — must be SPA state only.
- ❌ Showing both white and dark text variants simultaneously.
- ❌ Adding buttons inside `motion.div` form without `AnimatePresence` exit.

---

## Responsive Breakpoints (Tailwind)

| Breakpoint | Width | Usage |
|---|---|---|
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop (primary) |
| `xl:` | 1280px | Wide screens |

Mobile-first: default = mobile, scale up with breakpoint prefixes.
