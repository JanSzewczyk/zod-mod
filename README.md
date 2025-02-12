# ZodMod 📏✨

ZodMod is an extension for [Zod](https://zod.dev/) that allows you to dynamically modify validation schemas. With it,
you can easily add extra rules, such as notEqual, to existing schemas without rewriting them manually.

## Features

- 🔄 Dynamically modify schemas – add extra validation rules on the fly
- 🚀 Seamless integration – fully compatible with existing Zod schemas
- ⚡ Simple syntax – modify only what you need

## Installation

```shell
npm install zod-mod
```

## Usage

```ts
import { z } from "zod";
import { modifySchema } from "zod-mod";

const baseSchema = z.object({
  username: z.string(),
  age: z.number()
});

const modifiedSchema = modifySchema(baseSchema, {
  age: { notEqual: 18 }
});

console.log(modifiedSchema.safeParse({ username: "John", age: 18 }));
// => Error: "Age cannot be 18"
```

## Supported Validations

- `notEqual` – ensures the value is not equal to a specified value
