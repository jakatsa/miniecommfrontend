import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const ProductDetails = ({ products , vendors }) => {
  console.log(vendors)

  const { productId } = useParams(); {/** This line extracts the productId parameter from the URL using the useParams hook provided by React Router. */}
  const product = products.find((prod) => prod.id === parseInt(productId)); {/**This line finds the specific product from the products array that matches the productId from the URL.
    */}
  const [quantity,setQuantity]=useState(1)
  const [cart,setCart] = useState([])
  const navigate = useNavigate()
 {/**  const currentVendor = vendors.find((vendor) => vendor.id === product.vendor?.id);*/}

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: quantity,
    };

    const updatedCart = cart.concat(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    navigate("/CartPage");
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  if (!product) {
    return <p>Product not found or loading...</p>;
  }

  return (
  
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1>Product Details</h1>
      <div className="p-6 bg-gray-50 min-h-screen">
  <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    <div className="flex justify-center p-4 bg-gray-100">
      <img
        src={product.images}
        alt={product.name}
        className="h-64 w-64 object-cover rounded-md"
      />
    </div>
    <div className="p-6">
  <h1 className="text-2xl font-bold text-gray-800">Product Info</h1>
  <div className="mt-4 flex flex-row flex-wrap gap-6">
    {/* Product Details */}
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-1 rounded w-full mt-1"
        />
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        {cart.some((item) => item.id === product.id) && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => removeFromCart(product)}
          >
            Remove From Cart
          </button>
        )}
      </div>
    </div>

    {/* Vendor Info */}
    <div className="flex-1 min-w-[300px]">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Info</h1>
      <p className="mt-2 text-gray-600">
        Vendor:{" "}
        <Link
          to={`vendor/${product.vendor?.id}`}
          className="text-blue-500 hover:underline"
        >
         
         {vendors[0]?.user?.name || "Unknown Vendor"}
        </Link>
      </p>
      <p className="text-gray-600 mt-2">Contact: {vendors[0]?.contact_details || "Not Provided"}</p>
    </div>

    {/* Shipping Address */}
    <div className="flex-1 min-w-[300px]">
      <h1 className="text-2xl font-bold text-gray-800">Shipping Address</h1>
      <p className="mt-2 text-gray-600">Shipping Address: {vendors[0]?.shipping_address || "Not Provided"}</p>
      <p className="text-gray-600 mt-2">Shipping Policy:{vendors[0]?.shipping_policy || "Not Provided"}</p>
      <p className="text-gray-600 mt-2">Return Policy: {vendors[0]?.return_policy || "Not Provided"}</p>
    </div>

    {/* Payment Details */}
    <div className="flex-1 min-w-[300px]">
      <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
      <p className="mt-2 text-gray-600">Mpesa Number:{vendors[0]?.bank_details || "Not Provided"}</p>
    </div>

    {/* Customer Reviews */}
    <div className="flex-1 min-w-[300px]">
      <h1 className="text-2xl font-bold text-gray-800">Customer Reviews</h1>
      {product.reviews?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {product.reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-100 rounded-md shadow-sm border border-gray-200"
            >
              <p className="text-sm text-gray-600">Rating: {review.rating}</p>
              <p className="text-gray-700 mt-1">Comment: {review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-2">No reviews yet.</p>
      )}
    </div>
  </div>
</div>

  </div>
</div>
</div>

    
  );
};

