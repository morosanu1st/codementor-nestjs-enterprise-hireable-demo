# NestJS / TypeScript Enterprise Hireable Patterns — Codementor Demo

Small, runnable sketch of **enterprise-hireable backend patterns** in the Node.js / TypeScript / NestJS style: **layered module** (controller → service), **DTO validation**, and a simple **REST resource**. Built for long-term mentoring toward the **enterprise hiring bar**.

**Mentor:** Mihai Chindriș — BSc Computer Science (TU Cluj, 2019); ongoing MSc BI (TU Wien). Codementor long-term mentoring at **US$60/hr**. Skills focus for this track: **Node.js**, **TypeScript**, **JavaScript**, **NestJS**, **Database / SQL**.

Tags: NestJS, TypeScript, Node.js, REST, DTO validation, layered architecture, enterprise interviews.

---

## What’s in this repo

| Path | Purpose |
|------|---------|
| `src/main.ts` | Bootstrap (Nest-style `main` + module wiring) |
| `src/modules/projects/projects.controller.ts` | Thin HTTP layer — status codes, no business rules |
| `src/modules/projects/projects.service.ts` | Business logic — unit-testable without Express |
| `src/modules/projects/dto/create-project.dto.ts` | Validation sketch (maps to Nest + `class-validator`) |
| `src/modules/projects/project.types.ts` | Domain type for the resource |

This is **Express + TypeScript** with NestJS **folder and layer conventions**, so you can run it with a light dependency tree. In mentoring we lift the same shapes into a real NestJS module (`@Module`, `@Controller`, `@Injectable`, pipes).

```bash
npm install
npm start
# http://localhost:3000
# GET  /api/projects
# POST /api/projects  { "name": "Payments API", "ownerId": "eng-42" }
```

Optional compile check:

```bash
npm run build && npm run start:prod
```

---

## What the demo shows (enterprise lens)

1. **Layered module** — controllers stay boring; services own rules; DTOs gate input.
2. **Consistent API envelope** — `{ data }` / `{ error }` instead of ad-hoc shapes.
3. **Validation at the edge** — 400 with clear details; never trust raw `req.body`.
4. **Resource design** — list/filter, get-by-id, create, status transition (PATCH).
5. **Swap-ready persistence** — in-memory `Map` today; tomorrow a SQL repository behind the same service interface.

That combo is what hiring managers look for when they say “production NestJS / Node experience.”

---

## How long-term mentoring would cover this track

Goal: become **hireable at enterprise companies** writing Node/TS services they trust.

| Theme | What we practice together |
|-------|---------------------------|
| **NestJS / TS** | Modules, DI, pipes, guards, config, testing controllers vs services |
| **SQL / Database** | Schema design, migrations, indexes, transactions, repository pattern |
| **Interview-ready architecture** | Layering, SOLID-ish boundaries, error contracts, observability basics |
| **Enterprise hiring bar** | Reading job specs, system-design light, code-review habits, portfolio stories |

Suggested rhythm for a long-term Codementor engagement (US$60/hr):

1. **Baseline** — review your current Nest/Express/SQL work; map gaps to target roles.
2. **Vertical slices** — ship small features with tests, migrations, and clean PRs.
3. **Interview drills** — whiteboard APIs, debug broken Nest modules, talk trade-offs.
4. **Portfolio polish** — README quality, architecture notes, demo repos like this one.

Sessions are 1:1. We write real code, not slide decks. Between sessions you get concrete homework (a module, a migration, a failing test to fix).

---

## Quick API map

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/api/projects` | Optional `?status=draft\|active\|archived` |
| `GET` | `/api/projects/:id` | `404` if missing |
| `POST` | `/api/projects` | Body: `name`, `ownerId`, optional `status` |
| `PATCH` | `/api/projects/:id/status` | Body: `{ "status": "active" }` |
| `GET` | `/health` | Liveness |

---

## Book mentoring

If you want structured help getting to the **enterprise NestJS / TypeScript / SQL** bar — architecture, interviews, and weekly accountability — book a **long-term mentoring** session with **Mihai Chindriș** on [Codementor](https://www.codementor.io/).

Rate for this track: **US$60/hr**. First conversation: clarify target companies/roles, audit where you are, and lock a practice plan.
