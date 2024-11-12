import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isModelOpen: false,
    error: "",
    token: null,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    toggleModel: (state, action) => {
      state.isModelOpen = action.payload;
    },
    emptyCart: (state) => {
      state.items = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  toggleModel,
  emptyCart,
  setError,
  setToken,
} = cartReducer.actions;

export default cartReducer.reducer;
