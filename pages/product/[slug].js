import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import Product from "../../components/Product";
import {
	AiOutlineStar,
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
	const { name, image, details, price } = product;

    const {incQty,decQty,qty,onAdd,setShowCart} = useStateContext()
	const [index, setIndex] = useState(0);

	const handleBuyNow = () => {
		onAdd(product,qty);
		setShowCart(true);
	}

	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img src={urlFor(image && image[index])} className="product-detail-image" />
					</div>
					<div className="small-images-container">
						{image?.map((item, i) => (
							<img
								key={i}
								className={
									i === index ? "small-image selected-image" : "small-image"
								}
								src={urlFor(item)}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
				<div className="product-detail-desc">
					<h1>{name}</h1>
					<div className="reviews">
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details : </h4>
					<p>{details}</p>
					<p className="price">₹ {price}</p>
					<div className="quantity">
						<h3>Quantity : </h3>
						<p className="quantity-desc">
							<span className="minus" onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className="num">
								{qty}
							</span>
							<span className="plus" onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className="buttons">
						<button type="button" onClick={() => onAdd(product,qty)} className="add-to-cart">
							Add to Cart
						</button>
						<button type="button" onClick={handleBuyNow} className="buy-now">
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className="maylike-products-wrapper">
				<h2>You may also like</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

export const getStaticPaths = async () => {
	const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const product = await client.fetch(query);

	const queryAllProducts = "*[_type == 'product']";
	const products = await client.fetch(queryAllProducts);

	return {
		props: {
			product,
			products,
		},
	};
};
