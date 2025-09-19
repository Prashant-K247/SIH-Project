import axios from "axios";
import {store} from "../store/store";
import { setUser, logoutUser } from "../store/authSlice"


class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true, // for cookies
    });
    this.tokenKey = "token";
    
  }

  // -------------------- REGISTER --------------------
  async register({ name, email, password, role }) {
    try {
      const { data } = await this.api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      await this.login({email, password});
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  }

  // -------------------- LOGIN --------------------
  async login({ email, password }) {
    try {
      const { data } = await this.api.post("/auth/login", { email, password });

      this.setToken(data.token);
      store.dispatch(setUser(data.user))
      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }

  // -------------------- LOGOUT --------------------
  logout() {
    this.clearToken();
    store.dispatch(logoutUser());
    window.location.href = "/login"; // redirect to login
  }

  // -------------------- TOKEN HELPERS --------------------
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
    // Optional: decode token and auto logout when expired
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // JWT exp is in seconds

    const timeout = exp - Date.now();
    if (timeout > 0) {
      if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
      this.logoutTimeout = setTimeout(() => this.logout(), timeout);
    } else {
      this.logout();
    }
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  // -------------------- API INTERCEPTOR --------------------
  attachTokenInterceptor(apiInstance) {
    apiInstance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    apiInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) this.logout();
        return Promise.reject(err);
      }
    );
  }
}

export default new AuthService();
