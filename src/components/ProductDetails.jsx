import { useEffect,useState } from "react";
import React from "react";
import { useParams, Link,useNavigate } from "react-router-dom";

export const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((prod) => prod.id === parseInt(productId));
  const [quantity,setQuantity]=useState(1)
  const [cart,setCart] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const cartData= localStorage.getItem("cart")
    if(cartData){
      setCart(JSON.parse(cartData))
    }

  },[])
  const handleAddToCart=()=>{
    const cartItem={
      id:product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      quantity:quantity

    }
    //update cart in loacl storage
    const updateCart=[...cart,cartItem]
    localStorage.setItem("cart",JSON.stringify(updateCart))
    setCart(updateCart)
   
    navigate("/CartPage")
    console.log(updateCart)
  }
  const removeFromCart=(itemToRemove)=>{
    const updatedCart=cart.filter((item)=>item.id!== itemToRemove.id)
    localStorage.setItem("cart",JSON.stringify(updateCart))
    setCart(updatedCart)
  }
  if (!product) {
    return <p>Loading product details...</p>; // Handle case when product is not available
  }

  return (
    <>
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
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div>
          <label htmlFor="quantity">
            Quantity
          </label>
          <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
          
          />
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick= {()=>handleAddToCart(product)}>Add to Cart</button>
        {cart.some((item)=>item.id===product.id)&&(
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={()=>removeFromCart(product)}>Remove From Cart</button>

        )}
        
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Info</h1>
        <p className="mt-2 text-gray-600">
          Vendor: <Link to={`vendor/${product.vendor.id}`} className="text-blue-500 hover:underline">{product.vendor.user.name}</Link>
        </p>
        <p className="text-gray-600 mt-2">Contact: {product.vendor.contact_details}</p>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Shipping Address</h1>
        <p className="mt-2 text-gray-600">Shipping Address: {product.shipping_address}</p>
        <p className="text-gray-600 mt-2">Shipping Policy: {product.shipping_policy}</p>
        <p className="text-gray-600 mt-2">Return Policy: {product.return_policy}</p>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
        <p className="mt-2 text-gray-600">{product.vendor.bank_details}</p>
      </div>
      <div className="mt-8">
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

    </>
  );
};
