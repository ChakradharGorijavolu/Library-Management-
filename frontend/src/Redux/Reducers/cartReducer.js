import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // { id: { ...bookData, qty: N } }
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // book object with full details
      if (!state.items[item.id]) {
        state.items[item.id] = { ...item, qty: 1 };
      }
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].qty += 1;
      }
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].qty -= 1;

        if (state.items[id].qty <= 0) {
          delete state.items[id];
        }
      }
    },
  },
});

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
