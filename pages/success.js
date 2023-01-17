import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
	
	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantity(0);
		runFireworks();
	},[])
	
	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className="email-msg">
					Check your mailbox for the receipt.
				</p>
				<p className="description">
					If you have any queries,please email
					<a href="mailto:dhineshrollins4588@gmail.com" className="email">dhineshrollins4588@gmail.com</a>
				</p>

				<Link href={"/"}>
					<button type="button" className="btn">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
