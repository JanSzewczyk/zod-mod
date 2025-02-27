import { z } from "zod";

import { notEqualValidation } from "./not-equal";

describe("notEqualValidation function", () => {
  describe("string based validation", () => {
    test("builds correct validator, for common base schema", () => {
      const testSchema = z.string();
      const newSchema = notEqualValidation(testSchema, {
        value: "test",
        errorMessage: "Value should not be equal to 'test'"
      });

      expect(newSchema.safeParse("value").success).toBeTruthy();
      expect(newSchema.safeParse("test").success).toBeFalsy();
      expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
    });

    test("builds correct validator, for refined schema", () => {
      const testSchema = z.string().refine((val) => val.length > 1, { message: "Value should be longer than 1 char" });
      const newSchema = notEqualValidation(testSchema, {
        value: "test",
        errorMessage: "Value should not be equal to 'test'"
      });

      expect(newSchema.safeParse("value").success).toBeTruthy();
      expect(newSchema.safeParse("test").success).toBeFalsy();
      expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
    });
  });

  describe("number based validation", () => {
    test("builds correct validator, for common base schema", () => {
      const testSchema = z.string();
      const newSchema = notEqualValidation(testSchema, {
        value: "test",
        errorMessage: "Value should not be equal to 'test'"
      });

      expect(newSchema.safeParse("value").success).toBeTruthy();
      expect(newSchema.safeParse("test").success).toBeFalsy();
      expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
    });

    test("builds correct validator, for refined schema", () => {
      const testSchema = z.string().refine((val) => val.length > 1, { message: "Value should be longer than 1 char" });
      const newSchema = notEqualValidation(testSchema, {
        value: "test",
        errorMessage: "Value should not be equal to 'test'"
      });

      expect(newSchema.safeParse("value").success).toBeTruthy();
      expect(newSchema.safeParse("test").success).toBeFalsy();
      expect(newSchema.safeParse("test")?.error?.errors?.[0]?.message).toEqual("Value should not be equal to 'test'");
    });
  });

  describe("array based validation", () => {
    test("builds correct string array validator", () => {
      [
        z.array(z.string()),
        z.string().array(),
        z.array(z.string()).refine((val) => val.length > 1, { message: "Value should be longer than 1" }),
        z
          .string()
          .array()
          .refine((val) => val.length > 1, { message: "Value should be longer than 1" })
      ].forEach((testSchema) => {
        const newSchema = notEqualValidation(testSchema, {
          value: ["a", "b", "c"],
          errorMessage: 'Value should not be equal to \'["a", "b", "c"]\''
        });
        expect(newSchema.safeParse(["a", "c"]).success).toBeTruthy();
        expect(newSchema.safeParse(["a", "c", "b"]).success).toBeFalsy();
        expect(newSchema.safeParse(["a", "c", "b"])?.error?.errors?.[0]?.message).toEqual(
          'Value should not be equal to \'["a", "b", "c"]\''
        );
      });
    });

    test("builds correct number array validator", () => {
      [
        z.array(z.number()),
        z.number().array(),
        z.array(z.number()).refine((val) => val.length > 1, { message: "Value should be longer than 1" }),
        z
          .number()
          .array()
          .refine((val) => val.length > 1, { message: "Value should be longer than 1" })
      ].forEach((testSchema) => {
        const newSchema = notEqualValidation(testSchema, {
          value: [1, 2, 3],
          errorMessage: "Value should not be equal to '[1, 2, 3]'"
        });
        expect(newSchema.safeParse([1, 2]).success).toBeTruthy();
        expect(newSchema.safeParse([3, 1, 2]).success).toBeFalsy();
        expect(newSchema.safeParse([3, 1, 2])?.error?.errors?.[0]?.message).toEqual(
          "Value should not be equal to '[1, 2, 3]'"
        );
      });
    });
  });
});
