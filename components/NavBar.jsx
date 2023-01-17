import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";

const NavBar = () => {

  const {showCart,setShowCart,totalQuantity} = useStateContext()
	return (
		<div className="navbar-container">
			<p className="logo">
				<Link href={"/"}>boAt Headphones</Link>
			</p>

			<button type="button" onClick={() => setShowCart(true)} className="cart-icon">
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantity}</span>
			</button>

			{showCart && <Cart />}
		</div>
	);
};

export default NavBar;
