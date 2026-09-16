require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { apiLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// TODO (next phase): orderRoutes, cartRoutes, prescriptionRoutes, couponRoutes,
// reviewRoutes, wishlistRoutes, chatRoutes, notificationRoutes, adminRoutes,
// analyticsRoutes — see /HANDOFF_REPORT.md for the full remaining list.

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
});

// ---------- Security & core middleware (spec §31) ----------
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "10kb" })); // request size limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(mongoSanitize()); // strips NoSQL-injection operators from input
app.use("/api", apiLimiter);
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// ---------- Socket.IO auth + basic room join (expand in next phase) ----------
io.use((socket, next) => {
  // TODO: verify JWT from socket.handshake.auth.token before allowing connection
  next();
});
io.on("connection", (socket) => {
  socket.on("join", (room) => socket.join(room)); // e.g. `user:<id>`, `pharmacy-dashboard`
});
app.set("io", io); // controllers can emit via req.app.get("io").to(room).emit(...)

// ---------- Routes ----------
app.get("/api/health", (req, res) => res.json({ success: true, message: "OK" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  httpServer.listen(PORT, () => console.log(`API running on port ${PORT}`));
});

module.exports = { app, io };
