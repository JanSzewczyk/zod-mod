import { type z } from "zod";

import { type ZodModificationConfig, type ZodModificationConfigValueTypes } from "~/types";

export function notEqualValidation(
  schema: z.ZodTypeAny,
  { value, errorMessage }: Omit<ZodModificationConfig, "type" | "path">
) {
  return schema.refine(
    (val) => {
      if (Array.isArray(val) && Array.isArray(value)) {
        return !arraysEqual(val, value);
      }
      return val !== value;
    },
    { message: errorMessage }
  );
}

function arraysEqual(arr1: Array<string | number>, arr2: Array<ZodModificationConfigValueTypes>) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return true;
}
