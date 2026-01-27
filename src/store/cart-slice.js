import { createSlice } from "@reduxjs/toolkit";

const intialState = { items: [], totalQuantity: 0, totalAmount: 0 };
const cartSlice = createSlice({
	name: "cart",
	initialState: intialState,
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity = existingItem.quantity;
				totalPrice = totalPrice + newItem.price;
			}
		},
		removeItemFromCart() {},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
