import React from 'react'
import {Link} from "react-router-dom"

export const CartPage = ({cart,setCart}) => {

  const removeFromCart=(itemToRemove)=>{
    const updatedCart=cart.filter((item)=>item.id!== itemToRemove.id)
    localStorage.setItem("cart",JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const handleUpdateQuantity=(item,newQuantity)=>{
    const updateCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity }; // Correctly spreading cartItem and updating the quantity
      }
      return cartItem;
    });

  localStorage.setItem("cart".JSON.stringify(updateCart))
  setCart(updateCart)  
  }

  const calculateTotal=()=>{
    return cart.reduce((total,item)=>total+item.price*item.quantity,0)
  }

  return (
    <>
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        <>
          {/* Wrapped the table and the checkout section in a React.Fragment */}
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}> {/* Added key prop to the row for proper list rendering */}
                  <td>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </td>
                  <td>
                    ${parseFloat(item.price).toFixed(2)} {/* Convert to number and then format */}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                  ${(parseFloat(item.price)*item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* React.Fragment ends here */}
          <div>
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            <button>Check Out</button>
          </div>
        </>
      )}
    </div>
  </>
  
  )
}
