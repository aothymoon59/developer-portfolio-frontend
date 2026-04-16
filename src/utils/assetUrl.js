const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1";

const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch (error) {
    return "";
  }
})();

export function resolveAssetUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${API_ORIGIN}${value}`;
  return `${API_ORIGIN}/${value}`;
}

export { API_BASE_URL, API_ORIGIN };
