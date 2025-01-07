import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const CheckOutPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    console.log("Order details", {
      fullName,
      email,
      phone,
      country,
      state,
      paymentMethod,
      total: calculateTotal(),
    });
    setCart([]);
    localStorage.removeItem("cart");

    // Redirect to appropriate payment method
    if (paymentMethod === "mpesa") {
      navigate("/mpesa-payment");
    } else if (paymentMethod === "paypal") {
      navigate("/paypal-payment");
    }
  };

  return (
    <>
      <div>CheckOutPage</div>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="FullName">Full Name:</label>
          <input
            type="text"
            id="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <PhoneInput
            id="phone"
            country={"us"}
            value={phone}
            onChange={(value) => setPhone(value)}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Payment Method</label>
          <input
            type="radio"
            id="mpesa"
            name="paymentMethod"
            value="mpesa"
            checked={paymentMethod === "mpesa"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="mpesa">Lipa Na Mpesa</label>
        </div>

        <div>
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
          <label htmlFor="paypal">Pay with PayPal</label>
        </div>

        <div>
          <h3>Order Summary</h3>
          <p>Total: Ksh {calculateTotal().toFixed(2)}</p>
        </div>
        <button type="submit">Place Your Order</button>
      </form>
    </>
  );
};
