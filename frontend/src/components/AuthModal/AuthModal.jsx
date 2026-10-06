import { useContext, useState } from "react";
import { X, LockKeyhole } from "../../components/icons/Icon";
import { toast } from "react-toastify";
import { api } from "../../api/client";
import { StoreContext } from "../../context/StoreContext";
import "./AuthModal.css";

const AuthModal = () => {
  const { authOpen, setAuthOpen, setSession } = useContext(StoreContext);
  const [mode, setMode] = useState("login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  if (!authOpen) return null;
  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(mode === "login" ? "/user/login" : "/user/register", data);
      setSession(response.data.token, response.data.user);
      toast.success(mode === "login" ? "Welcome back." : "Account created successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Unable to complete authentication.");
    }
  };
  return <div className="modal-backdrop" onMouseDown={()=>setAuthOpen(false)}><div className="auth-modal" onMouseDown={(e)=>e.stopPropagation()}>
    <button className="modal-close" onClick={()=>setAuthOpen(false)}><X size={18}/></button>
    <div className="auth-icon"><LockKeyhole size={20}/></div><p className="section-kicker">BITEFLOW ACCOUNT</p><h2>{mode === "login" ? "Welcome back." : "Create your account."}</h2><p className="auth-subtitle">Secure access to your cart, orders and checkout history.</p>
    <form onSubmit={submit}>{mode === "register" && <input value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} placeholder="Full name" required/>}<input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="email" placeholder="Email address" required/><input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="password" placeholder="Password" minLength={8} required/><button className="auth-submit">{mode === "login" ? "Sign in" : "Create account"}</button></form>
    <button className="mode-switch" onClick={()=>setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "New to BiteFlow? Create an account" : "Already have an account? Sign in"}</button>
  </div></div>;
};
export default AuthModal;
