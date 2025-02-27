import { prepareModificationConfigArray } from "~/helpers/modification-configuration";
import { buildZodModConfiguration } from "~/tests/builders/zod-mod-config";

describe("prepareModificationConfigArray function", () => {
  const zodModConfigurationBuilder = buildZodModConfiguration();

  const processedZodModificationConfigs = prepareModificationConfigArray([
    zodModConfigurationBuilder({ overrides: { path: "a.b.c.d" } }),
    zodModConfigurationBuilder({ overrides: { path: ["a", "b", "f"] } }),
    zodModConfigurationBuilder({ overrides: { path: "a.h" } })
  ]);

  test("processes configuration correctly", () => {
    expect(processedZodModificationConfigs.length).toEqual(3);
    expect(processedZodModificationConfigs.map((x) => x.path)).toContainEqual(["a", "b", "f"]);
    expect(processedZodModificationConfigs.map((x) => x.path)).toContainEqual(["a", "h"]);
    expect(processedZodModificationConfigs.map((x) => x.path)).toContainEqual(["a", "b", "c", "d"]);
  });

  test("sorts by the most nested path", () => {
    expect(processedZodModificationConfigs[0].path).toEqual(["a", "b", "c", "d"]);
    expect(processedZodModificationConfigs[1].path).toEqual(["a", "b", "f"]);
    expect(processedZodModificationConfigs[2].path).toEqual(["a", "h"]);
  });
});
