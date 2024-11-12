import React, { useEffect, useState } from "react";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Model from "./Model";
import { setToken, toggleModel } from "../redux/cartReducer";
import { IoMdLogOut } from "react-icons/io";
function Header({ isNotVisible }) {
  const navigate = useNavigate();
  const isModelOpen = useSelector((state) => state.cart.isModelOpen);
  const cartItems = useSelector((state) => state.cart.items);

  const [itemCount, setItemCount] = useState("0");

  useEffect(() => {
    setItemCount("0");
    if (cartItems && cartItems.length > 0) {
      let items = 0;
      cartItems.map((item) => (items += item.quantity));
      setItemCount(items);
    }
  }, [cartItems]);

  const dispatch = useDispatch();

  const handleChangeModel = () => {
    dispatch(toggleModel(!isModelOpen));
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    navigate("/");
  };

  return (
    <div className="header-area">
      {isModelOpen && <Model />}
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-utensils"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
        <Link to={"/"}>Food's Restaurant</Link>
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        className="right-cart"
      >
        {isNotVisible ? (
          <>&nbsp;</>
        ) : (
          <div onClick={handleChangeModel}>
            <FiShoppingCart size={22} color="#ffff" />
            &nbsp;
            <sup style={{ color: "white" }}>{itemCount}</sup>
          </div>
        )}
        {!isNotVisible && (
          <div
            style={{
              padding: "7px 20px",
              borderRadius: "30px",
              background: "red",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleLogOut}
            className="logout"
          >
            <IoMdLogOut size={22} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
