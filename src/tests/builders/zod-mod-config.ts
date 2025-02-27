import * as _ from "lodash";

import { faker } from "@faker-js/faker/locale/pl";
import { build, oneOf, perBuild } from "@jackfranklin/test-data-bot";
import { type ZodModificationConfig, ZodModificationConfigType } from "~/types";

export function buildZodModConfigurationArray({
  data,
  fieldPaths,
  type = ZodModificationConfigType.NOT_EQUAL
}: {
  data: object;
  type?: ZodModificationConfigType;
  fieldPaths: Array<string>;
}): Array<ZodModificationConfig> {
  return fieldPaths.map((path) =>
    buildZodModConfiguration()({
      traits: "notEqual",
      overrides: {
        path,
        value: _.get(data, path),
        errorMessage: buildZodModConfigurationArrayValidationMessage({
          type,
          fieldPath: path,
          value: _.get(data, path)
        })
      }
    })
  );
}

export const NOT_EQUAL_VALIDATION_ERROR_MESSAGES = "<fieldPath> should not be equal to '<value>'";

export function buildZodModConfigurationArrayValidationMessage({
  value,
  fieldPath,
  type = ZodModificationConfigType.NOT_EQUAL
}: {
  value: any;
  type?: ZodModificationConfigType;
  fieldPath: string;
}): string {
  if (type === ZodModificationConfigType.NOT_EQUAL) {
    return NOT_EQUAL_VALIDATION_ERROR_MESSAGES.replace("<fieldPath>", fieldPath).replace("<value>", value);
  }
  return "";
}

export function buildZodModConfiguration() {
  return build<ZodModificationConfig>({
    fields: {
      type: oneOf(...Object.values(ZodModificationConfigType)),
      path: perBuild(() => faker.helpers.arrayElements(["path1", "path2", "path3"]).join(".")),
      value: oneOf(null, undefined, faker.string.sample()),
      errorMessage: faker.lorem.sentence()
    },
    traits: {
      notEqual: {
        postBuild: (zodModConfig) => ({
          ...zodModConfig,
          type: ZodModificationConfigType.NOT_EQUAL
        })
      }
    }
  });
}
