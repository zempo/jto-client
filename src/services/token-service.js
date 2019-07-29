import Config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(Config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(Config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(Config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`);
  }
};

export default TokenService;
