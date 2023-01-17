import Link from 'next/link'
import React from 'react'

const Canceled = () => {
  return (
    <div className="success-wrapper">
			<div className="success">
				
				<h2>Your order has been canceled !</h2>
				
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
  )
}

export default Canceled