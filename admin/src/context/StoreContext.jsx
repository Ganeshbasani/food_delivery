import { createContext, useMemo, useState } from "react";
import { api, authHeaders } from "../api/client";
export const StoreContext = createContext(null);
const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("biteflow_admin_token") || "");
  const [admin, setAdmin] = useState(() => localStorage.getItem("biteflow_admin") === "true");
  const login = (nextToken) => { localStorage.setItem("biteflow_admin_token", nextToken); localStorage.setItem("biteflow_admin", "true"); setToken(nextToken); setAdmin(true); };
  const logout = () => { localStorage.removeItem("biteflow_admin_token"); localStorage.removeItem("biteflow_admin"); setToken(""); setAdmin(false); };
  const headers = useMemo(() => authHeaders(token), [token]);
  const value = { token, admin, headers, api, login, logout, setToken, setAdmin };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
export default StoreContextProvider;
