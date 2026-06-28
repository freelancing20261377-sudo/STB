import { Router } from "express";
import jwt from "jsonwebtoken";

export const authRouter = Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "super_secret_jwt_key_should_be_changed";

const MOCK_USERS = [
  { id: "1", email: "admin@example.com", role: "ADMIN", name: "Admin User" },
  {
    id: "2",
    email: "customer@example.com",
    role: "CUSTOMER",
    name: "Customer User",
  },
  {
    id: "3",
    email: "operator@example.com",
    role: "OPERATOR",
    name: "Fleet Operator",
  },
  { id: "4", email: "driver@example.com", role: "DRIVER", name: "Driver User" },
];

authRouter.post("/register", async (req, res) => {
  const { email, role_name, first_name, last_name, company_name } = req.body;
  if (email && !MOCK_USERS.find((u) => u.email === email)) {
    MOCK_USERS.push({
      id: Date.now().toString(),
      email,
      role: role_name || "CUSTOMER",
      name: first_name
        ? `${first_name} ${last_name}`
        : company_name || "New User",
    });
  }
  res.json({ success: true, message: "Registered successfully" });
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password, requestedRole } = req.body;
    let user = MOCK_USERS.find((u) => u.email === email);

    // Auto-create for any email based on prefix for testing
    if (!user) {
      const role =
        requestedRole ||
        (email.includes("admin")
          ? "ADMIN"
          : email.includes("operator")
            ? "OPERATOR"
            : "CUSTOMER");
      user = { id: Date.now().toString(), email, role, name: "Test User" };
    } else if (requestedRole) {
      // For testing purposes, allow the requested role to override so same email can test all portals
      user.role = requestedRole;
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        operatorProfile:
          user.role === "OPERATOR"
            ? { company_name: "Mock Operator Fleet" }
            : null,
        customerProfile:
          user.role === "CUSTOMER"
            ? { first_name: "Mock", last_name: "Customer" }
            : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/refresh", (req, res) => {
  res.status(401).json({ error: "No active session" });
});

authRouter.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out" });
});

export const requireAuth = (roles: string[] = []) => {
  return (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ error: "Forbidden: insufficient permissions" });
      }
      req.user = decoded;
      next();
    });
  };
};

authRouter.get("/me", requireAuth(), async (req: any, res: any) => {
  const user = MOCK_USERS.find((u) => u.id === req.user.id) || {
    id: req.user.id,
    email: "test@example.com",
    role: req.user.role,
  };
  res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      operatorProfile:
        user.role === "OPERATOR"
          ? { company_name: "Mock Operator Fleet" }
          : null,
      customerProfile:
        user.role === "CUSTOMER"
          ? { first_name: "Mock", last_name: "Customer" }
          : null,
    },
  });
});

authRouter.post("/forgot-password", async (req, res) => {
  res.json({
    success: true,
    message:
      "If an account with that email exists, we sent a password reset link.",
  });
});

authRouter.post("/reset-password", async (req, res) => {
  res.json({ success: true, message: "Password reset successful." });
});
