# STB Testing & Deployment Reference

## Development Environment

### Starting the Dev Server
```bash
cd "/Users/pranaveashwarang/Desktop/stb (3)"
npm run dev
# → tsx server.ts → Express + Vite on http://localhost:3000
```

### Port Conflicts
If port 3000 or 24678 is in use:
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:24678 | xargs kill -9
npm run dev
```

### TypeScript Check
```bash
npx tsc --noEmit
```

---

## Testing Strategy

### 1. Unit Tests

Target: Pure utility functions, derived state calculations, helper hooks.

Priority targets:
- `effectiveDuration` calculation in BookingWidget
- `numDays` date-range calculation
- Address parsing from Nominatim response
- `guestSessionId` generation logic

Tool: **Vitest** (recommended, Vite-native).

```bash
npx vitest run
```

Example test:
```ts
import { describe, it, expect } from "vitest";

describe("numDays calculation", () => {
  it("returns 1 for same day", () => {
    const start = new Date("2025-01-01");
    const end = new Date("2025-01-01");
    const numDays = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
    expect(numDays).toBe(1);
  });
  it("returns 3 for 3-day span", () => {
    const start = new Date("2025-01-01");
    const end = new Date("2025-01-03");
    const numDays = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
    expect(numDays).toBe(3);
  });
});
```

### 2. Component Tests

Target: Key interactive components.

Priority:
- `BookingWidget` — sub-tab switching, auto-search trigger, field validation
- `Navbar` — `pastHero` text color switching, visibility behaviour
- `LocationInput` — debounce, dropdown render, onSelect callback

Tool: **React Testing Library** + Vitest.

```bash
npm install -D @testing-library/react @testing-library/user-event
```

Mock `navigator.geolocation` and `axios` in BookingWidget tests.

### 3. Integration Tests

Target: Full user flows across multiple components.

Priority flows:
1. Homepage → fill booking widget → auto-search fires → loading overlay → /booking
2. Guest saves draft → returns → draft restored → re-search runs
3. Login → customer dashboard → new booking → fleet results
4. Admin: create vehicle → appears in search results

Tool: **Vitest** with `@testing-library/react`.

Mock `/api/search` to return fixture vehicle data.

### 4. End-to-End (E2E) Tests

Target: Real browser flows.

Tool: **Playwright**.

```bash
npm install -D @playwright/test
npx playwright install
npx playwright test
```

Priority test cases:
```ts
// e2e/booking.spec.ts
test("guest can complete booking flow", async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Allow location permission mock
  // Fill date picker
  await page.click('[data-testid="date-picker"]');
  await page.click('[data-testid="today-btn"]');
  // Wait for auto-search loading overlay
  await expect(page.locator("text=Finding Available Fleets")).toBeVisible();
  // Should navigate to /booking
  await page.waitForURL("**/booking");
  await expect(page.locator("text=Select Vehicle")).toBeVisible();
});
```

Add `data-testid` attributes to key interactive elements for E2E stability.

### 5. Performance Tests

Metrics to hit:
| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| TTI | < 3.5s |
| Bundle size (initial JS) | < 200kb gzipped |

Tools:
```bash
# Lighthouse CI
npx lhci autorun

# Vite bundle analysis
npx vite-bundle-analyzer
```

Optimisations already in place:
- `ImageWithFallback` — lazy loading, fallback, retry.
- Vite code splitting (each route is a lazy chunk).
- Nominatim calls debounced at 300ms.
- Geolocation uses `maximumAge: 60000` (cached GPS fix).

### 6. Accessibility (A11y)

Requirements:
- All interactive elements have `aria-label` or visible label.
- Keyboard navigation works (Escape closes dropdowns — implemented).
- Colour contrast ≥ 4.5:1 for body text.
- Hero text on dark overlay — white on `bg-black/40` ✅.
- Navbar dark text on light bg (past hero) ✅.

Tool:
```bash
npx axe-playwright  # within Playwright tests
```

### 7. Security Tests

- [ ] CSRF protection on all state-mutating API endpoints.
- [ ] JWT expiry and refresh token rotation.
- [ ] Input sanitisation (address fields, flight number).
- [ ] Rate limiting on `/api/search` (prevent scraping).
- [ ] Admin routes protected server-side (not just client role check).

---

## Build for Production

```bash
npm run build
# Output: dist/
```

Preview production build locally:
```bash
npx vite preview
```

Check for TypeScript errors before any deployment:
```bash
npx tsc --noEmit && echo "✅ Type check passed"
```

---

## Deployment Architecture

### Frontend
- **Platform**: Vercel (recommended) or Nginx static serve.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_API_URL`, `VITE_MAP_KEY` (if switching from OSM).

### Backend (Express)
- **Platform**: VPS (DigitalOcean / Hetzner) + PM2 + Nginx reverse proxy.
- Entry: `tsx server.ts` (dev) → `node dist/server.js` (prod, transpiled).
- PM2 config:
```json
{
  "name": "stb-api",
  "script": "dist/server.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production",
    "PORT": 4000
  }
}
```

### Database
- **PostgreSQL** on same VPS or managed (Supabase / Railway).
- **Prisma ORM** for migrations.
```bash
npx prisma migrate deploy   # production migrations
npx prisma generate         # generate client
```

### Nginx Config (reverse proxy)
```nginx
server {
  listen 80;
  server_name api.stb.com;

  location / {
    proxy_pass http://localhost:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Environment Variables

```env
# .env (never commit)
DATABASE_URL=postgresql://user:pass@host:5432/stb
JWT_SECRET=<strong-random-secret>
JWT_EXPIRY=7d
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_SECRET=xxx
PORT=4000
NODE_ENV=production
```

Frontend (Vite):
```env
VITE_API_BASE=/api
```

---

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy STB

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx vitest run
      - run: npx playwright install --with-deps
      - run: npx playwright test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_IP }}
          username: deploy
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /srv/stb-api
            git pull
            npm ci
            npx prisma migrate deploy
            pm2 reload stb-api
```

---

## Monitoring & Observability

| Concern | Tool |
|---|---|
| Error tracking | Sentry (frontend + backend) |
| Uptime monitoring | Better Uptime / UptimeRobot |
| Performance monitoring | Vercel Analytics (frontend) |
| API logs | PM2 logs + structured JSON via `pino` |
| Database | PgBouncer connection pooling + pg_stat_statements |

---

## Backup Strategy

- **Database**: Daily `pg_dump` to S3/Backblaze, 30-day retention.
- **Media assets**: Synced to Cloudflare R2 or S3.
- **Code**: GitHub is source of truth; never deploy from local machine.

---

## UAT Checklist (Before Each Release)

### Booking Flow
- [ ] Geolocation auto-detects on Chrome/Safari/Firefox.
- [ ] Denied permission → field empty, user can type manually.
- [ ] Hourly booking auto-searches after date selected.
- [ ] Daily single: auto-searches after date selected.
- [ ] Daily multiple: waits for both start AND end date.
- [ ] Loading overlay appears and disappears cleanly.
- [ ] Guest flow lands on `/booking` with results.
- [ ] Logged-in customer flow lands on `/customer/new-booking` with results.
- [ ] Draft recovery works on second visit.

### Navbar
- [ ] Completely hidden on homepage load.
- [ ] Appears on first scroll (smooth 600ms fade+slide).
- [ ] White text over hero image.
- [ ] Black text after scrolling below hero.
- [ ] Text color switches smoothly (500ms `transition-colors`).
- [ ] Hides on scroll down, re-appears on scroll up.
- [ ] Always visible + dark on non-home pages.
- [ ] "Sign in" dropdown opens and closes correctly.
- [ ] Escape key closes dropdowns.
- [ ] Mobile hamburger works.

### Admin Panel
- [ ] Login as ADMIN → redirected to `/admin/dashboard`.
- [ ] Dashboard stats load.
- [ ] Can view, edit, and update booking status.
- [ ] Can add / edit / delete vehicles.
- [ ] Can add / edit / delete tour packages.
- [ ] Content CMS updates reflect on homepage.

### Responsive
- [ ] Homepage hero full-screen on mobile.
- [ ] Booking widget fields stack cleanly on mobile.
- [ ] Navbar hamburger works on mobile.
- [ ] Admin panel is usable on tablet (sidebar collapses).
