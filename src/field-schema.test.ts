import { describe, expect, test } from "vitest";
import { z } from "zod";

import { getFieldValidationSchema, setFieldValidationSchema } from "./field-schema";

const TestSchema = z.object({
  string: z.string(),
  number: z.number(),
  stringArray: z.array(z.string()),
  numberArray: z.number().array(),
  secondLevel: z.object({
    string: z.string(),
    number: z.number(),
    thirdLevel: z.object({
      string: z.string(),
      number: z.number()
    })
  })
});

describe("getFieldValidationSchema function", () => {
  test("should return correct field validation schema", () => {
    expect(getFieldValidationSchema(TestSchema, ["string"])).toBeInstanceOf(z.ZodString);
    expect(getFieldValidationSchema(TestSchema, ["number"])).toBeInstanceOf(z.ZodNumber);
    expect(getFieldValidationSchema(TestSchema, ["stringArray"])).toBeInstanceOf(z.ZodArray);
    expect(getFieldValidationSchema(TestSchema, ["numberArray"])).toBeInstanceOf(z.ZodArray);
    expect(getFieldValidationSchema(TestSchema, ["stringArray"])._def.type).toBeInstanceOf(z.ZodString);
    expect(getFieldValidationSchema(TestSchema, ["numberArray"])._def.type).toBeInstanceOf(z.ZodNumber);

    expect(getFieldValidationSchema(TestSchema, ["secondLevel", "string"])).toBeInstanceOf(z.ZodString);
    expect(getFieldValidationSchema(TestSchema, ["secondLevel", "number"])).toBeInstanceOf(z.ZodNumber);
    expect(getFieldValidationSchema(TestSchema, ["secondLevel", "thirdLevel", "string"])).toBeInstanceOf(z.ZodString);
    expect(getFieldValidationSchema(TestSchema, ["secondLevel", "thirdLevel", "number"])).toBeInstanceOf(z.ZodNumber);
  });

  test("should throw an error, when incorrect path", () => {
    expect(() => getFieldValidationSchema(TestSchema, ["notpath"])).toThrowError("Field 'notpath' not found in schema");
    expect(() => getFieldValidationSchema(TestSchema, ["secondLevel", "notpath"])).toThrowError(
      "Field 'secondLevel.notpath' not found in schema"
    );
    expect(() => getFieldValidationSchema(TestSchema, ["secondLevel", "thirdLevel", "notpath"])).toThrowError(
      "Field 'secondLevel.thirdLevel.notpath' not found in schema"
    );
  });

  test("should throw an error, when no path to config", () => {
    expect(() => getFieldValidationSchema(TestSchema, [])).toThrowError("Path is not defined");
  });
});

describe("setFieldValidationSchema function", () => {
  test("should return correct field validation schema", () => {
    const INVALID_TYPE_ERROR_MESSAGE = "Invalid type, should be a number";

    // First level fields
    const fieldPath = ["string"];
    const newSchema = setFieldValidationSchema(
      TestSchema,
      fieldPath,
      z.number({ invalid_type_error: INVALID_TYPE_ERROR_MESSAGE })
    );
    expect(newSchema).toBeInstanceOf(z.ZodObject);
    expect(newSchema._def.shape().string).toBeInstanceOf(z.ZodNumber);

    const newSchemaValidationResult = newSchema.safeParse({ string: "123" });
    const newSchemaZodIssue = newSchemaValidationResult.error?.errors.find((e) =>
      e.path.every((p, index) => p === fieldPath[index])
    );
    expect(newSchemaZodIssue).toBeDefined();
    expect(newSchemaZodIssue?.message).toBe(INVALID_TYPE_ERROR_MESSAGE);

    // Second level fields
    const fieldPath2 = ["secondLevel", "string"];
    const newSchema2 = setFieldValidationSchema(
      TestSchema,
      fieldPath2,
      z.number({ invalid_type_error: INVALID_TYPE_ERROR_MESSAGE })
    );
    const newSchemaValidationResult2 = newSchema2.safeParse({ secondLevel: { string: "123" } });
    const newSchemaZodIssue2 = newSchemaValidationResult2.error?.errors.find((e) =>
      e.path.every((p, index) => p === fieldPath2[index])
    );

    expect(newSchema2).toBeInstanceOf(z.ZodObject);
    expect(newSchema2._def.shape().secondLevel._def.shape().string).toBeInstanceOf(z.ZodNumber);
    expect(newSchemaZodIssue2).toBeDefined();
    expect(newSchemaZodIssue2?.message).toBe(INVALID_TYPE_ERROR_MESSAGE);

    // Third level fields
    const fieldPath3 = ["secondLevel", "thirdLevel", "string"];
    const newSchema3 = setFieldValidationSchema(
      TestSchema,
      fieldPath3,
      z.number({ invalid_type_error: INVALID_TYPE_ERROR_MESSAGE })
    );
    const newSchemaValidationResult3 = newSchema3.safeParse({ secondLevel: { thirdLevel: { string: "123" } } });
    const newSchemaZodIssue3 = newSchemaValidationResult3.error?.errors.find((e) =>
      e.path.every((p, index) => p === fieldPath3[index])
    );

    expect(newSchema3).toBeInstanceOf(z.ZodObject);
    expect(newSchema3._def.shape().secondLevel._def.shape().thirdLevel._def.shape().string).toBeInstanceOf(z.ZodNumber);
    expect(newSchemaZodIssue3).toBeDefined();
    expect(newSchemaZodIssue3?.message).toBe(INVALID_TYPE_ERROR_MESSAGE);
  });

  test("should throw an error, when no path to config", () => {
    expect(() => setFieldValidationSchema(TestSchema, [], z.number())).toThrowError("Path is not defined");
  });
});
