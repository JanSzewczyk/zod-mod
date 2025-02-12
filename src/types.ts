export const ZodModificationConfigType = {
  NOT_EQUAL: "NOT_EQUAL"
} as const;
export type ZodModificationConfigType = (typeof ZodModificationConfigType)[keyof typeof ZodModificationConfigType];

export type ZodModificationConfig = {
  type: ZodModificationConfigType;
  path: string;
  value: any;
  errorMessage: string;
};
