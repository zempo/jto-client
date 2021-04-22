import Config from "../config";
import axios from "axios";
import TokenService from "./token-service";

// AUTHENTICATION
export const register = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users`,
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
});

export const login = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/login`,
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
});

export const refresh = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/refresh`,
  method: "POST",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

// CREATE CONTENT (C)
export const newImages = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/images`,
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const newCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/cards/${TokenService.getId()}`,
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const newComment = axios.create({
  baseURL: `${Config.API_ENDPOINT}/comments`,
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

// READ CONTENT (R)
export const readUser = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users/${TokenService.getId()}`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const readComment = axios.create({
  baseURL: `${Config.API_ENDPOINT}/comments`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const readPublicUser = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users/public`,
  method: "GET",
});

export const listUserCards = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/cards/${TokenService.getId()}`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const listCards = axios.create({
  baseURL: `${Config.API_ENDPOINT}/gallery`,
  method: "GET",
});

export const listCardComments = axios.create({
  baseURL: `${Config.API_ENDPOINT}/gallery/comments`,
});

export const listActions = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions`,
  method: "GET",
});

export const listCardActions = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions/likes`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const listLikes = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions/likes`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const listSaves = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions/saves`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

// UPDATE CONTENT (U)
export const updateCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/gallery`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const updateComment = axios.create({
  baseURL: `${Config.API_ENDPOINT}/comments`,
  method: "PATCH",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const updateUserCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/cards/${TokenService.getId()}`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const makePublic = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/publish/${TokenService.getId()}`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const makeDashboard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/gallery/unpublish`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const toggleSave = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions/saves`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const toggleLike = axios.create({
  baseURL: `${Config.API_ENDPOINT}/actions/likes`,
  method: "PATCH",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

// DELETE CONTENT (D)
export const deleteCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/gallery`,
  method: "DELETE",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const deleteUserCard = axios.create({
  baseURL: `${Config.API_ENDPOINT}/dashboard/cards/${TokenService.getId()}`,
  method: "DELETE",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});

export const deleteComment = axios.create({
  baseURL: `${Config.API_ENDPOINT}/comments`,
  method: "DELETE",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
});
