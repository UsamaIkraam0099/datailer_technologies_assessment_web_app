import "./index.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Files
import { Selector, Input, Button } from "../../components/ui";
import { validation } from "../../utils";
import { post } from "../../hooks";

const Index = () => {
  let navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [form, setForm] = useState({
    ph_number: {
      value: "",
      valid: false,
      error: false,
      type: "input",
      placeholder: "Type phone number...",
      rules: {
        minLength: 12,
      },
    },
  });

  const onInputChange = (name, value) => {
    let formCopy = { ...form };
    formCopy[name].value = value;

    // Rules
    let rules = formCopy[name].rules;
    let valid = validation(value, rules, formCopy);

    formCopy[name].valid = valid;
    setForm(formCopy);
  };

  const handleSubmit = async () => {
    let valid = false;
    let formData = {};
    for (let key in form) {
      if (form[key].valid) {
        valid = true;
        formData[key] = form[key].value;
      } else {
        alert("Enter 12 digit phone number");
      }
    }

    if (valid) {
      const { data, status } = await post(select, formData);

      if (status === 201) {
        navigate("/employee", { state: data });
      } else {
        const { message } = data;
        alert(message);
      }
    }
  };

  return (
    <section className="section">
      <div className="card">
        <Selector select={select} setSelect={setSelect} />
        <h3 className="wel-lbl">Welcome!</h3>
        <p className="msg-lbl">Login your account and Manage your employees</p>
        <Input
          form={form}
          name="ph_number"
          minLength={12}
          onChange={onInputChange}
        />
        <Button label={"Login"} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Index;
