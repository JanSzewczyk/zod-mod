import { z } from "zod";

export function getFieldValidationSchema(
  schema: z.AnyZodObject,
  originalPath: Array<string>,
  arrayPath?: Array<string>
): z.ZodTypeAny {
  arrayPath = arrayPath ?? [...originalPath];

  const key = arrayPath.shift();
  if (key) {
    const schemaField = schema._def.shape()[key];
    if (schemaField) {
      if (!arrayPath.length) {
        return schemaField;
      } else {
        return getFieldValidationSchema(schemaField, originalPath, arrayPath);
      }
    } else {
      throw new Error(`Field '${key}' in '${originalPath.join(".")}' not found in schema`);
    }
  }

  throw new Error("Path is not defined");
}

export function setFieldValidationSchema<T extends z.AnyZodObject>(
  schema: T,
  originalPath: Array<string>,
  validationSchema: z.ZodTypeAny,
  arrayPath?: Array<string>
): T {
  arrayPath = arrayPath ?? [...originalPath];

  if (arrayPath.length === 1) {
    if (schema._def.shape()[arrayPath[0]] instanceof z.ZodType) {
      return schema.setKey(arrayPath[0], validationSchema) as T;
    } else {
      throw new Error(`Field '${originalPath.join(".")}' not found in schema`);
    }
  } else if (arrayPath.length > 1) {
    const key = arrayPath.shift();
    if (key) {
      const schemaField = schema._def.shape()[key];
      const schemaObject = setFieldValidationSchema(schemaField, originalPath, validationSchema, arrayPath);
      return schema.setKey(key, schemaObject) as T;
    }
  }

  throw new Error("Path is not defined");
}
