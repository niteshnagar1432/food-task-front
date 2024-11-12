import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/cartReducer";
function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let price = calculatePrice(cartItems);
      setTotalPrice(price);
      dispatch(emptyCart());
    }
  }, [cartItems]);

  const calculatePrice = (items) => {
    let price = 0;
    items.map((item) => (price += item.price * item.quantity));
    return price;
  };

  return (
    <>
      <Header />
      <div className="checkout-area-box">
        <div className="info">
          {totalPrice && (
            <>
              <center>
                <h3>Checkout</h3>
              </center>
              <p>
                Thank You for order.
                <br />
                Your order of Rs.{totalPrice} is successfully received
              </p>
            </>
          )}
          {!totalPrice && cartItems && cartItems.length === 0 && (
            <center>
              <h3>Cart Is Empty.</h3>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
