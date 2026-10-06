# BiteFlow Security Notes

## Current controls

- Password hashes use Bcrypt.
- JWTs have an expiration period and contain the server-assigned role.
- Protected routes use authentication middleware.
- Administrative mutations use an explicit role gate.
- CORS accepts only configured origins.
- Security headers are set centrally.
- Basic request rate limiting is enabled.
- Request bodies are size-limited.
- Image uploads allow only selected image MIME types and cap file size.
- Product price is never taken as authoritative from the browser during order creation.
- Stripe payment confirmation uses a signed webhook.
- Password fields are excluded by default from MongoDB reads.

## Production hardening still required

This repository deliberately does not pretend to provide every enterprise control. Before a public production launch, add:

- Redis-backed distributed rate limiting
- managed object storage (for example S3) instead of local upload persistence
- centralized secret management
- CSP tuned to the actual deployment
- automated dependency/SCA scanning
- DAST/API security testing
- database backup and restore drills
- alerting and tracing infrastructure
- webhook replay/idempotency storage for payment events
- WAF/API gateway controls where appropriate

The in-memory rate limiter is intentionally documented as single-instance protection; it is not sufficient as the sole control in a horizontally scaled deployment.
