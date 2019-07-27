import Config from "../config";
import axios from "axios";

export const login = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/login`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});

export const newImages = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/images`
});

export const newCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/cards/`
});