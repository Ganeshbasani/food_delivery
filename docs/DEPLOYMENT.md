# BiteFlow Deployment Guide

## Environment variables

Copy `backend/.env.example` to `backend/.env` and configure:

- `MONGO_URI`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_URL`
- `CORS_ORIGINS`

For customer and admin builds, set `VITE_API_URL`.

## Render / similar PaaS

Deploy the API as a Node service using:

```text
Build: npm ci
Start: npm start
Working directory: backend
```

Deploy the customer and operations applications as static sites using:

```text
Build: npm ci && npm run build
Publish: dist
```

Set the correct `VITE_API_URL` for each static site.

## Stripe webhook

Configure Stripe to send events to:

```text
POST https://<api-host>/webhooks/stripe
```

The backend validates the `stripe-signature` header using `STRIPE_WEBHOOK_SECRET` before updating payment state.

## Docker Compose

For local container orchestration:

```bash
docker compose up --build
```

For production, use managed MongoDB/object storage/secrets and replace the Compose Mongo service with the managed database layer.
