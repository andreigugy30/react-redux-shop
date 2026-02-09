import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
	const { id, title, quantity, total, price } = props.item;
	console.log("🚀 ~ CartItem ~ quantity:", quantity);
	const dispatch = useDispatch();

	const addItemHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id,
				title,
				price,
			}),
		);
	};

	const removeItemHandler = () => {
		dispatch(cartActions.removeItemFromCart(id));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${(Number(total) || 0).toFixed(2)}{" "}
					<span className={classes.itemprice}>(
						${(Number(price) || 0).toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{Number(quantity) || 0}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={removeItemHandler}>-</button>
					<button onClick={addItemHandler}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
