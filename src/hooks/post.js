import axios from "axios";

// Files
import { APP_URL } from "../constants";

const post = async (flag, data) => {
  let response;
  const url = flag === 0 ? APP_URL.login : APP_URL.signUp;
  try {
    response = await axios({
      method: "POST",
      url: url,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      data: data,
    });
  } catch (err) {
    response = err.response;
  }

  return response;
};

export default post;
