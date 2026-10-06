import test from "node:test";
import assert from "node:assert/strict";
import { isStrongPassword, normalizeEmail, pickAddress } from "../utils/validation.js";

test("email normalization is deterministic", () => {
  assert.equal(normalizeEmail("  USER@Example.COM "), "user@example.com");
});

test("strong password rules require letters and numbers", () => {
  assert.equal(isStrongPassword("abcdef12"), true);
  assert.equal(isStrongPassword("abcdefgh"), false);
  assert.equal(isStrongPassword("12345678"), false);
});

test("address normalization removes uncontrolled length", () => {
  const address = pickAddress({ firstName: "A", street: "x".repeat(500) });
  assert.equal(address.street.length, 200);
});
