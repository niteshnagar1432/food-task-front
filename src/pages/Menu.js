/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../css/menu.css";
import Header from "../components/Header";

import burger from "../assets/burger.jpeg";
import fries from "../assets/fries.jpeg";
import coke from "../assets/coke.jpeg";
import pepsi from "../assets/pepsi.jpeg";
import { IoAdd } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import Model from "../components/Model";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/cartReducer";

function Menu() {
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addItem(item));
  };

  const removeItemToCart = (item) => {
    dispatch(removeItem(item));
  };

  const data = [
    { id: 1, title: "Hamburger", img: burger, price: 200 },
    { id: 2, title: "Fries", img: fries, price: 100 },
    { id: 3, title: "Coke", img: coke, price: 50 },
    { id: 4, title: "Pepsi", img: pepsi, price: 50 },
  ];

  return (
    <>
      <Header />
      <div className="menu-area-box">
        {data &&
          data.map((item, index) => (
            <div key={index} className="card-box">
              <img src={item.img} />
              <div className="price">
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>
              </div>
              <div className="buttons">
                <button onClick={() => addItemToCart(item)} className="add btn">
                  <IoAdd size={16} />{" "}
                </button>
                <button
                  onClick={() => removeItemToCart(item)}
                  className="remove btn"
                >
                  <IoIosRemove size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Menu;
