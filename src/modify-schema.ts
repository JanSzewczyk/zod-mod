import { type z } from "zod";

import { extendSchemaValidation } from "~/validation";

import { getFieldValidationSchema, setFieldValidationSchema } from "./field-schema";
import { type ZodModificationConfig } from "./types";
import { getPath } from "./utils";

export function modifySchema<T extends z.ZodType<any, any>>({
  schema,
  config
}: {
  config: Array<ZodModificationConfig>;
  schema: T;
}): T {
  let newSchema = schema;

  config.forEach(({ path, ...restConfig }) => {
    const arrayPath = getPath(path);
    const fieldSchema = getFieldValidationSchema(newSchema, arrayPath);

    const updatedFieldSchema = extendSchemaValidation(fieldSchema, restConfig);

    // @ts-ignore
    newSchema = setFieldValidationSchema(newSchema, arrayPath, updatedFieldSchema);
  });

  return newSchema;
}
