import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET =
  process.env.JWT_SECRET || "super_secret_jwt_key_should_be_changed";

// ── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_USERS: any[] = [
  { id: "1", email: "admin@example.com", role: "ADMIN", name: "Admin User" },
  { id: "2", email: "customer@example.com", role: "CUSTOMER", name: "Customer User" },
  { id: "3", email: "operator@example.com", role: "OPERATOR", name: "Fleet Operator" },
  { id: "4", email: "driver@example.com", role: "DRIVER", name: "Driver User" },
];

const mockCategories = [
  { id: "cat_1", name: "Luxury Sedans", max_passengers: 4, min_price: "150.00" },
  { id: "cat_2", name: "Executive MPVs", max_passengers: 7, min_price: "200.00" },
  { id: "cat_3", name: "Premium SUVs", max_passengers: 5, min_price: "180.00" },
  { id: "cat_4", name: "VIP Minibuses", max_passengers: 13, min_price: "300.00" },
];

const mockVehicles = [
  { id: "v_1", category_id: "cat_1", make: "Mercedes-Benz", model: "S-Class S450", seating_capacity: 4, license_plate: "SLS1234A", operator_id: "op_1" },
  { id: "v_2", category_id: "cat_2", make: "Toyota", model: "Alphard", seating_capacity: 7, license_plate: "SLS4455C", operator_id: "op_1" },
  { id: "v_3", category_id: "cat_3", make: "Mercedes-Benz", model: "GLS", seating_capacity: 5, license_plate: "SLS8888D", operator_id: "op_1" },
  { id: "v_4", category_id: "cat_4", make: "Mercedes-Benz", model: "Sprinter", seating_capacity: 13, license_plate: "SLS9999E", operator_id: "op_1" },
];

const mockBookings: any[] = [
  {
    id: "b_1",
    customer_id: "c_1",
    target_date: new Date().toISOString(),
    total_amount: "450",
    status: "CONFIRMED",
    notes: JSON.stringify({ customerName: "Alice Smith", bookingType: "airport", pickup: "Changi Airport", destination: "Marina Bay Sands" }),
    created_at: new Date().toISOString(),
  },
];

const mockDrafts: any[] = [];

// ── Auth middleware ────────────────────────────────────────────────────────
const requireAuth = (roles: string[] = []) => (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    if (roles.length > 0 && !roles.includes(decoded.role))
      return res.status(403).json({ error: "Forbidden" });
    req.user = decoded;
    next();
  });
};

function vehicleImage(catName: string) {
  if (catName === "Luxury Sedans") return "/executive sedan.jpg";
  if (catName === "Premium SUVs") return "/Luxury suv.webp";
  if (catName === "Executive MPVs") return "/Premium MPV-1.jpg";
  if (catName === "VIP Minibuses") return "/VIP Minibus.jpg";
  return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop";
}

// ── Auth routes ────────────────────────────────────────────────────────────
app.post("/api/auth/register", (req, res) => {
  const { email, role_name, first_name, last_name, company_name } = req.body;
  if (email && !MOCK_USERS.find((u) => u.email === email)) {
    MOCK_USERS.push({
      id: Date.now().toString(),
      email,
      role: role_name || "CUSTOMER",
      name: first_name ? `${first_name} ${last_name}` : company_name || "New User",
    });
  }
  res.json({ success: true, message: "Registered successfully" });
});

app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password, requestedRole } = req.body;
    let user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      const role =
        requestedRole ||
        (email.includes("admin") ? "ADMIN" : email.includes("operator") ? "OPERATOR" : "CUSTOMER");
      user = { id: Date.now().toString(), email, role, name: "Test User" };
      MOCK_USERS.push(user);
    } else if (requestedRole) {
      user = { ...user, role: requestedRole };
    }
    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        operatorProfile: user.role === "OPERATOR" ? { company_name: "Mock Operator Fleet" } : null,
        customerProfile: user.role === "CUSTOMER" ? { first_name: "Mock", last_name: "Customer" } : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/logout", (req, res) => res.json({ success: true }));
app.post("/api/auth/refresh", (req, res) => res.status(401).json({ error: "No active session" }));
app.post("/api/auth/forgot-password", (req, res) => res.json({ success: true, message: "Reset link sent if account exists." }));
app.post("/api/auth/reset-password", (req, res) => res.json({ success: true, message: "Password reset successful." }));

app.get("/api/auth/me", requireAuth(), (req: any, res) => {
  const user = MOCK_USERS.find((u) => u.id === req.user.id) || {
    id: req.user.id, email: "test@example.com", role: req.user.role,
  };
  res.json({
    user: {
      id: user.id, email: user.email, role: user.role,
      operatorProfile: user.role === "OPERATOR" ? { company_name: "Mock Operator Fleet" } : null,
      customerProfile: user.role === "CUSTOMER" ? { first_name: "Mock", last_name: "Customer" } : null,
    },
  });
});

// ── Vehicle / search routes ────────────────────────────────────────────────
app.get("/api/vehicles/meta", (req, res) => {
  res.json({ minRate: 80, maxRate: 500, categories: mockCategories.map((c) => c.name) });
});

app.post("/api/vehicles/filter", (req, res) => {
  const { passengers, categories, maxPrice } = req.body;
  let filtered = mockVehicles;
  if (passengers) filtered = filtered.filter((v) => v.seating_capacity >= passengers);
  if (categories?.length > 0) {
    filtered = filtered.filter((v) => {
      const cat = mockCategories.find((c) => c.id === v.category_id);
      return cat && categories.includes(cat.name);
    });
  }
  let results = filtered.map((v) => {
    const cat = mockCategories.find((c) => c.id === v.category_id)!;
    return {
      id: v.id, make: v.make, model: v.model,
      name: `${v.make} ${v.model}`, type: cat.name,
      capacity: v.seating_capacity, luggage: 4,
      licensePlate: v.license_plate,
      image: vehicleImage(cat.name),
      hourlyRate: Math.round(parseFloat(cat.min_price)),
      estimatedTotal: Math.round(parseFloat(cat.min_price) * 1.5),
      operatorName: "STB Fleet Operator",
    };
  });
  if (maxPrice) results = results.filter((r) => r.hourlyRate <= maxPrice);
  res.json({ vehicles: results });
});

app.get("/api/vehicle-categories", (req, res) => res.json(mockCategories));

app.post("/api/search", (req, res) => {
  const { passengers } = req.body;
  const filtered = mockCategories.filter((c) => c.max_passengers >= parseInt(passengers || "1"));
  const results = filtered.map((c) => ({
    id: c.id, name: c.name, type: c.name,
    capacity: c.max_passengers,
    luggage: Math.max(2, Math.floor(c.max_passengers / 2)),
    image: vehicleImage(c.name),
    estimatedTotal: Math.round(parseFloat(c.min_price) * 1.5),
  }));
  res.json({
    vehicles: results,
    travelDistance: "15.5 km",
    travelTime: "25 min",
    eta: new Date(Date.now() + 25 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  });
});

// ── Booking draft routes ───────────────────────────────────────────────────
app.post("/api/booking-drafts", (req, res) => {
  const { sessionId, searchParams } = req.body;
  const newDraft = { id: Date.now().toString(), session_id: sessionId, search_parameters: searchParams, is_converted: false };
  mockDrafts.push(newDraft);
  res.json(newDraft);
});

app.get("/api/booking-drafts/:sessionId", (req, res) => {
  const drafts = mockDrafts.filter((d) => d.session_id === req.params.sessionId && !d.is_converted);
  res.json(drafts.length > 0 ? drafts[drafts.length - 1] : null);
});

// ── Customer routes ────────────────────────────────────────────────────────
app.post("/api/booking/create", (req, res) => {
  const newBooking = {
    id: "b_" + Date.now(),
    customer_id: "c_" + Date.now(),
    target_date: req.body.date ? new Date(req.body.date).toISOString() : new Date().toISOString(),
    total_amount: req.body.totalPrice || 100,
    status: "PENDING",
    notes: JSON.stringify(req.body),
    created_at: new Date().toISOString(),
  };
  mockBookings.unshift(newBooking);
  res.json({ success: true, bookingId: newBooking.id });
});

app.get("/api/customer/bookings", requireAuth(["CUSTOMER", "ADMIN"]), (req, res) => {
  res.json(mockBookings.map((b) => {
    let details: any = {};
    try { details = JSON.parse(b.notes); } catch {}
    return { id: b.id, bookingType: details.bookingType || "Transport", date: b.target_date, status: b.status, amount: b.total_amount, details };
  }));
});

app.get("/api/customer/bookings/:id", requireAuth(["CUSTOMER", "ADMIN"]), (req, res) => {
  const b = mockBookings.find((bk) => bk.id === req.params.id);
  if (!b) return res.status(404).json({ error: "Booking not found" });
  let details: any = {};
  try { details = JSON.parse(b.notes); } catch {}
  res.json({ id: b.id, createdAt: b.created_at, date: b.target_date, status: b.status, amount: b.total_amount, details, assignedVehicle: { make: "Mercedes-Benz", model: "S-Class", license_plate: "SLS1234A" }, assignedDriver: { name: "John Doe", phone: "+65 9123 4567" } });
});

// ── Partner routes ─────────────────────────────────────────────────────────
app.get("/api/partner/dashboard", requireAuth(["OPERATOR"]), (req, res) => {
  res.json({ fleetSize: 5, driverCount: 3, activeTrips: 1, pendingTrips: 2, completedTrips: 15, monthlyRevenue: "15000.00", totalBookings: 18 });
});

app.get("/api/partner/bookings", requireAuth(["OPERATOR"]), (req, res) => {
  res.json(mockBookings.map((b) => {
    let details: any = {};
    try { details = JSON.parse(b.notes); } catch {}
    return { id: b.id, customerName: details.customerName || "Customer", customerEmail: "customer@example.com", bookingType: details.bookingType || "Transport", date: b.target_date, status: b.status, amount: b.total_amount, vehicleModel: "Mercedes-Benz S-Class", vehicleLicensePlate: "SLS1234A", details };
  }));
});

app.post("/api/partner/onboarding", requireAuth(["OPERATOR"]), (req, res) => res.json({ success: true }));

// ── Admin routes ───────────────────────────────────────────────────────────
app.get("/api/admin/dashboard", requireAuth(["ADMIN"]), (req, res) => {
  res.json({ totalRevenue: 25000, totalBookings: mockBookings.length, activeCustomers: 45, pendingBookings: mockBookings.filter((b) => b.status === "PENDING").length, recentBookings: mockBookings.slice(0, 5) });
});

app.get("/api/admin/bookings", requireAuth(["ADMIN"]), (req, res) => {
  res.json(mockBookings.map((b) => {
    let details: any = {};
    try { details = JSON.parse(b.notes); } catch {}
    return { id: b.id, customerName: details.customerName || "Customer", customerEmail: "customer@example.com", bookingType: details.bookingType || "Transport", date: b.target_date, status: b.status, amount: b.total_amount, details };
  }));
});

app.get("/api/admin/bookings/:id", requireAuth(["ADMIN"]), (req, res) => {
  const b = mockBookings.find((bk) => bk.id === req.params.id);
  if (!b) return res.status(404).json({ error: "Booking not found" });
  let details: any = {};
  try { details = JSON.parse(b.notes); } catch {}
  res.json({ id: b.id, customerName: details.customerName || "Customer", customerEmail: "customer@example.com", customerPhone: "+65 9123 4567", bookingType: details.bookingType || "Transport", date: b.target_date, status: b.status, amount: b.total_amount, createdAt: b.created_at, details, items: [] });
});

app.put("/api/admin/bookings/:id", requireAuth(["ADMIN"]), (req, res) => {
  const b = mockBookings.find((bk) => bk.id === req.params.id);
  if (b && req.body.status) b.status = req.body.status;
  res.json({ success: true });
});

app.post("/api/admin/bookings/:id/assign", requireAuth(["ADMIN"]), (req, res) => {
  const b = mockBookings.find((bk) => bk.id === req.params.id);
  if (b) b.status = "CONFIRMED";
  res.json({ success: true, status: "CONFIRMED" });
});

app.get("/api/admin/vehicles", requireAuth(["ADMIN"]), (req, res) => res.json(mockVehicles));
app.get("/api/admin/drivers", requireAuth(["ADMIN"]), (req, res) => {
  res.json([{ id: "d_1", name: "John Doe", phone: "+65 9123 4567", status: "AVAILABLE" }]);
});

// ── Vercel serverless export ───────────────────────────────────────────────
export default app;
