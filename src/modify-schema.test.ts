import { modifySchema } from "~/modify-schema";
import { buildBasicSchema } from "~/tests/builders/basic";
import { buildZodModConfigurationArray } from "~/tests/builders/zod-mod-config";
import { BasicSchema, RefineBasicSchema } from "~/tests/schemas";

describe("modifySchema function", () => {
  test("parses basics schema fields correctly", () => {
    const basicSchemaBuilder = buildBasicSchema();
    const testData = basicSchemaBuilder();

    [BasicSchema, RefineBasicSchema].forEach((schema) => {
      expect(schema.safeParse(testData).success).toBeTruthy();

      const config = buildZodModConfigurationArray({
        data: testData,
        fieldPaths: [
          "object1.object3.boolean",
          "string",
          "object1.string",
          "object1.boolean",
          "object1.number",
          "object2.number",
          "object2.number",
          "object1.object3.string",
          "number",
          "object2.boolean",
          "boolean",
          "object1.object3.number"
        ]
      });

      const modifiedSchema = modifySchema({
        schema,
        config
      });

      const validationResult = modifiedSchema.safeParse(testData);
      expect(validationResult.success).toBeFalsy();
      expect(validationResult.error?.errors.length).toBe(12);

      const errorMessages = config.map((config) => config.errorMessage);
      const validationErrorMessages = validationResult.error?.errors.map((error) => error.message);
      errorMessages.forEach((errorMessage) => {
        expect(validationErrorMessages).toContainEqual(errorMessage);
      });

      const validTestData = basicSchemaBuilder({ traits: "valid" });
      expect(modifiedSchema.safeParse(validTestData).success).toBeTruthy();
    });
  });
});
