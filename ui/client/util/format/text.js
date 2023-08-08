export const truncate = (text, maxLength = 300, suffix = "...") => {
  if (!text?.length || text.length <= maxLength) {
    return text;
  }
  return text?.substring(0, maxLength - suffix.length) + suffix;
};
