import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div>NotFound</div>
      <Link to={"/"}>Go To Home</Link>
    </>
  );
}

export default NotFound;
