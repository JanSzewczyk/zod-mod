import { z } from "zod";

import { modifySchema } from "./modify-schema";

const TestSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.object({
    id: z.string(),
    name: z.string()
  })
});

describe("test", () => {
  test("1", () => {
    const Schema = modifySchema({
      schema: TestSchema,
      config: [{ type: "NOT_EQUAL", path: "id", value: "1", errorMessage: "id should not be 1" }]
    });

    const validationResult = Schema.safeParse({
      id: "2",
      name: "Fox",
      ingredients: {
        id: "3",
        name: "leg"
      }
    });
    expect(validationResult.success).toBeTruthy();
    expect(validationResult.data?.id).toEqual("2");

    const validationResultFailed = Schema.safeParse({
      id: "1",
      name: "asdfasdfsa",
      ingredients: {
        id: "1",
        name: "sdasd"
      }
    });

    expect(validationResultFailed.success).toBeFalsy();
    expect(validationResultFailed.error?.errors[0].message).toEqual("id should not be 1");
  });
  // test("test 2", async ({}) => {
  //   const Schema = buildZOD({
  //     schema: TestSchema,
  //     config: [
  //       { path: "id", value: "1", errorMessage: "id should not be 1" },
  //       { path: "ingredients.id", value: "1", errorMessage: "id should not be 1" }
  //     ]
  //   });
  //
  //   // expect(
  //   //   Schema.parse({
  //   //     id: "2",
  //   //     name: "asdfasdfsa",
  //   //     ingredients: {
  //   //       id: "dfsdf",
  //   //       name: "sdasd"
  //   //     }
  //   //   })?.id
  //   // ).toBe("2");
  //   expect(
  //     Schema.parse({
  //       id: "1",
  //       name: "asdfasdfsa",
  //       ingredients: {
  //         id: "1",
  //         name: "sdasd"
  //       }
  //     })
  //   ).toEqual(7);
  // });
});
