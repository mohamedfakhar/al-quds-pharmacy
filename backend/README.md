# AL-Quds Pharmacy — Backend (Node.js / Express / MongoDB)

## Run locally
```bash
cp .env.example .env      # fill in real values — never commit .env
npm install
npm run dev                # requires nodemon; or: npm start
```
Requires a running MongoDB instance (local or Atlas) reachable at `MONGO_URI`.

## Structure
```
backend/
  server.js            # app entry: security middleware, DB connect, routes, Socket.IO
  config/db.js          # mongoose connection
  models/                # one Mongoose schema per collection (matches the full spec)
  controllers/            # request handlers — business logic lives here, not in routes
  routes/                 # thin route definitions, validation chains attached here
  middleware/            # auth (JWT), role guard, rate limiter, error handler, validator
  utils/                  # ApiError, catchAsync, token helpers
  services/               # (empty placeholder) payment/email/storage provider abstractions go here
```

## What is implemented right now
- `POST /api/auth/register`, `/login`, `/logout`, `GET /api/auth/me` — JWT in an HTTP-only cookie, bcrypt hashing, rate-limited, role never trusted from the client.
- `GET /api/products` — real server-side search (`$text`), filtering (category/brand/price/stock/prescription/tag), sorting, and pagination. `GET /api/products/:slug`.
- `GET /api/categories`.
- Central error handler that never leaks stack traces; consistent `{ success, data|message }` response shape.
- Security baseline: helmet, CORS locked to `FRONTEND_URL`, mongo-sanitize, request size limits, rate limiting (stricter on auth).
- All 12 models from the spec (User, Product, Category, Brand, Order, Prescription, Coupon, Review, Notification, Branch, Wishlist, Conversation) with the indexes called out in the spec.
- Socket.IO server is wired into `server.js` and exposed via `req.app.get("io")`, but **no events are emitted yet** — order-creation, prescription-review, and chat events still need to call `.emit()` at the right points once those routes exist.

## What is NOT implemented yet (see /HANDOFF_REPORT.md for the ordered plan)
Cart, Orders, Prescriptions, Coupons validation, Reviews, Wishlist, Chat, Notifications, Admin routes, Analytics, file upload (Multer + cloud storage), payment service abstraction, sitemap/robots generation.
