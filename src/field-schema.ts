import { z } from "zod";

export function getFieldValidationSchema(
  schema: z.Schema<any, any>,
  originalPath: Array<string>,
  arrayPath?: Array<string>
): z.ZodType<any, any> {
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
      throw new Error(`Field '${originalPath.join(".")}' not found in schema`);
    }
  }

  throw new Error("Path is not defined");
}

export function setFieldValidationSchema(
  schema: z.Schema<any, any>,
  originalPath: Array<string>,
  validationSchema: z.ZodType<any, any>,
  arrayPath?: Array<string>
): z.Schema<any, any> {
  arrayPath = arrayPath ?? [...originalPath];

  if (arrayPath.length === 1) {
    if (schema instanceof z.ZodObject && schema._def.shape()[arrayPath[0]] instanceof z.ZodType) {
      return schema.setKey(arrayPath[0], validationSchema);
    } else {
      // TODO: Add more specific error message
      throw new Error(`Field '${originalPath.join(".")}' not found in schema`);
    }
  } else if (arrayPath.length > 1) {
    const key = arrayPath.shift();
    if (key) {
      const schemaField = schema._def.shape()[key];
      if (schemaField instanceof z.ZodObject) {
        const schemaObject = setFieldValidationSchema(schemaField, originalPath, validationSchema, arrayPath);
        return schemaField.setKey(key, schemaObject);
      } else {
        // TODO: Add more specific error message
        throw new Error(`Field '${originalPath.join(".")}' not found in schema 2`);
      }
    }
  }

  throw new Error("Path is not defined");
}
