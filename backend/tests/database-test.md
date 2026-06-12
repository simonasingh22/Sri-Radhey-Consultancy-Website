# Database Test Plan

This document contains manual test steps for verifying MongoDB integration and core API behaviors.

Prerequisites:
- Ensure `MONGO_URI` is set in `backend/.env` or environment.
- Ensure dependencies installed (`npm install`).

Tests:

1. Connection test
- Start the server (`npm run dev`).
- Verify `/api/health` returns 200 and JSON.

2. Lead creation test
- POST `/api/leads` with valid payload:
  - name, phone, email, district, serviceRequired
- Expect 201 response and lead document created.
- Verify lead appears in database and has `status: "New"`.

3. Admin login test
- Seed an admin using `npm run seed-admin` and provide credentials.
- POST `/api/auth/login` with admin credentials.
- Expect to receive a JWT token.

4. Policy CRUD test
- Use admin token in `Authorization: Bearer <token>` header.
- POST `/api/policies` to create a policy (title, slug, overview, etc.).
- GET `/api/policies` and verify created policy present.
- GET `/api/policies/:slug` returns the policy.
- PUT `/api/policies/:id` updates the policy.
- DELETE `/api/policies/:id` removes the policy.

5. Index verification
- Connect to MongoDB Atlas UI and verify indexes exist for:
  - leads: email, phone, district, status, createdAt
  - blogs: slug, category, createdAt
  - policies: slug, status
  - successstories: industry, location

6. Graceful shutdown
- Start server and then send SIGINT (Ctrl+C) and observe console logs for graceful shutdown messages.


Record any failures and fix issues before proceeding to Phase 7.
