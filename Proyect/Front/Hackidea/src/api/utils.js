import axios from "axios";
export function clearAuth_Token() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
}
export function clearRole() {
  return localStorage.removeItem("role");
}
export function clearId() {
  return localStorage.removeItem("id");
}
export function clearUserName() {
  return localStorage.removeItem("nombres");
}

export function clearidName() {
  return localStorage.removeItem("ididea");
}
export function logOut() {
  clearId();
  clearRole();
  clearUserName();
  clearAuth_Token();
  clearidName();
}