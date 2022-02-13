import React from "react";

const index = ({ label, handleSubmit }) => {
  return (
    <div className="main-container">
      <button onClick={() => handleSubmit()} className="btn-main-lg">
        {label}
      </button>
    </div>
  );
};

export default index;
