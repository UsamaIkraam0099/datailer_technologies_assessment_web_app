import axios from "axios";

// Files
import { APP_URL } from "../constants";

const empUpdate = async (id, data, token) => {
  let response;
  try {
    response = await axios({
      method: "PUT",
      url: `${APP_URL.employee}/${id}`,
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

export default empUpdate;
