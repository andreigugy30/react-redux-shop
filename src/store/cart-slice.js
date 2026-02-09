import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		replaceCart(state, action) {
			const items = action.payload.items || [];
			state.totalQuantity = action.payload.totalQuantity || 0;
			// normalize incoming items so we never have undefined quantities or totals
			state.items = items.map((item) => {
				const quantity = Number(item.quantity) || 0;
				const price = Number(item.price) || 0;
				const totalPrice = Number(item.totalPrice) || price * quantity || 0;
				return {
					id: item.id,
					price,
					quantity,
					totalPrice,
					name: item.name || item.title || "",
				};
			});
			state.changed = false; // fresh from server, not changed locally
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			state.changed = true;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity = (existingItem.quantity || 0) + 1;
				existingItem.totalPrice =
					(existingItem.totalPrice || 0) + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (!existingItem) return;
			state.totalQuantity--;
			state.changed = true;
			if (existingItem.quantity <= 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity = (existingItem.quantity || 0) - 1;
				existingItem.totalPrice =
					(existingItem.totalPrice || 0) - existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
