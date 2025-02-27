import { type z } from "zod";

import { ZodModificationConfigType, type ZodModificationConfig } from "~/types";

import { notEqualValidation } from "./not-equal";

export function extendSchemaValidation(
  schema: z.ZodTypeAny,
  { type, ...config }: Omit<ZodModificationConfig, "path">
): z.ZodTypeAny {
  switch (type) {
    case ZodModificationConfigType.NOT_EQUAL:
      return notEqualValidation(schema, config);
    default:
      throw new Error(`Unknown configuration type: ${type}`);
  }
}
