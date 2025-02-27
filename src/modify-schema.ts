import { type z } from "zod";

import { getFieldValidationSchema, setFieldValidationSchema } from "~/helpers/field-schema";
import { prepareModificationConfigArray } from "~/helpers/modification-configuration";
import { type ZodModificationConfig } from "~/types";
import { extendSchemaValidation } from "~/validation";

export function modifySchema<T extends z.AnyZodObject>(schema: T, config: Array<ZodModificationConfig>): T {
  const processedConfig = prepareModificationConfigArray(config);

  let newSchema = schema;

  processedConfig.forEach(({ path, ...restConfig }) => {
    const fieldSchema = getFieldValidationSchema(newSchema, path);

    const updatedFieldSchema = extendSchemaValidation(fieldSchema, restConfig);

    newSchema = setFieldValidationSchema(newSchema, path, updatedFieldSchema) as T;
  });

  return newSchema;
}
