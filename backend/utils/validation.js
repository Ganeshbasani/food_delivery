export const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
export const cleanText = (value, max = 500) => String(value || "").trim().slice(0, max);
export const isStrongPassword = (value) =>
  typeof value === "string" && value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
export const isPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
export const isPositiveInt = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

export const pickAddress = (address = {}) => ({
  firstName: cleanText(address.firstName, 80),
  lastName: cleanText(address.lastName, 80),
  email: normalizeEmail(address.email),
  street: cleanText(address.street, 200),
  city: cleanText(address.city, 100),
  state: cleanText(address.state, 100),
  country: cleanText(address.country, 100),
  zipcode: cleanText(address.zipcode, 20),
  phone: cleanText(address.phone, 30),
});
