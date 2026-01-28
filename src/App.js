import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";

function App() {
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);

	const FIREBASE_URL =
		"https://react-redux-79289-default-rtdb.europe-west1.firebasedatabase.app/cart.json";

	useEffect(() => {
		fetch(FIREBASE_URL, {
			method: "PUT",
			body: JSON.stringify(cart),
		});
	}, [cart]);
	return (
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
