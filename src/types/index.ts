export const ZodModificationConfigType = {
  NOT_EQUAL: "NOT_EQUAL"
} as const;
export type ZodModificationConfigType = (typeof ZodModificationConfigType)[keyof typeof ZodModificationConfigType];

type ZodModificationConfigValueTypes = null | undefined | string | number | boolean;
export type ZodModificationConfigValue = ZodModificationConfigValueTypes | Array<ZodModificationConfigValueTypes>;

type ZodModificationConfigBase<Path> = {
  type: ZodModificationConfigType;
  path: Path;
  value: ZodModificationConfigValue;
  errorMessage: string;
};
export type ZodModificationConfig = ZodModificationConfigBase<string | Array<string>>;
export type ProcessedZodModificationConfig = ZodModificationConfigBase<Array<string>>;
