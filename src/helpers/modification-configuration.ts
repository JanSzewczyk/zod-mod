import { getPath } from "~/helpers/path";
import { type ProcessedZodModificationConfig, type ZodModificationConfig } from "~/types";

export function prepareModificationConfigArray(
  configArray: Array<ZodModificationConfig>
): Array<ProcessedZodModificationConfig> {
  return configArray.map((config) => {
    const { path, ...rest } = config;

    return { ...rest, path: getPath(path) };
  });
}
