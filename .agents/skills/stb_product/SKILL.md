---
name: stb_product
description: >
  Master skill for the Singapore Tour Booking (STB) platform. Covers
  product vision, UX/UI design system, component architecture, booking
  engine, admin panel, testing strategy, and deployment. Load this skill
  whenever working on any part of the STB codebase.
---

# STB Product Skill

## What This Project Is

**Singapore Tour Booking (STB)** is a premium private-hire vehicle and
tour-package booking platform targeting Singapore visitors and residents.
The product must feel:

- **Immersive** — cinematic hero, full-bleed imagery, smooth transitions
- **Easy to book** — zero-friction flow; auto-detect location, auto-search
- **Premium** — glassmorphism, micro-animations, dark + light adaptive UI

---

## Current Build State

| Area | Status |
|---|---|
| Public homepage (Hero, Booking, Experiences, Fleet, CTA, Reviews) | ✅ Built |
| Booking widget (Vehicle: Hourly/Daily + Tour Packages) | ✅ Built |
| Auto-detect location (geolocation + Nominatim reverse geocode) | ✅ Built |
| Auto-search on field completion (debounced useEffect) | ✅ Built |
| Glassmorphism transparent navbar (scroll-aware, hero-adaptive text) | ✅ Built |
| Guest booking flow (`/booking` → BookingFlow.tsx) | ✅ Built |
| Customer portal (`/customer/*`) | ✅ Built |
| Partner/Fleet portal (`/partner/*`) | ✅ Built |
| Admin panel (`/admin/*` — 10 pages) | ✅ Built |
| Authentication (JWT, role-based: ADMIN / CUSTOMER / OPERATOR / DRIVER) | ✅ Built |
| Leaflet map in booking widget | ✅ Built |
| Payment integration | ⏳ Pending |
| SMS / Email notifications | ⏳ Pending |
| PWA / offline support | ⏳ Pending |

---

## Core Rules for Every AI Agent

1. **Never break existing animations, design, or spacing** unless
   explicitly asked. Read the design system references first.
2. **Never hardcode content** — all section text must be admin-editable.
3. **Preserve glassmorphism patterns** in all new navbar or overlay work.
4. **Booking state flows through sessionStorage** (`"bookingSearch"`)
   and a custom event (`"bookingSearchEvt"`).
5. **Auto-search, not manual submit** — the BookingWidget fires
   `performSearch()` automatically via debounced useEffect.
6. **The brand amber is `#E9A23B`** and the dark navy is `#0a1128`.
   Never introduce new primary colors without approval.
7. **Read the reference files before any feature work** in a specific domain.

---

## Reference Files

| File | When to Read |
|---|---|
| [ux_design_system.md](references/ux_design_system.md) | Before any UI, animation, or styling work |
| [architecture.md](references/architecture.md) | Before adding routes, components, or API endpoints |
| [booking_engine.md](references/booking_engine.md) | Before touching BookingWidget, BookingFlow, or search API |
| [testing_deployment.md](references/testing_deployment.md) | Before running tests or deploying |
