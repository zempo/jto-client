import Config from "../config";
import axios from "axios";
import { login } from "./endpoints-service";

export const AuthService = {
  postLogin(creds) {
    return login.post("/", JSON.stringify(creds)).then((res) => {
      if (!res.ok) {
        res.json().then((e) => Promise.reject(e));
      }
      res.json();
    });
  }
};
