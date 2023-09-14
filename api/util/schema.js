export const validateSchema = (value, schema) => {
  const res = schema.required().validate(value);
  if (res.error) {
    return {
      ok: false,
      reason: "bad-request",
      message: res.error.details.map(d => d.message).join()
    };
  }
  return { ok: true };
};
