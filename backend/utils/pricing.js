export const calculateOrderTotals = (items, deliveryFee) => {
  const subtotal = Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  return { subtotal, deliveryFee, total: Number((subtotal + deliveryFee).toFixed(2)) };
};
