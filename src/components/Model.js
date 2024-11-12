import React, { useEffect, useState } from "react";
import { IoIosRemove } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import "../css/model.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  setError,
  toggleModel,
} from "../redux/cartReducer";
import axios from "axios";
function Model() {
  const navigate = useNavigate();
  const isModelOpen = useSelector((state) => state.cart.isModelOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.cart.token);
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState("0");

  useEffect(() => {
    setItemCount("0");
    if (cartItems && cartItems.length > 0) {
      let items = 0;
      cartItems.map((item) => (items += item.quantity));
      setItemCount(items);
    }
  }, [cartItems]);

  const handleChangeModel = () => {
    dispatch(toggleModel(!isModelOpen));
  };

  const calculatePrice = (items) => {
    let price = 0;
    items.map((item) => (price += item.price * item.quantity));
    return price;
  };

  const [btnLoading, setBtnLoading] = useState(false);

  const navigateToCheckoutPage = async () => {
    try {
      setBtnLoading(true);
      let priceAll = calculatePrice(cartItems);
      let res = await axios.post(
        "http://127.0.0.1:4001/api/create-order",
        {
          items: cartItems,
          totalPrice: priceAll,
          itemCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let { status, message } = res.data || res;
      if (status) {
        dispatch(toggleModel(!isModelOpen));
        navigate("/checkout");
      } else {
        dispatch(setError(message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setBtnLoading(false);
    }
  };

  const addItemToCart = (item) => {
    dispatch(addItem(item));
  };

  const removeItemToCart = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="cart-model">
      <div className="overlay">
        <div className="model">
          <div className="title">
            {cartItems && cartItems.length > 0
              ? "Order Summary"
              : "Cart Is Empty."}
          </div>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item, index) => (
              <div key={index} className="list-item">
                <div className="item-title">{item.title}</div>
                <div className="item-qnt">{item.quantity}</div>
                <div className="buttons">
                  <button
                    onClick={() => addItemToCart(item)}
                    className="add btn"
                  >
                    <IoAdd color="#ffff" size={16} />{" "}
                  </button>
                  <button
                    onClick={() => removeItemToCart(item)}
                    className="remove btn"
                  >
                    <IoIosRemove color="#ffff" size={16} />
                  </button>
                </div>
              </div>
            ))}
          {cartItems && cartItems.length > 0 && (
            <>
              <div className="title">Total Price</div>
              <div className="price">
                ₹
                {cartItems && cartItems.length > 0 && calculatePrice(cartItems)}
              </div>
              <div className="buttons">
                <button
                  disabled={btnLoading}
                  onClick={navigateToCheckoutPage}
                  style={{ fontSize: "16px" }}
                  className="add btn"
                >
                  {btnLoading ? "Loading..." : "Save and Checkout"}
                </button>
                <button
                  disabled={btnLoading}
                  onClick={handleChangeModel}
                  style={{ fontSize: "16px" }}
                  className="remove btn"
                >
                  cancel
                </button>
              </div>
            </>
          )}
          {cartItems && cartItems.length === 0 && (
            <>
              <div className="buttons">
                <button
                  onClick={handleChangeModel}
                  style={{ fontSize: "16px" }}
                  className="remove btn"
                >
                  cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Model;
