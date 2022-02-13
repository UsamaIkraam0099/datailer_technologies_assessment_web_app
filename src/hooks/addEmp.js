import axios from "axios";

// Files
import { APP_URL } from "../constants";

const addEmp = async (data, token) => {
  let response;
  try {
    response = await axios({
      method: "POST",
      url: `${APP_URL.employee}`,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
  } catch (err) {
    response = err.response;
  }

  return response;
};

export default addEmp;
