import { z } from "zod";

export const BasicSchema = z.object({
  object1: z.object({
    string: z.string(),
    number: z.number(),
    boolean: z.boolean(),
    object3: z.object({
      string: z.string(),
      number: z.number(),
      boolean: z.boolean()
    })
  }),
  string: z.string(),
  number: z.number(),
  boolean: z.boolean(),
  object2: z.object({
    string: z.string(),
    number: z.number(),
    boolean: z.boolean()
  })
});
export type BasicSchemaType = z.infer<typeof BasicSchema>;

export const RefineBasicSchema = z.object({
  object1: z.object({
    object3: z.object({
      string: z.string().refine((val) => val.length > 1, { message: "String value should be longer than 1" }),
      number: z.number().refine((val) => val > 0, { message: "Number value should be bigger than 0" }),
      boolean: z.boolean()
    }),
    string: z.string().refine((val) => val.length > 1, { message: "String value should be longer than 1" }),
    number: z.number().refine((val) => val > 0, { message: "Number value should be bigger than 0" }),
    boolean: z.boolean()
  }),
  string: z.string().refine((val) => val.length > 1, { message: "String value should be longer than 1" }),
  number: z.number().refine((val) => val > 0, { message: "Number value should be bigger than 0" }),
  boolean: z.boolean(),
  object2: z.object({
    string: z.string().refine((val) => val.length > 1, { message: "String value should be longer than 1" }),
    number: z.number().refine((val) => val > 0, { message: "Number value should be bigger than 0" }),
    boolean: z.boolean()
  })
});
