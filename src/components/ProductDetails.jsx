import React from "react";
import { useParams, Link } from "react-router-dom";

export const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((prod) => prod.id === parseInt(productId));

  if (!product) {
    return <p>Loading product details...</p>; // Handle case when product is not available
  }

  return (
    <>
      <h1>Product Details</h1>
      <div>
        <div>
          <img src={product.images} alt={product.name} />
        </div>
        <h1>Product Info</h1>
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <button>Add to Cart</button>
          <button>Remove From Cart</button>
        </div>
        <div>
          <h1>Vendor Info</h1>
          <p>
            Vendor:{" "}
            <Link to={`vendor/${product.vendor.id}`}>
              {product.vendor.user.name}
            </Link>
          </p>
          <p>Contact: {product.vendor.contact_details}</p>
        </div>
        <div>
          <h1>Shipping Address</h1>
          <p>Shipping Address: {product.shipping_address}</p>
          <p>Shipping Policy: {product.shipping_policy}</p>
          <p>Return Policy: {product.return_policy}</p>
        </div>
        <div>
          <h1>Payment Details</h1>
          <p>{product.vendor.bank_details}</p>
        </div>
        <div>
          <h1>Customer Reviews</h1>
          {/* {product.reviews.map((review) => (
            <div key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};
