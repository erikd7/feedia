import { ReasonPhrases } from "http-status-codes";

export default function (value: any, schema: any, schemaName: string) {
  const res = schema.required().validate(value);
  if (res.error) {
    //@ts-ignore
    throw new ApiError(
      res.error.details.map((d: Error) => d.message).join(),
      ReasonPhrases.BAD_REQUEST,
      `validating schema '${schemaName}'`
    );
  }
  return { ok: true };
}
