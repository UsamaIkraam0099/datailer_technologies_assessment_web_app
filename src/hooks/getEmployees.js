import axios from "axios";

// Files
import { APP_URL } from "../constants";

const getEmp = async (page, limit, token) => {
  let response;
  try {
    response = await axios({
      method: "POST",
      url: `${APP_URL.employee}/${page}/${limit}`,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    response = err.response;
  }

  return response;
};

export default getEmp;
