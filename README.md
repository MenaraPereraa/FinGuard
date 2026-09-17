# FinGuard 🚀

![CI](https://img.shields.io/badge/CI-passing-green) ![Java](https://img.shields.io/badge/Java-21%20%2B-blue) ![License](https://img.shields.io/badge/License-Apache%202.0-yellow)

FinGuard is a full-stack personal finance management application designed to help users track their expenses, manage budgets, and achieve financial goals seamlessly.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Go (Golang), net/http, Go-Dotenv (REST API)
- **Authentication:** NextAuth.js (Credentials Provider integrated with Go backend)
- **Database:** PostgreSQL (via Neon DB)
- **Email Service:** RESEND (for password reset functionality)

---

## 📂 Project Structure

```text
FinGuard/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go       # Go Server Entry Point
│   ├── internal/             # Business logic & handlers
│   └── go.mod
└── frontend/
    ├── src/
    │   ├── app/              # Next.js App Router (Dashboard, Auth, Settings)
    │   ├── components/       # Reusable UI Components
    │   └── types/            # TypeScript Interfaces
    ├── package.json
    └── next.config.ts