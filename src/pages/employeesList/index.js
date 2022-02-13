import "./ele.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Files
import { validation } from "../../utils";
import { getEmp, addEmp, deleteEmp, updateEmp } from "../../hooks";
import { EmpCard } from "../../components/ui";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [empId, setEmpId] = useState(null);
  const [btn, setBtn] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    first_name: {
      value: "",
      valid: false,
      error: false,
      type: "input",
      placeholder: "Type first name...",
      rules: {
        isRequire: true,
      },
    },
    last_name: {
      value: "",
      valid: false,
      error: false,
      type: "input",
      placeholder: "Type last name...",
      rules: {
        isRequire: true,
      },
    },
    age: {
      value: "",
      valid: false,
      error: false,
      type: "input",
      placeholder: "Type age here...",
      rules: {
        isRequire: true,
      },
    },
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
    address: {
      value: "",
      valid: false,
      error: false,
      type: "input",
      placeholder: "Type address...",
      rules: {
        isRequire: true,
      },
    },
  });

  useEffect(() => {
    getAllEmployees();
  }, [page]);

  const fillUpdatesFields = (value) => {
    let formCopy = { ...form };
    const { first_name, last_name, age, address, ph_number } = value;
    formCopy["first_name"].value = first_name;
    formCopy["last_name"].value = last_name;
    formCopy["age"].value = age;
    formCopy["address"].value = address;
    formCopy["ph_number"].value = ph_number;

    for (let key in formCopy) {
      formCopy[key].valid = true;
    }

    setEmpId(value);
    setForm(formCopy);
  };

  const getAllEmployees = async () => {
    const { state } = location;
    const { token } = state;
    const { data, status } = await getEmp(page, limit, token);

    if (status === 200) {
      if (data.data.length > 0) {
        if (page === 1) {
          setEmployees(data.data);
        }

        if (page > 1) {
          setEmployees((prevState) => [...prevState, ...data.data]);
        }
      } else {
        alert("No record found");
      }
    } else {
      const { message } = data;
      alert(message);
    }
  };

  const onInputChange = (name, value) => {
    let formCopy = { ...form };
    formCopy[name].value = value;

    // Rules
    let rules = formCopy[name].rules;
    let valid = validation(value, rules, formCopy);

    formCopy[name].valid = valid;

    setForm(formCopy);
  };

  const onDeleteEmployee = async (id) => {
    const { state } = location;
    const { token } = state;
    const { data, status } = await deleteEmp(id, token);
    console.log("Res =", status, data);
    if (status === 200) {
      setPage(1);
      const { message } = data;
      alert(message);
    } else {
      const { message } = data;
      alert(message);
    }
  };

  const handleUpdateEmployee = async () => {
    let valid = false;
    let formData = {};
    let formCopy = { ...form };

    for (let key in formCopy) {
      if (formCopy[key].valid) {
        valid = formCopy[key].valid;
        formData[key] = formCopy[key].value;
      } else {
        valid = formCopy[key].valid;
      }
    }

    if (valid) {
      const { state } = location;
      const { token } = state;

      if (btn === 1) {
        handleAddEmployee(formData, token);
      } else {
        const { data, status } = await updateEmp(empId._id, formData, token);
        if (status === 200) {
          setBtn(null);
          setPage(1);
          getAllEmployees();
        } else {
          setBtn(null);
          const { message } = data;
          alert(message);
        }
      }
    } else {
      alert("Make sure all fields fill correctly");
    }
  };

  const handleAddEmployee = async (formData, token) => {
    const { data, status } = await addEmp(formData, token);
    console.log("Res =", status, data);
    if (status === 200) {
      const { message } = data;
      alert(message);
      setBtn(null);
      setPage(1);
      getAllEmployees();
    } else {
      const { message } = data;
      alert(message);
      setBtn(null);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="list-con">
      {/* Add Button */}
      <div className="combine-container">
        <button
          onClick={() => setBtn(1)}
          className={"add-btn"}
          data-bs-toggle="modal"
          data-bs-target="#updateEmp"
        >
          Add
        </button>
        <button onClick={() => navigate("/")} className={"logOut-btn"}>
          Logout
        </button>
      </div>
      {employees.length > 0 &&
        employees.map((item, index) => {
          return (
            <EmpCard
              key={item._id}
              item={item}
              handleUpdate={fillUpdatesFields}
              handleDelete={onDeleteEmployee}
            />
          );
        })}

      {/* Load More */}
      <button onClick={() => handleLoadMore()} className="loat-btn">
        Load more
      </button>

      {/* Update Modal */}
      <div
        class="modal fade"
        id="updateEmp"
        tabindex="-1"
        aria-labelledby="updateEmpLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateEmpLabel">
                Update Employee
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="first-name" class="col-form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="first-name"
                    value={form["first_name"].value}
                    onChange={(val) =>
                      onInputChange("first_name", val.target.value)
                    }
                  />
                </div>
                <div class="mb-3">
                  <label for="last-name" class="col-form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="last-name"
                    value={form["last_name"].value}
                    onChange={(val) =>
                      onInputChange("last_name", val.target.value)
                    }
                  />
                </div>
                <div class="mb-3">
                  <label for="age" class="col-form-label">
                    Age:
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="age"
                    value={form["age"].value}
                    onChange={(val) => onInputChange("age", val.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="phone" class="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    value={form["ph_number"].value}
                    onChange={(val) =>
                      onInputChange("ph_number", val.target.value)
                    }
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    value={form["address"].value}
                    onChange={(val) =>
                      onInputChange("address", val.target.value)
                    }
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handleUpdateEmployee()}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
