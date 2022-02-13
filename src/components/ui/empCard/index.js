import "./emp.css";
import React from "react";

const index = ({ item, handleDelete, handleUpdate }) => {
  const { _id, first_name, last_name, address, age, ph_number } = item;

  const Label = ({ label }) => {
    return (
      <div className="item">
        <p>{label}</p>
      </div>
    );
  };

  return (
    <div className="main">
      <Label label={age} />
      <Label label={`${first_name} ${last_name}`} />
      <Label label={ph_number} />
      <Label label={address} />
      <button
        onClick={() => handleUpdate(item)}
        className="update-btn"
        data-bs-toggle="modal"
        data-bs-target="#updateEmp"
      >
        update
      </button>
      <button onClick={() => handleDelete(_id)} className="delete-btn">
        delete
      </button>
    </div>
  );
};

export default index;
