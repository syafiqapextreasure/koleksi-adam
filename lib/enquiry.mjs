export function validateEnquiry(values) {
  if (!values || (values.consent !== true && values.consent !== "on")) return null;
  const fields = {};
  for (const key of ["name", "email", "phone", "collection", "message"]) {
    const value = values[key];
    if (typeof value !== "string" || !value.trim() || value.length > (key === "message" ? 3000 : 180)) return null;
    fields[key] = value.trim();
  }
  if (!/^\S+@\S+\.\S+$/.test(fields.email) || !/^\+?[0-9\s()-]{7,24}$/.test(fields.phone)) return null;
  return fields;
}

