import { faker } from "@faker-js/faker/locale/pl";
import { build } from "@jackfranklin/test-data-bot";
import { type BasicSchemaType } from "~/tests/schemas";

export function buildBasicSchema() {
  return build<BasicSchemaType>({
    fields: {
      string: faker.string.sample({ min: 2, max: 8 }),
      number: faker.number.int({ min: 1, max: 80 }),
      boolean: faker.datatype.boolean(),
      object1: {
        string: faker.string.sample({ min: 2, max: 8 }),
        number: faker.number.int({ min: 6, max: 80 }),
        boolean: faker.datatype.boolean(),
        object3: {
          string: faker.string.sample({ min: 2, max: 8 }),
          number: faker.number.int({ min: 6, max: 80 }),
          boolean: faker.datatype.boolean()
        }
      },
      object2: {
        string: faker.string.sample({ min: 2, max: 8 }),
        number: faker.number.int({ min: 6, max: 80 }),
        boolean: faker.datatype.boolean()
      }
    },
    traits: {
      valid: {
        postBuild: (data) => {
          return {
            string: faker.string.sample({ min: 8, max: 16 }),
            number: faker.number.int({ min: 80, max: 100 }),
            boolean: !data.boolean,
            object1: {
              string: faker.string.sample({ min: 8, max: 16 }),
              number: faker.number.int({ min: 80, max: 100 }),
              boolean: !data.object1.boolean,
              object3: {
                string: faker.string.sample({ min: 8, max: 16 }),
                number: faker.number.int({ min: 80, max: 100 }),
                boolean: !data.object1.object3.boolean
              }
            },
            object2: {
              string: faker.string.sample({ min: 8, max: 16 }),
              number: faker.number.int({ min: 80, max: 100 }),
              boolean: !data.object2.boolean
            }
          };
        }
      }
    }
  });
}
