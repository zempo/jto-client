import Config from "../config";
import axios from "axios";

export const login = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/login`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});

export const newCardImage = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/images`
});
