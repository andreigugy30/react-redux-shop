import { createSlice } from "@reduxjs/toolkit";

const intialState = { cartIsVisible: false };
const uiSlice = createSlice({
	name: "ui",
	initialState: intialState,
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
