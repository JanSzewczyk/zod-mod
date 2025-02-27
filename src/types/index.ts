export const ZodModificationConfigType = {
  NOT_EQUAL: "NOT_EQUAL"
} as const;
export type ZodModificationConfigType = (typeof ZodModificationConfigType)[keyof typeof ZodModificationConfigType];

export type ZodModificationConfig = {
  type: ZodModificationConfigType;
  path: string | Array<string>;
  value: any;
  errorMessage: string;
};

export type ProcessedZodModificationConfig = {
  type: ZodModificationConfigType;
  path: Array<string>;
  value: any;
  errorMessage: string;
};
