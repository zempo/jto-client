import Config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";
import { login, register, refresh } from "./endpoints-service";

export const AuthService = {
  postUser(user) {
    return register.post("/", user);
  },
  postLogin(creds) {
    return login
      .post("/", JSON.stringify(creds))
      .then((res) => {
        if (res.status !== 200) {
          return res.data.then((e) => Promise.reject(e));
        }
        return res.data;
      })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        IdleService.regiserIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken();
        });
        return res;
      });
  },
  postRefreshToken() {
    return refresh
      .post("/")
      .then((res) => {
        if (!res.ok) {
          res.data.then((e) => Promise.reject(e));
        }
        console.log(res.data)
        return res.data;
      })
      .then((res) => {
        console.log(res)
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken();
        });
        return res;
      })
      .catch((err) => {
        console.log('refresh token error', err);
        console.error(err);
      });
  }
};
