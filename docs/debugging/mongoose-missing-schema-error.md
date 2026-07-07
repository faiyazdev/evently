
# Issue: Mongoose `MissingSchemaError` on `populate()`

## Overview
While building the **Evently** project, calling `.populate("category")` on the `Event` model threw a `MissingSchemaError`, even though the `Category` model was correctly defined in its own file. The root cause was that the model file was never executed at runtime, so Mongoose didn't know it existed.

| Topic | Summary |
|---|---|
| Error | `MissingSchemaError: Schema hasn't been registered for model "Category"` |
| Cause | `category.model.ts` was never imported at runtime |
| Fix | Import the model itself (not just its type) so the file executes |
| Scalable fix | Central `models/index.ts` that registers all models on startup |

---

## How I Encountered the Error

I was fetching events with their category populated:

```ts
const events = await Event.find().populate("category");
```

This threw:

```text
MissingSchemaError: Schema hasn't been registered for model "Category".
Use mongoose.model(name, schema)
```

Confusing part: `category.model.ts` existed and correctly exported the model. So why wasn't Mongoose finding it?

### Debugging Step
I logged all registered models:

```ts
console.log(Object.keys(mongoose.models));
```

Output:

```text
Registered models: ["User", "Event"]
```

`"Category"` was missing — meaning the file existed, but had never actually run.

---

## Why It Happens

Mongoose does **not** scan your project folders for model files. A model is only registered when the line `mongoose.model(name, schema)` inside that file actually **executes** — which only happens if something `import`s that file.

The trap: I had this in `event.model.ts`:

```ts
import type { CategoryType } from "./category.model";
```

This is a **type-only import**. TypeScript strips these out completely during compilation since types don't exist at runtime. So `category.model.ts` was never actually loaded — the `Category` model never registered.

---

## The Solution

Import the model itself (not just its type), so the file's code actually runs:

```ts
import "./category.model";
// or
import Category from "./category.model";
```

After this fix:

```ts
console.log(Object.keys(mongoose.models));
// Registered models: ["User", "Category", "Event"]
```

`populate("category")` now works correctly.

---

## Best Practice: Register Related Models Where They're Used

Inside `event.model.ts`, import any model that `Event` references — separately from the type import:

```ts
import "./user.model";
import "./category.model";

import type { UserType } from "./user.model";
import type { CategoryType } from "./category.model";
```

This guarantees that whenever `Event` is imported, `User` and `Category` are registered too.

---

## Scalable Alternative: Central Model Registry

For larger projects, manually tracking which model imports which becomes messy. A cleaner pattern is one file responsible for registering **every** model.

### Folder Structure

```text
lib/
└── database/
    └── models/
        ├── user.model.ts
        ├── category.model.ts
        ├── event.model.ts
        └── index.ts
```

### `models/index.ts`

```ts
import "./user.model";
import "./category.model";
import "./event.model";
```

This file exports nothing — its only job is to execute every model file so each one registers with Mongoose.

### Import Once, on App Startup

```ts
// connect.ts
import "./models";

export async function connectToDatabase() {
  // Connect to MongoDB...
}
```

Now every time `connectToDatabase()` runs, all models are guaranteed to be registered before any query touches the database.

### Why This Works

1. `user.model.ts` executes → registers `"User"`
2. `category.model.ts` executes → registers `"Category"`
3. `event.model.ts` executes → registers `"Event"`

After that, `populate()` works anywhere in the app — no need to import `category.model.ts` inside every service that uses it.

### When to Use Which Approach

| Approach | Best for |
|---|---|
| Import related models directly in the dependent model file | Small/medium projects, few models, explicit dependencies |
| Central `models/index.ts` | 10+ models, teams, multiple services sharing models |

---

## How to Debug This in the Future

1. Read the error — it names the missing model.
2. Run `console.log(Object.keys(mongoose.models))`.
3. Check if the missing model's name appears in the list.
4. If it's absent, its file was never executed at runtime.
5. Import the model itself (not a type-only import) wherever it's needed, or add it to a central registry file.

---

## Key Takeaway

> A Mongoose model is registered only when its file is **executed**, not just when it exists in the project.

Type-only imports (`import type {...}`) are erased at compile time and don't count. Whether you import models individually or via a central `models/index.ts`, always make sure every referenced model is imported **at runtime** before calling `populate()`.
