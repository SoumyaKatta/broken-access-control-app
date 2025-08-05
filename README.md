# 🔐 Broken Access Control Demo (TypeScript Full Stack)

This is a deliberately vulnerable full-stack application that demonstrates **Broken Access Control** using:

- 🔧 **Backend**: Node.js + Express + TypeScript
- 🎨 **Frontend**: React + Vite + TypeScript
- 🔐 **JWT Authentication** (with missing role validation to simulate broken access control)

---

## 🚨 Vulnerability Demonstrated

This project contains an **intentional security flaw**:

> Any logged-in user (even a regular user) can access the `/admin-data` endpoint because there’s **no role check** on the backend.

---



