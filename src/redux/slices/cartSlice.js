import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((subtotal, item) => subtotal + item.totalPrice, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          authorName: newItem.authorName,
          title: newItem.title,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: Number(newItem.price), // Convert price to a number
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += Number(newItem.price); // Convert price to a number and update total price
      }

      state.totalAmount = calculateSubtotal(state.cartItems); // Update the totalAmount
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice; // Subtract the item's total price
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cartItems: [],
//   totalAmount: 0,
//   totalQuantity: 0,
// };

// const calculateSubtotal = cartItems => {
//   return cartItems.reduce((subtotal, item) => subtotal + item.totalPrice, 0);
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.cartItems.find(item => item.id === newItem.id);

//       state.totalQuantity++;

//       if (!existingItem) {
//         state.cartItems.push({
//           id: newItem.id,
//           authorName: newItem.authorName,
//          title: newItem.title,
//           imgUrl: newItem.imgUrl,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: Number(newItem.price),
//         });
//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice += newItem.price; // Update the item's total price
//       }

//       state.totalAmount = calculateSubtotal(state.cartItems); // Update the totalAmount
//     },
//     deleteItem: (state, action) => {
//       const id = action.payload;
//       const existingItem = state.cartItems.find(item => item.id === id);

//       if (existingItem) {
//         state.totalQuantity -= existingItem.quantity;
//         state.totalAmount -= existingItem.totalPrice; // Subtract the item's total price
//         state.cartItems = state.cartItems.filter(item => item.id !== id);
//       }
//     },
//   },
// });

// export const cartActions = cartSlice.actions;

// export default cartSlice.reducer;