import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//Create an action creator to put the logic from App.js -> useEffect (to keep the component more clean , even if the method is still good to take into consideration)

const FIREBASE_URL =
	"https://react-redux-79289-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
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
				body: JSON.stringify({
					items: cartData.items,
					totalQuantity: cartData.totalQuantity,
				}),
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

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(FIREBASE_URL);

			if (!response.ok) {
				throw new Error("Sending data failed!!!");
			}

			const responseData = await response.json();
			return responseData;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				}),
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error...",
					message: `Fetching cart data is not succesfully! - ${error}`,
				}),
			);
		}
	};
};
