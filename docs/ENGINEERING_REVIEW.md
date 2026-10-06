# BiteFlow Engineering Review — v2

## What changed from the original repository

| Dimension | Before | BiteFlow v2 |
|---|---|---|
| Identity | Tutorial-style TOMATO food app | BiteFlow food commerce platform |
| Customer UI | Incomplete export in supplied archive | Rebuilt, self-contained React application |
| Admin | Basic catalog/order screens | Operations console with overview, catalog and fulfillment views |
| Auth | JWT stored/checked with request-body userId | Expiring JWT + server identity context + explicit admin gate |
| Pricing | Browser-supplied order amount | MongoDB-backed server-side price calculation |
| Payment | Redirect flag could mark order paid | Stripe signed webhook controls payment state |
| Order model | Generic arrays/objects | Structured items, payment state, fulfillment enum, timestamps |
| API | Unversioned routes | `/api/v1` with compatibility aliases |
| Reliability | Basic startup | request IDs, structured logs, live/readiness health, graceful shutdown |
| Security | Open CORS / little central policy | restricted CORS, headers, size limits, rate limiting and upload validation |
| Catalog | list/add/remove | search, category filtering, pagination, create/update/archive |
| DevOps | None | Docker, Compose, GitHub Actions CI |
| Testing | None | Native Node test suite for core pure functions |
| Documentation | README only | README + architecture/API/security/deployment/review docs |

## Important verification note

The original archive supplied for this upgrade did not contain the complete customer frontend despite `App.jsx` importing multiple missing components and assets. BiteFlow v2 therefore replaces the incomplete customer-side export with a self-contained implementation rather than carrying broken imports forward.

## Verification performed in this environment

- Backend JavaScript syntax checked successfully with Node.
- Customer/admin JSX and JavaScript syntax checked with the installed TypeScript parser.
- Relative-import existence scan passed.
- Backend pure-function tests passed: 4/4.
- Full `npm ci`/frontend/admin production builds could not be executed because the environment could not retrieve npm packages from the registry/cache. The repository retains package locks and CI configuration so builds can be run in a connected environment.
