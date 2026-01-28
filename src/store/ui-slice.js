import { createSlice } from "@reduxjs/toolkit";

const intialState = { cartIsVisible: false, notification: null };
const uiSlice = createSlice({
	name: "ui",
	initialState: intialState,
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			}; //status is pendion, error or success
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
