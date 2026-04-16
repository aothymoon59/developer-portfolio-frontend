const appendValue = (formData, key, value) => {
  if (value === undefined || value === null) return;
  formData.append(key, value);
};

export function buildMultipartFormData(values, config = {}) {
  const formData = new FormData();
  const fileFields = config.fileFields || {};
  const jsonFields = new Set(config.jsonFields || []);
  const transform = config.transform || ((nextValues) => nextValues);
  const normalizedValues = transform(values);

  Object.entries(normalizedValues).forEach(([key, value]) => {
    const fileFieldName = fileFields[key];

    if (value instanceof File) {
      appendValue(formData, fileFieldName || key, value);
      return;
    }

    if (jsonFields.has(key)) {
      appendValue(formData, key, JSON.stringify(value));
      return;
    }

    if (typeof value === "boolean" || typeof value === "number") {
      appendValue(formData, key, String(value));
      return;
    }

    appendValue(formData, key, value);
  });

  return formData;
}
