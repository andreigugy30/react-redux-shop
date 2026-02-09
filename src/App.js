import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData } from "./store/cart-actions";
import { sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notificationStatus = useSelector((state) => state.ui.notification);
	const dispatch = useDispatch();

	// const FIREBASE_URL =
	// 	"https://react-redux-79289-default-rtdb.europe-west1.firebasedatabase.app/cart.json";

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		//Commented sendCartData functionality from App.js useEffect and use the action creator from cart-slice.js

		// const sendCartData = async () => {
		// dispatch(
		// 	uiActions.showNotification({
		// 		status: "pending",
		// 		title: "Sending...",
		// 		message: "Sending cart data!",
		// 	}),
		// );
		// const response = await fetch(FIREBASE_URL, {
		// 	method: "PUT",
		// 	body: JSON.stringify(cart),
		// });
		// if (!response.ok) {
		// 	throw new Error("Sending data failed!!!");
		// }
		// const responseData = await response.json();
		// dispatch(
		// 	uiActions.showNotification({
		// 		status: "success",
		// 		title: "Success...",
		// 		message: "cart data is sent succesfully!",
		// 	}),
		// );
		// };

		if (isInitial) {
			isInitial = false;
			return;
		}

		// sendCartData().catch((error) => {
		// 	dispatch(
		// 		uiActions.showNotification({
		// 			status: "error",
		// 			title: "Error...",
		// 			message: `cart data is not sent succesfully! - ${error}`,
		// 		}),
		// 	);
		// });
		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);
	return (
		<Fragment>
			{notificationStatus && (
				<Notification
					status={notificationStatus.status}
					title={notificationStatus.title}
					message={notificationStatus.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
