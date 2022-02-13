import "./selector.css";
import React from "react";

const index = ({ select, setSelect }) => {
  return (
    <div className="main-container">
      <button onClick={() => setSelect(0)} className="btn-main btn-login">
        Login
      </button>
      <button onClick={() => setSelect(1)} className="btn-main btn-signUp">
        SignUp
      </button>
    </div>
  );
};

export default index;
