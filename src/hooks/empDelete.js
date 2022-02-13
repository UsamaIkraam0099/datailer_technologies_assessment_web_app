import axios from "axios";

// Files
import { APP_URL } from "../constants";

const empDele = async (id, token) => {
  let response;
  try {
    response = await axios({
      method: "DELETE",
      url: `${APP_URL.employee}/${id}`,
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

export default empDele;
