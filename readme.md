# DevPulse

> A collaborative backend API for software teams to report bugs, suggest features, and coordinate resolutions.

[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Raw_SQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)

**Live:** https://express-server-beryl-delta.vercel.app/ &nbsp;|&nbsp; **GitHub:** https://github.com/harunhira69/express_server

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Authentication](#authentication)
- [Project Structure](#project-structure)

---

## Tech Stack

| Technology | Details |
|---|---|
| **Node.js** | LTS runtime |
| **TypeScript** | Strict mode, no `any` |
| **Express.js** | Modular router architecture |
| **PostgreSQL** | Native `pg` driver, raw SQL only |
| **bcryptjs** | Password hashing — salt rounds: 10 |
| **jsonwebtoken** | JWT-based authentication |
| **http-status-codes** | Consistent HTTP status codes |

---

## Setup & Installation

### Prerequisites

- Node.js (LTS)
- PostgreSQL database

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/harunhira69/express_server.git
cd express_server

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values

# 4. Start development server
npm run dev
```

### Environment Variables

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_jwt_secret_here
```

---

## API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT |

### Issues

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/issues` | Authenticated | Create a new issue |
| `GET` | `/api/issues` | Public | Get all issues (with sort/filter) |
| `GET` | `/api/issues/:id` | Public | Get a single issue |
| `PATCH` | `/api/issues/:id` | Contributor / Maintainer | Update title, description, or type |
| `PATCH` | `/api/issues/:id/status` | Maintainer only | Update issue status |
| `DELETE` | `/api/issues/:id` | Maintainer only | Delete an issue |

### System

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/metrics` | Maintainer only | View system metrics |

### Query Parameters — `GET /api/issues`

| Param | Values | Default |
|---|---|---|
| `sort` | `newest`, `oldest` | `newest` |
| `type` | `bug`, `feature_request` | — |
| `status` | `open`, `in_progress`, `resolved` | — |

---

## Database Schema

### `users`

| Column | Type | Notes |
|---|---|---|
| `id` | SERIAL PK | Auto-increment |
| `name` | VARCHAR(100) | Required |
| `email` | VARCHAR(100) UNIQUE | Required |
| `password` | TEXT | Hashed — never returned in responses |
| `role` | VARCHAR(20) | `contributor` (default) or `maintainer` |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

### `issues`

| Column | Type | Notes |
|---|---|---|
| `id` | SERIAL PK | Auto-increment |
| `title` | VARCHAR(150) | Required, max 150 characters |
| `description` | TEXT | Required, min 20 characters |
| `type` | VARCHAR(20) | `bug` or `feature_request` |
| `status` | VARCHAR(20) | `open` (default), `in_progress`, `resolved` |
| `reporter_id` | INT | References `users.id` |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

---

## User Roles

| Role | Permissions |
|---|---|
| `contributor` | Register, login, create issues, view issues, update own open issues |
| `maintainer` | All contributor permissions + update any issue, update status, delete issues, view metrics |

---

## Authentication

Include the JWT token in the `Authorization` header for all protected routes:

```
Authorization: <your_jwt_token>
```

---

## Project Structure

```
src/
├── app.ts              # Express app setup
├── index.ts            # Server entry point
├── config/             # Environment configuration
├── db/                 # PostgreSQL pool & DB initialization
├── middleware/         # auth, authorize, errorHandler, notFound
├── modules/
│   ├── auth/           # Login logic
│   ├── users/          # Signup logic
│   └── issues/         # Issues CRUD
├── types/              # Shared TypeScript types
└── utility/            # asyncHandler helper
```

---

## License

This project is for internal/educational use. Feel free to fork and adapt.