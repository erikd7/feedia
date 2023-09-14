export default function (value, schema, schemaName) {
  const res = schema.required().validate(value);
  if (res.error) {
    throw new ApiError(
      res.error.details.map(d => d.message).join(),
      "bad-request",
      `validating schema '${schemaName}'`
    );
  }
  return { ok: true };
}
