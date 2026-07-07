# Lessons Learned

Key concepts learned while building the Evently project. Detailed explanations can be found in the linked documentation.

---

## 01. Mongoose Model Registration

Mongoose only knows about models whose files have actually run — just creating a model file isn't enough.

**What I learned**
- Why `MissingSchemaError` happens
- Why `import type` doesn't register a model
- How registration affects `populate()`
- Two fixes: import related models directly, or use a central `models/index.ts` for bigger projects

📄 `docs/debugging/mongoose-missing-schema-error.md`

---

## 02. Database Connection Management

Connections should be cached and reused, not recreated on every request.

**What I learned**
- Why connection caching matters in Next.js
- How to build a reusable `connectToDatabase()` utility
- Benefits of reusing a single Mongoose connection

📄 `docs/architecture/database-connection.md`

---
