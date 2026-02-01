<div align="center">
<h1>ZodMod</h1>

<p>
ZodMod is an extension for <a href="https://zod.dev">Zod</a> that allows you to dynamically modify validation schemas. With it, you can easily add extra rules, such as notEqual, to existing schemas without rewriting them manually.
</p>

<p>
This library will save you time and effort in managing complex validation logic, so sit back, relax and get ready to build robust applications with ease! 🚀
</p>

[![NPM Version](https://img.shields.io/npm/v/zod-mod.svg)](https://www.npmjs.com/package/zod-mod)
[![NPM Downloads](https://img.shields.io/npm/dm/zod-mod.svg)](https://www.npmjs.com/package/zod-mod)
[![NPM License](https://img.shields.io/npm/l/zod-mod.svg)](https://github.com/JanSzewczyk/zod-mod/blob/main/LICENSE)
[![NPM Type Definitions](https://img.shields.io/npm/types/zod-mod)](https://www.typescriptlang.org/)
[![NPM Peer Dependency Zod](https://img.shields.io/npm/dependency-version/zod-mod/peer/zod)](https://zod.dev/)

<hr />
</div>

## 📚 Features

This library is packed with features! 📦

- 🔄 **Dynamic Schema Modification** – Modify existing Zod schemas without rewriting them
- 🚀 **Easy Integration** – Seamlessly integrates with your existing Zod validation setup
- ⚡ **Simple Syntax** – Clean and intuitive API for adding validation rules
- 💪 **TypeScript Support** – Full type safety and IntelliSense support
- 🎯 **Extensible** – Built to support more validation types in the future
- 📦 **Lightweight** – Minimal overhead, only requires Zod as peer dependency
- 🧪 **Well Tested** – Comprehensive test suite ensures reliability
- 📖 **Great Documentation** – Clear examples and API reference

## 📖 Table of Contents

- [📚 Features](#-features)
- [📖 Table of Contents](#-table-of-contents)
- [🎯 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [📃 Usage](#-usage)
    - [Basic Example](#basic-example)
    - [Multiple Modifications](#multiple-modifications)
    - [Nested Objects](#nested-objects)
- [📘 API Reference](#-api-reference)
    - [modifySchema](#modifyschema)
    - [Supported Validations](#supported-validations)
- [🧪 Testing](#-testing)
- [💻 TypeScript Support](#-typescript-support)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## 🎯 Getting Started

To get started with **ZodMod**, follow these simple steps:

### Prerequisites

Make sure you have Zod installed in your project:

[![NPM Peer Dependency Zod](https://img.shields.io/npm/dependency-version/zod-mod/peer/zod)](https://zod.dev/)

### Installation

```bash
npm install zod-mod
```

or if you prefer yarn:

```bash
yarn add zod-mod
```

or pnpm:

```bash
pnpm add zod-mod
```

## 📃 Usage

### Basic Example

```typescript
import { z } from "zod";
import { modifySchema } from "zod-mod";

const baseSchema = z.object({
  username: z.string(),
  age: z.number()
});

const modifiedSchema = modifySchema(baseSchema, [
  {
    type: "NOT_EQUAL",
    path: "age",
    value: 18,
    errorMessage: "Age cannot be 18"
  }
]);

// This will throw a validation error
const result = modifiedSchema.safeParse({ 
  username: "John", 
  age: 18 
});

if (!result.success) {
  console.log(result.error.issues);
  // Output:
  // [
  //   {
  //     "code": "custom",
  //     "message": "Age cannot be 18",
  //     "path": ["age"]
  //   }
  // ]
}
```

### Multiple Modifications

You can apply multiple modifications to the same schema:

```typescript
const schema = z.object({
  email: z.string().email(),
  status: z.string(),
  count: z.number()
});

const modifiedSchema = modifySchema(schema, [
  {
    type: "NOT_EQUAL",
    path: "status",
    value: "banned",
    errorMessage: "Status cannot be 'banned'"
  },
  {
    type: "NOT_EQUAL",
    path: "count",
    value: 0,
    errorMessage: "Count must be greater than 0"
  }
]);
```

### Nested Objects

ZodMod supports nested object paths using dot notation:

```typescript
const schema = z.object({
  user: z.object({
    profile: z.object({
      age: z.number()
    })
  })
});

const modifiedSchema = modifySchema(schema, [
  {
    type: "NOT_EQUAL",
    path: "user.profile.age",
    value: 0,
    errorMessage: "Age must be specified"
  }
]);
```

## 📘 API Reference

### modifySchema

The main function to modify Zod schemas dynamically.

```typescript
function modifySchema<T extends z.ZodTypeAny>(
  schema: T,
  modifications: Modification[]
): T
```

**Parameters:**

- `schema` - The base Zod schema to modify
- `modifications` - Array of modification objects

**Returns:**

Modified Zod schema with additional validation rules applied

**Example:**

```typescript
const modifiedSchema = modifySchema(baseSchema, [
  {
    type: "NOT_EQUAL",
    path: "fieldName",
    value: "forbiddenValue",
    errorMessage: "Custom error message"
  }
]);
```

### Supported Validations

#### NOT_EQUAL

Ensures that a field's value is not equal to a specified value.

```typescript
interface NotEqualModification {
  type: "NOT_EQUAL";
  path: string;           // Dot notation path to the field
  value: any;             // Value that should not be equal
  errorMessage: string;   // Error message if validation fails
}
```

**Example:**

```typescript
{
  type: "NOT_EQUAL",
  path: "username",
  value: "admin",
  errorMessage: "Username cannot be 'admin'"
}
```

## 🧪 Testing

ZodMod comes with comprehensive test coverage. To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 💻 TypeScript Support

ZodMod is written in TypeScript and provides full type safety:

```typescript
import { z } from "zod";
import { modifySchema, Modification } from "zod-mod";

// Types are automatically inferred
const schema = z.object({
  name: z.string(),
  age: z.number()
});

type User = z.infer<typeof schema>;
// { name: string; age: number }

// Modification types are checked at compile time
const modifications: Modification[] = [
  {
    type: "NOT_EQUAL",
    path: "age",
    value: 0,
    errorMessage: "Age must be positive"
  }
];
```

## 🤝 Contributing

Contributions are always welcome!

If you have any ideas, suggestions, or bug reports, please feel free to:

- Open an [issue](https://github.com/JanSzewczyk/zod-mod/issues)
- Submit a [pull request](https://github.com/JanSzewczyk/zod-mod/pulls)

Before contributing, please read our [Contributing Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

### Development Setup

```bash
# Clone the repository
git clone https://github.com/JanSzewczyk/zod-mod.git

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**[⬆ back to top](#zodmod)**

Made with ❤️ by [Jan Szewczyk](https://github.com/JanSzewczyk)

If you find this project useful, please consider giving it a ⭐ on [GitHub](https://github.com/JanSzewczyk/zod-mod)!

</div>