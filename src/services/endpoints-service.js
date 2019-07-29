import Config from "../config";
import axios from "axios";

export const register = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users`,
  headers: {
    "content-type": "application/json"
  }
});

export const login = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/login`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});
// .then((res) => {
//   !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
// });

export const newImages = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/images`
});

export const newCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/cards/`
});
