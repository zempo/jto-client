import Config from "../config";
import axios from "axios";
import TokenService from "./token-service";

// AUTHENTICATION
export const register = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users`,
  method: "POST",
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

export const refresh = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/refresh`,
  method: "POST",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

// CREATE CONTENT (C)
export const newImages = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/images`
});

export const newCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/cards`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});

// READ CONTENT (R)
export const readUser = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users/${TokenService.getId()}`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

export const readPublicUser = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users/public`,
  method: "GET"
});

export const listUserCards = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/cards/${TokenService.getId()}`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

export const listCards = axios.create({
  baseURL: `${Config.API_ENDPOINT}/cards`,
  method: "GET"
});

export const listCardComments = axios.create({
  baseURL: `${Config.API_ENDPOINT}/cards/comments`
});

export const listReactions = axios.create({
  baseURL: `${Config.API_ENDPOINT}/reactions`,
  method: "GET"
});

export const listHearts = axios.create({
  baseURL: `${Config.API_ENDPOINT}/reactions/hearts`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

export const listShares = axios.create({
  baseURL: `${Config.API_ENDPOINT}/reactions/shares`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

// UPDATE CONTENT (U)
export const makePublic = axios.create({
  baseURL: `${Config.API_ENDPOINT}/private/make-public`,
  method: "PATCH"
});

export const makePrivate = axios.create({
  baseURL: `${Config.API_ENDPOINT}/cards/make-private`,
  method: "PATCH"
});

// DELETE CONTENT (D)
