import { z } from "zod";

import { extendSchemaValidation } from "./index";

describe("extendSchemaValidation function", () => {
  describe("type: NOT_EQUAL", () => {
    describe("string based validation", () => {
      test("should build correct validator, for common base schema", () => {
        const testSchema = z.string();
        const newSchema = extendSchemaValidation(testSchema, {
          type: "NOT_EQUAL",
          value: "test",
          errorMessage: "Value should not be equal to 'test'"
        });

        expect(newSchema.safeParse("value").success).toBeTruthy();
        expect(newSchema.safeParse("test").success).toBeFalsy();
        expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
      });

      test("should build correct validator, for refined schema", () => {
        const testSchema = z
          .string()
          .refine((val) => val.length > 1, { message: "Value should be longer than 1 char" });
        const newSchema = extendSchemaValidation(testSchema, {
          type: "NOT_EQUAL",
          value: "test",
          errorMessage: "Value should not be equal to 'test'"
        });

        expect(newSchema.safeParse("value").success).toBeTruthy();
        expect(newSchema.safeParse("test").success).toBeFalsy();
        expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
      });
    });

    describe("number based validation", () => {
      test("should build correct validator, for common base schema", () => {
        const testSchema = z.string();
        const newSchema = extendSchemaValidation(testSchema, {
          type: "NOT_EQUAL",
          value: "test",
          errorMessage: "Value should not be equal to 'test'"
        });

        expect(newSchema.safeParse("value").success).toBeTruthy();
        expect(newSchema.safeParse("test").success).toBeFalsy();
        expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
      });

      test("should build correct validator, for refined schema", () => {
        const testSchema = z
          .string()
          .refine((val) => val.length > 1, { message: "Value should be longer than 1 char" });
        const newSchema = extendSchemaValidation(testSchema, {
          type: "NOT_EQUAL",
          value: "test",
          errorMessage: "Value should not be equal to 'test'"
        });

        expect(newSchema.safeParse("value").success).toBeTruthy();
        expect(newSchema.safeParse("test").success).toBeFalsy();
        expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
      });
    });
  });
});
