
export const selectCartItems = (state) => state.cart.items;
export const selectCartQtyById = (id) => (state) => state.cart.items[id]?.qty || 0;
