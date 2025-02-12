import { type z } from "zod";

import { ZodModificationConfigType, type ZodModificationConfig } from "~/types";

import { notEqualValidation } from "./not-equal";

export function extendSchemaValidation(
  schema: z.ZodType<any, any>,
  { type, ...config }: Omit<ZodModificationConfig, "path">
): z.ZodEffects<z.ZodType<any, any, any>, any, any> {
  switch (type) {
    case ZodModificationConfigType.NOT_EQUAL:
      return notEqualValidation(schema, config);
    default:
      throw new Error(`Unknown configuration type: ${type}`);
  }
}
