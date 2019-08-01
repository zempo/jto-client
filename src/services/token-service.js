import Config from "../config";
import jwtDecode from "jwt-decode";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(Config.TOKEN_KEY, token);
    window.location.reload();
  },
  getAuthToken() {
    return window.localStorage.getItem(Config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(Config.TOKEN_KEY);
    window.location.reload();
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`);
  },
  parseJwt(jwt) {
    if (jwt) {
      return jwtDecode(jwt);
    }
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  getId() {
    if (TokenService.hasAuthToken()) {
      const currentUser = TokenService.readJwtToken().user_id;

      return currentUser;
    }
  },
  _getMsUntilExpiry(payload) {
    /*
      payload is from the JWT
      the `exp` value is in seconds, need to convert to ms, so * 1000
      calculates the difference between now and when the JWT will expire
    */
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    /* get the number of ms from now until the token expires */
    const msUntilExpiry = TokenService._getMsUntilExpiry(TokenService.readJwtToken());
    /*
      queue a callback that will happen 10 seconds before the token expires
      the callback is passed in as an argument so could be anything,
        in this app, the callback is for calling the refresh endpoint
    */
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
