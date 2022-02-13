import "./input.css";
import React from "react";

const index = ({ name, form, onChange, minLength }) => {
  return (
    <div className="main-container">
      <input
        minLength={minLength}
        type="text"
        className="input"
        placeholder="Type phone number here..."
        onChange={(input) => onChange(name, input.target.value)}
      />
    </div>
  );
};

export default index;
