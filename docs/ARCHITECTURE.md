# BiteFlow Architecture

## Design principles

BiteFlow uses a modular monolith for the API layer. That keeps deployment simple while preserving boundaries that can later be extracted into services without rewriting the domain model.

### Request path

```text
HTTP Request
   ↓
Request ID / Security Headers
   ↓
CORS / Rate Limit
   ↓
Router
   ↓
Authentication
   ↓
Role Authorization
   ↓
Controller
   ↓
Model / External Provider
   ↓
Structured Response
```

## Key boundaries

**Authentication boundary** — `middleware/auth.js` establishes the server-side identity from a verified JWT. `middleware/admin.js` protects administrative mutations.

**Catalog boundary** — food read/write behavior lives in the food controller and model. Catalog reads support pagination, search and category filtering.

**Commerce boundary** — the order controller builds line items from current MongoDB prices instead of trusting client-supplied prices. The persisted order contains an immutable snapshot of name, price and quantity.

**Payment boundary** — Stripe is used only from the server. Payment confirmation comes from a signed webhook, not from the browser redirect query string.

**Operations boundary** — the admin client can only perform role-gated mutations and controlled order-status transitions.

## Scale path

The current architecture is intentionally deployable as a modular monolith. At higher traffic, the natural extraction path is:

```text
API Gateway
   ├── Identity / Auth
   ├── Catalog Service
   ├── Cart Service
   ├── Order Service
   ├── Payment Service
   └── Notification Worker
            ↓
      Event / Queue Layer
```

The first horizontal-scale improvement should be moving the in-memory rate limiter to a shared store such as Redis and moving uploaded assets to object storage such as S3.

## Data model

### User

- identity and role
- password hash (never selected by default)
- cart quantities
- audit timestamps

### Food

- name / description / price / category
- image reference
- active lifecycle flag
- search and category indexes
- audit timestamps

### Order

- authenticated user reference
- item snapshot
- subtotal / delivery fee / total
- delivery address snapshot
- payment status
- fulfillment status
- Stripe session reference
- audit timestamps

The order deliberately stores price snapshots so historical orders do not change when catalog prices are later edited.
