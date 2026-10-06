import test from "node:test";
import assert from "node:assert/strict";
import { calculateOrderTotals } from "../utils/pricing.js";

test("pricing is calculated from server-side item prices", () => {
  const result = calculateOrderTotals([
    { price: 10, quantity: 2 },
    { price: 5.5, quantity: 1 },
  ], 2);
  assert.deepEqual(result, { subtotal: 25.5, deliveryFee: 2, total: 27.5 });
});
