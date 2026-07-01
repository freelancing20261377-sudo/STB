import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { authRouter, requireAuth } from "./src/server/auth";

export async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // Mock Database
  const mockCategories = [
    {
      id: "cat_1",
      name: "Luxury Sedans",
      max_passengers: 4,
      min_price: "150.00",
    },
    {
      id: "cat_2",
      name: "Executive MPVs",
      max_passengers: 7,
      min_price: "200.00",
    },
    {
      id: "cat_3",
      name: "Premium SUVs",
      max_passengers: 5,
      min_price: "180.00",
    },
    {
      id: "cat_4",
      name: "VIP Minibuses",
      max_passengers: 13,
      min_price: "300.00",
    },
  ];

  const mockVehicles = [
    {
      id: "v_1",
      category_id: "cat_1",
      make: "Mercedes-Benz",
      model: "S-Class S450",
      seating_capacity: 4,
      license_plate: "SLS1234A",
      operator_id: "op_1",
    },
    {
      id: "v_2",
      category_id: "cat_2",
      make: "Toyota",
      model: "Alphard",
      seating_capacity: 7,
      license_plate: "SLS4455C",
      operator_id: "op_1",
    },
    {
      id: "v_3",
      category_id: "cat_3",
      make: "Mercedes-Benz",
      model: "GLS",
      seating_capacity: 5,
      license_plate: "SLS8888D",
      operator_id: "op_1",
    },
    {
      id: "v_4",
      category_id: "cat_4",
      make: "Mercedes-Benz",
      model: "Sprinter",
      seating_capacity: 13,
      license_plate: "SLS9999E",
      operator_id: "op_1",
    },
  ];

  const mockDrafts: any[] = [];
  const mockBookings: any[] = [];

  // Auth API
  app.use("/api/auth", authRouter);

  // API Routes
  app.post("/api/search", async (req, res) => {
    try {
      const { bookingType, pickup, passengers } = req.body;
      const filtered = mockCategories.filter(
        (c) => c.max_passengers >= parseInt(passengers || "1"),
      );

      const results = filtered.map((c) => {
        let image =
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop";
        if (c.name === "Luxury Sedans") image = "/fleets/benz c class.avif";
        if (c.name === "Premium SUVs") image = "/fleets/benz gls.avif";
        if (c.name === "Executive MPVs") image = "/fleets/Toyota alphard.jpg";
        if (c.name === "VIP Minibuses") image = "/fleets/Mercedes-Benz Sprinter.jpeg";

        return {
          id: c.id,
          name: c.name,
          type: c.name,
          capacity: c.max_passengers,
          luggage: Math.max(2, Math.floor(c.max_passengers / 2)),
          image,
          estimatedTotal: Math.round(parseFloat(c.min_price) * 1.5),
        };
      });

      res.json({
        vehicles: results,
        travelDistance: "15.5 km",
        travelTime: "25 min",
        eta: new Date(Date.now() + 25 * 60000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/vehicle-categories", (req, res) => {
    res.json(mockCategories);
  });

  app.get("/api/vehicles/meta", (req, res) => {
    res.json({
      minRate: 80,
      maxRate: 500,
      categories: mockCategories.map((c) => c.name),
    });
  });

  app.post("/api/vehicles/filter", (req, res) => {
    const { passengers, categories, maxPrice } = req.body;

    let filtered = mockVehicles;

    if (passengers) {
      filtered = filtered.filter((v) => v.seating_capacity >= passengers);
    }

    if (categories && categories.length > 0) {
      filtered = filtered.filter((v) => {
        const cat = mockCategories.find((c) => c.id === v.category_id);
        return cat && categories.includes(cat.name);
      });
    }

    const results = filtered.map((v) => {
      const cat = mockCategories.find((c) => c.id === v.category_id)!;
      let image =
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop";

      if (cat.name === "Luxury Sedans") image = "/fleets/benz c class.avif";
      if (cat.name === "Premium SUVs") image = "/fleets/benz gls.avif";
      if (cat.name === "Executive MPVs") image = "/fleets/Toyota alphard.jpg";
      if (cat.name === "VIP Minibuses") image = "/fleets/Mercedes-Benz Sprinter.jpeg";

      return {
        id: v.id,
        make: v.make,
        model: v.model,
        name: `${v.make} ${v.model}`,
        type: cat.name,
        capacity: v.seating_capacity,
        luggage: 4,
        licensePlate: v.license_plate,
        image,
        hourlyRate: Math.round(parseFloat(cat.min_price)),
        estimatedTotal: Math.round(parseFloat(cat.min_price) * 1.5),
        operatorName: "Mock Fleet Operator",
      };
    });

    if (maxPrice) {
      res.json({ vehicles: results.filter((r) => r.hourlyRate <= maxPrice) });
    } else {
      res.json({ vehicles: results });
    }
  });

  app.post("/api/booking-drafts", (req, res) => {
    const { sessionId, searchParams } = req.body;
    const newDraft = {
      id: Date.now().toString(),
      session_id: sessionId,
      search_parameters: searchParams,
      is_converted: false,
    };
    mockDrafts.push(newDraft);
    res.json(newDraft);
  });

  app.get("/api/booking-drafts/:sessionId", (req, res) => {
    const drafts = mockDrafts.filter(
      (d) => d.session_id === req.params.sessionId && !d.is_converted,
    );
    res.json(drafts.length > 0 ? drafts[drafts.length - 1] : null);
  });

  app.post(
    "/api/booking-drafts/convert",
    requireAuth(["CUSTOMER", "ADMIN"]),
    (req, res) => {
      const { sessionId } = req.body;
      const draft = mockDrafts.find(
        (d) => d.session_id === sessionId && !d.is_converted,
      );
      if (!draft) return res.status(404).json({ error: "Draft not found" });

      draft.is_converted = true;

      const params = draft.search_parameters;
      const newBooking = {
        id: "b_" + Date.now(),
        customer_id: (req as any).user?.id || "c_guest",
        target_date: params.date
          ? new Date(params.date).toISOString()
          : new Date().toISOString(),
        total_amount: params.totalPrice || 100,
        status: "PENDING",
        notes: JSON.stringify({
          ...params,
          bookingType: params.bookingType || "Transport",
        }),
        created_at: new Date().toISOString(),
      };
      mockBookings.unshift(newBooking);

      res.json({ success: true, bookingId: newBooking.id });
    },
  );

  app.get("/api/partner/dashboard", requireAuth(["OPERATOR"]), (req, res) => {
    res.json({
      fleetSize: 5,
      driverCount: 3,
      activeTrips: 1,
      pendingTrips: 2,
      completedTrips: 15,
      monthlyRevenue: "15000.00",
      totalBookings: 18,
    });
  });

  app.get("/api/partner/bookings", requireAuth(["OPERATOR"]), (req, res) => {
    res.json(
      mockBookings.map((b) => {
        let details: any = {};
        try {
          details = JSON.parse(b.notes);
        } catch (e) {}
        return {
          id: b.id,
          customerName: details.customerName || "Customer",
          customerEmail: "customer@example.com",
          bookingType: details.bookingType || "Transport",
          date: b.target_date,
          status: b.status,
          amount: b.total_amount,
          vehicleModel: "Mercedes-Benz S-Class",
          vehicleLicensePlate: "SLS1234A",
          details,
        };
      }),
    );
  });

  app.post("/api/partner/onboarding", requireAuth(["OPERATOR"]), (req, res) => {
    res.json({ success: true });
  });

  app.post("/api/booking/create", (req, res) => {
    const {
      bookingType,
      pickup,
      destination,
      date,
      time,
      customerName,
      totalPrice,
    } = req.body;
    const newBooking = {
      id: "b_" + Date.now(),
      customer_id: "c_" + Date.now(),
      target_date: date
        ? new Date(date).toISOString()
        : new Date().toISOString(),
      total_amount: totalPrice || 100,
      status: "PENDING",
      notes: JSON.stringify(req.body),
      created_at: new Date().toISOString(),
    };
    mockBookings.unshift(newBooking);
    res.json({ success: true, bookingId: newBooking.id });
  });

  app.get(
    "/api/customer/bookings",
    requireAuth(["CUSTOMER", "ADMIN"]),
    (req, res) => {
      res.json(
        mockBookings.map((b) => {
          let details: any = {};
          try {
            details = JSON.parse(b.notes);
          } catch (e) {}
          return {
            id: b.id,
            bookingType: details.bookingType || "Transport",
            date: b.target_date,
            status: b.status,
            amount: b.total_amount,
            details,
          };
        }),
      );
    },
  );

  app.get(
    "/api/customer/bookings/:id",
    requireAuth(["CUSTOMER", "ADMIN"]),
    (req, res) => {
      const b = mockBookings.find((bk) => bk.id === req.params.id);
      if (!b) return res.status(404).json({ error: "Booking not found" });
      let details: any = {};
      try {
        details = JSON.parse(b.notes);
      } catch (e) {}

      res.json({
        id: b.id,
        createdAt: b.created_at,
        date: b.target_date,
        status: b.status,
        amount: b.total_amount,
        details,
        assignedVehicle: {
          make: "Mercedes-Benz",
          model: "S-Class",
          license_plate: "SLS1234A",
        },
        assignedDriver: { name: "John Doe", phone: "+65 9123 4567" },
      });
    },
  );

  app.get("/api/admin/dashboard", requireAuth(["ADMIN"]), (req, res) => {
    res.json({
      totalRevenue: 25000,
      totalBookings: mockBookings.length,
      activeCustomers: 45,
      pendingBookings: mockBookings.filter((b) => b.status === "PENDING")
        .length,
      recentBookings: mockBookings.slice(0, 5),
    });
  });

  app.get("/api/admin/bookings", requireAuth(["ADMIN"]), (req, res) => {
    res.json(
      mockBookings.map((b) => {
        let details: any = {};
        try {
          details = JSON.parse(b.notes);
        } catch (e) {}
        return {
          id: b.id,
          customerName: details.customerName || "Customer",
          customerEmail: "customer@example.com",
          bookingType: details.bookingType || "Transport",
          date: b.target_date,
          status: b.status,
          amount: b.total_amount,
          details,
        };
      }),
    );
  });

  app.get("/api/admin/bookings/:id", requireAuth(["ADMIN"]), (req, res) => {
    const b = mockBookings.find((bk) => bk.id === req.params.id);
    if (!b) return res.status(404).json({ error: "Booking not found" });
    let details: any = {};
    try {
      details = JSON.parse(b.notes);
    } catch (e) {}
    res.json({
      id: b.id,
      customerName: details.customerName || "Customer",
      customerEmail: "customer@example.com",
      customerPhone: "+65 9123 4567",
      bookingType: details.bookingType || "Transport",
      date: b.target_date,
      status: b.status,
      amount: b.total_amount,
      createdAt: b.created_at,
      details,
      items: [],
    });
  });

  app.put("/api/admin/bookings/:id", requireAuth(["ADMIN"]), (req, res) => {
    const b = mockBookings.find((bk) => bk.id === req.params.id);
    if (b) {
      if (req.body.status) b.status = req.body.status;
    }
    res.json({ success: true });
  });

  app.post(
    "/api/admin/bookings/:id/assign",
    requireAuth(["ADMIN"]),
    (req, res) => {
      const b = mockBookings.find((bk) => bk.id === req.params.id);
      if (b) b.status = "CONFIRMED";
      res.json({ success: true, status: "CONFIRMED" });
    },
  );

  app.get("/api/admin/vehicles", requireAuth(["ADMIN"]), (req, res) => {
    res.json(mockVehicles);
  });

  app.get("/api/admin/drivers", requireAuth(["ADMIN"]), (req, res) => {
    res.json([
      {
        id: "d_1",
        name: "John Doe",
        phone: "+65 9123 4567",
        status: "AVAILABLE",
      },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on http://localhost:" + PORT);
  });
}

startServer();
