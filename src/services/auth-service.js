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
        if (!res.ok) {
          res.json().then((e) => Promise.reject(e));
        }
        res.json();
      })
      .then((res) => {
        /*
        whenever a logint is performed:
        1. save the token in local storage
        2. queue auto logout when the user goes idle
        3. queue a call to the refresh endpoint based on the JWT's exp value
      */
        TokenService.saveAuthToken(res.authToken);
        IdleService.regiserIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken();
        });
        return res;
      });
  },
  postRefreshToken() {
    return refresh("/", {
      headers: { Authorization: `Bearer ${TokenService.getAuthToken()}` }
    })
      .then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()))
      .then((res) => {
        /*
        similar logic to whenever a user logs in, the only differences are:
        - we don't need to queue the idle timers again as the user is already logged in.
        - we'll catch the error here as this refresh is happening behind the scenes
      */
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken();
        });
        return res;
      })
      .catch((err) => {
        console.log("refresh token request error");
        console.error(err);
      });
  }
};
