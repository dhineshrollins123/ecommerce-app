import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [qty, setQty] = useState(1);

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty > 1) {
				return prevQty - 1;
			}
			return 1;
		});
	};

	const onAdd = (product, quantity) => {
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((item) => {
				if (item._id === product._id) {
					return {
						...item,
						quantity: item.quantity + quantity,
					};
				}
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${quantity} ${product.name} added to cart`);
	};

	let index;
	let foundProduct;

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item?._id === product?._id);

		const newCartItems = cartItems.filter((item) => item._id !== product._id)

		setTotalPrice(prevTotalPrice => prevTotalPrice - (foundProduct.price * foundProduct.quantity))
		setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity)

		setCartItems(newCartItems)

	}

	const cartItemsModification = (id, value) => {
		foundProduct = cartItems.find((item) => item?._id === id);
		index = cartItems.findIndex((item) => item?._id === id);

		const updated = cartItems.filter((item) => item._id !== id);

		if (value === "inc") {
			setCartItems([
				...updated,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);

			setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct?.price);
		} else if (value === "dec") {
			if (foundProduct?.quantity > 1) {
				setCartItems([
					...updated,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);

				setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
			}
		}
	};

	return (
		<Context.Provider
			value={{
				incQty,
				decQty,
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantity,
				qty,
				onAdd,
				cartItemsModification,
				onRemove,
				setCartItems,
				setTotalQuantity,
				setTotalPrice
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
