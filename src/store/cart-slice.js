import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const intialState = { items: [], totalQuantity: 0, totalAmount: 0 };

const FIREBASE_URL =
	"https://react-redux-79289-default-rtdb.europe-west1.firebasedatabase.app/cart.json";

const cartSlice = createSlice({
	name: "cart",
	initialState: intialState,
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity = existingItem.quantity + 1;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			if (existingItem.quantity === 1) {
				state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

//Create an action creator to put the logic from App.js -> useEffect (to keep the component more clean , even if the method is still good to take into consideration)
export const sendCartData = (cartData) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			}),
		);
		const sendRequest = async () => {
			const response = await fetch(FIREBASE_URL, {
				method: "PUT",
				body: JSON.stringify(cartData),
			});
			console.log("🚀 ~ sendRequest ~ response:", response);

			if (!response.ok) {
				throw new Error("Sending data failed!!!");
			}
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success...",
					message: "cart data is sent succesfully!",
				}),
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error...",
					message: `cart data is not sent succesfully! - ${error}`,
				}),
			);
		}
	};
};

export const cartActions = cartSlice.actions;

export default cartSlice;
