import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Files
import { Login, EmployeesList } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/employee" element={<EmployeesList />} />
      </Routes>
    </Router>
  );
};

export default App;
