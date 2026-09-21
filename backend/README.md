# Disaster & Flood Relief Management System — Backend

A Spring Boot REST API for coordinating disaster relief operations: disaster tracking, citizen relief requests, resource inventory with rule-based smart allocation, relief centers, volunteers, rescue teams, an admin dashboard, and notifications. JWT-secured, role-based (`ADMIN`, `CITIZEN`, `VOLUNTEER`, `RESCUE_TEAM`).

This is the **backend only** — no frontend/UI code is included. A separate frontend is expected to consume these APIs.

## Tech Stack

Java 17 · Spring Boot 3.3 · Spring Web · Spring Data JPA (Hibernate) · Spring Security + JWT (`jjwt`) · PostgreSQL (Neon serverless) · Maven · Lombok · Jakarta Bean Validation

## 1. Prerequisites

- **JDK 17+** — [Eclipse Temurin](https://adoptium.net/) is a good free option. Verify with `java -version`.
- **Maven 3.9+** — or just open the project in an IDE like **IntelliJ IDEA Community**, which bundles both a JDK and Maven and will build/run this project without any manual installation.
- A **Neon Postgres** database (free tier works) — [neon.tech](https://neon.tech). Create a project and copy its connection string.

> This machine currently has neither a JDK nor Maven on `PATH`, so the project could not be compiled here. Install JDK 17 (and Maven, or use an IDE) before building.

## 2. Configure environment variables

The app reads its database credentials and JWT secret from environment variables — nothing is hardcoded. Set these before running:

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | JDBC URL to your Neon Postgres instance, with `sslmode=require` | `jdbc:postgresql://ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `DB_USERNAME` | Neon database username | `neondb_owner` |
| `DB_PASSWORD` | Neon database password | `••••••••` |
| `JWT_SECRET` | Secret key for signing JWTs (32+ bytes recommended) | any long random string |
| `JWT_EXPIRATION_MS` | *(optional)* token lifetime in ms, default `86400000` (24h) | |
| `SEED_ADMIN_EMAIL` | *(optional)* default admin created on first boot | `admin@disasterrelief.local` |
| `SEED_ADMIN_PASSWORD` | *(optional)* default admin password | `Admin@123` |

Neon's dashboard gives you a `postgres://user:pass@host/db?sslmode=require` connection string — reformat it as a JDBC URL:
```
jdbc:postgresql://<host>/<db>?sslmode=require
```
and put the username/password into `DB_USERNAME` / `DB_PASSWORD` separately.

**PowerShell:**
```powershell
$env:DATABASE_URL = "jdbc:postgresql://ep-xxxx.neon.tech/neondb?sslmode=require"
$env:DB_USERNAME = "neondb_owner"
$env:DB_PASSWORD = "your-password"
$env:JWT_SECRET = "a-long-random-development-secret-value"
```

**Bash:**
```bash
export DATABASE_URL="jdbc:postgresql://ep-xxxx.neon.tech/neondb?sslmode=require"
export DB_USERNAME="neondb_owner"
export DB_PASSWORD="your-password"
export JWT_SECRET="a-long-random-development-secret-value"
```

Schema is created/updated automatically on startup via `spring.jpa.hibernate.ddl-auto=update` — no manual migration step needed for this dev setup.

## 3. Run the app

```bash
mvn spring-boot:run
```

or build a jar and run it:
```bash
mvn clean package
java -jar target/disaster-relief-backend.jar
```

The API starts on `http://localhost:8080`. On first boot it seeds one admin account (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`, defaults `admin@disasterrelief.local` / `Admin@123`) so you have something to log in with immediately.

## 4. API walkthrough (curl)

**Register a citizen:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha Rao","email":"asha@example.com","password":"password123","phone":"9999999999","location":"Kochi","role":"CITIZEN"}'
```

**Login as the seeded admin:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@disasterrelief.local","password":"Admin@123"}'
```
Copy the `token` from the response and use it as a bearer token below.

**Create a disaster (admin):**
```bash
curl -X POST http://localhost:8080/api/disasters \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"type":"FLOOD","description":"Heavy flooding in low-lying areas","severity":"CRITICAL","latitude":9.93,"longitude":76.26}'
```

**Submit a relief request (as the citizen):**
```bash
curl -X POST http://localhost:8080/api/requests \
  -H "Authorization: Bearer <CITIZEN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"disasterId":1,"requestType":"FOOD","description":"Family of 4 needs food","priority":"CRITICAL","latitude":9.93,"longitude":76.26}'
```

**Verify then run smart allocation (admin):**
```bash
curl -X PUT http://localhost:8080/api/requests/1/status \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"status":"VERIFIED"}'

curl -X POST http://localhost:8080/api/allocation/run \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

**View the admin dashboard:**
```bash
curl http://localhost:8080/api/admin/dashboard -H "Authorization: Bearer <ADMIN_TOKEN>"
```

See the prompt spec's endpoint table for the full list of routes; most resources (`/api/disasters`, `/api/resources`, `/api/relief-centers`, `/api/rescue-teams`, `/api/volunteers`) follow the same CRUD + JWT pattern.

## Notes / known simplifications (college project scope)

- `POST /api/auth/register` accepts a `role` field directly (including `ADMIN`) to make it easy to demo every role from a fresh database. In a production system, self-service admin signup would be removed and `AdminUserController` would be the only way to grant elevated roles.
- Resource allocation is intentionally simple/rule-based (priority score + location-string match + nearest available), per the assignment brief — no ML.
- Duplicate relief-request detection uses a 30-minute rolling window per citizen + request type + disaster.

## OOP concepts demonstrated

- **Encapsulation** — private fields with getters/setters on every entity (`model/`)
- **Inheritance** — `User` (abstract, JPA `SINGLE_TABLE`) extended by `Citizen`, `Volunteer`, `RescueTeamMember`, `Admin`
- **Polymorphism** — `User.getDashboardSummary()` overridden per subclass, exposed via `GET /api/users/me/dashboard`
- **Abstraction** — `ResourceAllocator` interface with `RuleBasedResourceAllocator` implementation (`service/allocation/`)
- **Collections** — `Map`/`Set`/`List`/`Comparator` used for the request status state machine, category-to-resource mapping, and priority-ordered allocation
- **Exception handling** — custom `AppException` hierarchy (`ResourceNotFoundException`, `DuplicateRequestException`, `InvalidStatusTransitionException`, `UnauthorizedActionException`, `EmailAlreadyExistsException`) with a global `@RestControllerAdvice` handler
