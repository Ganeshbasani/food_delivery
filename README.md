# BiteFlow — Scalable Food Commerce Platform

BiteFlow is a production-minded full-stack food commerce platform built as a three-surface system: a customer web application, a protected operations console, and a REST API backed by MongoDB and Stripe.

> This repository is an engineering showcase. Production claims should be validated in the deployment environment after secrets, payment webhooks, storage and observability are configured.

## Why BiteFlow

Instead of treating a food-delivery project as a collection of UI screens, BiteFlow models the core commerce lifecycle:

```text
Customer → Catalog → Cart → Server-side Pricing → Stripe Checkout
                                  ↓
                           Order Lifecycle
                                  ↓
                         Operations Console
                                  ↓
                   Confirmed / Preparing / Delivery
```

## System architecture

```text
┌──────────────────────┐       ┌──────────────────────┐
│   BiteFlow Web       │       │ BiteFlow Ops Console  │
│   React + Vite       │       │ React + Vite          │
└──────────┬───────────┘       └──────────┬───────────┘
           │                               │
           └──────────────┬────────────────┘
                          ▼
               ┌──────────────────────┐
               │   BiteFlow API       │
               │   Express / Node     │
               ├──────────────────────┤
               │ Auth / RBAC          │
               │ Validation           │
               │ Rate limiting        │
               │ Order orchestration  │
               │ Stripe integration   │
               └───────┬───────┬──────┘
                       │       │
             ┌─────────┘       └───────────┐
             ▼                             ▼
        ┌───────────┐                 ┌──────────┐
        │ MongoDB   │                 │ Stripe   │
        │ Catalog   │                 │ Payments │
        │ Users     │                 │ Webhooks │
        │ Orders    │                 └──────────┘
        └───────────┘
```

## Engineering upgrades in v2

| Area | Upgrade |
|---|---|
| Brand | Renamed from the original demo identity to **BiteFlow** |
| API | Versioned `/api/v1` endpoints plus legacy aliases |
| Auth | JWT expiry + Bearer token support + role-aware authorization middleware |
| Security | Input constraints, security headers, rate limiting, restricted CORS |
| Orders | Structured line items, payment state, fulfillment state, timestamps |
| Pricing | Server fetches product prices and calculates authoritative totals |
| Payments | Stripe Checkout + signed webhook verification |
| Catalog | Search, category filtering, pagination, active/archive lifecycle |
| Media | Upload MIME/size validation and deployment-ready storage boundary |
| Reliability | Request IDs, structured logging, live/readiness health endpoints, graceful shutdown |
| Testing | Native Node test coverage for validation utilities + CI wiring |
| DevOps | Dockerfiles, Compose, GitHub Actions CI |
| UX | Rebuilt customer app and upgraded admin console with responsive layouts |
| Documentation | Architecture, API, security and deployment guides |

## Repository layout

```text
biteflow-platform/
├── frontend/                  # Customer React application
├── admin/                     # Operations React application
├── backend/                   # Node.js / Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── tests/
│   └── utils/
├── docs/
├── .github/workflows/ci.yml
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Local development

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and `FRONTEND_URL` in `backend/.env`.

### 2. Customer web

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Operations console

```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

The API defaults to `http://localhost:4000`, the customer app to `http://localhost:5173`, and the operations console to `http://localhost:5174`.

## Seed sample catalog

Place the backend `.env` in the `backend/` folder and run:

```bash
cd backend
npm run seed
```

The seed script imports a representative starter catalog and points images at the included sample assets. For an existing database, run `npm run migrate` before switching clients to the v2 API.

## Provision an admin

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD` (12+ characters) and optionally `ADMIN_NAME`, then run:

```bash
cd backend
npm run create-admin
```

The script hashes the password with Bcrypt and assigns the `admin` role. Never commit these values.

## Docker

Create `backend/.env` from `backend/.env.example`, then:

```bash
docker compose up --build
```

Services:

- Customer web: `http://localhost:5173`
- Operations console: `http://localhost:5174`
- API: `http://localhost:4000`
- MongoDB: internal Compose network

## API surface

### Public

```text
GET  /health/live
GET  /health/ready
GET  /api/v1/food/list
POST /api/v1/user/register
POST /api/v1/user/login
```

### Authenticated

```text
GET  /api/v1/cart/
POST /api/v1/cart/add
POST /api/v1/cart/remove
POST /api/v1/order/place
GET  /api/v1/order/user
GET  /api/v1/order/payment/:orderId
```

### Admin

```text
POST   /api/v1/food/add
PATCH  /api/v1/food/:id
DELETE /api/v1/food/:id
GET    /api/v1/order/list
PATCH  /api/v1/order/:orderId/status
```

### Stripe

```text
POST /webhooks/stripe
```

Stripe webhook verification is based on the signed payload and `STRIPE_WEBHOOK_SECRET`. The browser redirect is intentionally not trusted as proof of payment.

## Quality gate

The CI workflow runs:

1. Dependency installation with `npm ci`
2. Backend unit tests
3. Customer application build
4. Operations console build

See `docs/API.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, and `docs/DEPLOYMENT.md` for the full engineering notes.

## Resume-ready project summary

**BiteFlow — Scalable Food Commerce Platform** — Engineered a full-stack food ordering platform with React, Node.js/Express, MongoDB and Stripe, separating customer and operations experiences behind versioned REST APIs. Implemented JWT/RBAC, server-authoritative pricing, structured order/payment state, signed Stripe webhooks, pagination/search, rate limiting, request tracing, health checks and CI-ready Docker workflows. Rebuilt the customer and admin interfaces with responsive UX and an operations-focused order lifecycle.
