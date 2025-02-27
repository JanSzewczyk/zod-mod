<h1 align="center">ZodMod 📏✨</h1>
<p align="center">
ZodMod is an extension for <a href="https://zod.dev">Zod</a> that allows you to dynamically modify validation schemas. With it,
you can easily add extra rules, such as notEqual, to existing schemas without rewriting them manually.
</p>

## 📚 Features

- 🔄 Dynamically modify schemas – add extra validation rules on the fly
- 🚀 Seamless integration – fully compatible with existing Zod schemas
- ⚡ Simple syntax – modify only what you need

## 📖 Table of Contents

<!-- TOC -->
  * [📚 Features](#-features)
  * [📖 Table of Contents](#-table-of-contents)
  * [🎯 Getting Started](#-getting-started)
    * [⚙️ Installation](#-installation)
    * [Usage](#usage)
    * [Supported Validations](#supported-validations)
  * [🛠️ Developer Info](#-developer-info)
    * [Peer Dependencies](#peer-dependencies)
<!-- TOC -->

## 🎯 Getting Started

### ⚙️ Installation

```shell
npm install zod-mod
```

### Usage

```ts
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

console.log(modifiedSchema.parse({ username: "John", age: 18 }));
// => ZodError: [
//   {
//     "code": "custom",
//     "message": "Age cannot be 18",
//     "path": [
//       "age"
//     ]
//   }
// ]
```

### Supported Validations

- `notEqual` – ensures the value is not equal to a specified value

## 🛠️ Developer Info

### Peer Dependencies

![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/zod-mod/peer/zod)
