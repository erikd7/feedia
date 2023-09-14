export const getSuccessBody = (body, bodyKey) => {
  const bodyVal = body[bodyKey];
  let statusName;
  //Undefined, null, or empty array
  if (
    typeof bodyVal === "undefined" ||
    bodyVal === null ||
    (Array.isArray(bodyVal) && !bodyVal.length)
  ) {
    statusName = "no-content";
  } else {
    statusName = "success";
  }

  const status = getStatusByReason(statusName);

  return { status, body };
};

export const getResponseBody = (response, bodyKey) => {
  const { ok, ...body } = response;

  if (ok) return getSuccessBody(body, bodyKey);

  return getFailureBody(response);
};
