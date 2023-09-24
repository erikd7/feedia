import dayjs from "dayjs";
import config from "../config/build";

const get = key => {
  const object = JSON.parse(localStorage[key] || "null");
  if (object) {
    if (!isExpired(object.expires)) {
      return object.value;
    } else {
      localStorage.removeItem(key);
    }
  }
};

const set = (
  key,
  value,
  {
    expirationValue = config.cache.localStorage.defaultExpirationHours,
    expirationUnits = "h"
  } = {},
  overwrite = false
) => {
  const current = JSON.parse(localStorage[key] || "null");
  if (!current || overwrite || isExpired(current.expires)) {
    const object = {
      value,
      expires: dayjs().add(expirationValue, expirationUnits)
    };
    localStorage[key] = JSON.stringify(object);
  }
};

const remove = key => {
  localStorage.removeItem(key);
};

const isExpired = (expires, time) => {
  return dayjs(time).isAfter(dayjs(expires));
};

export { get, set, remove };
