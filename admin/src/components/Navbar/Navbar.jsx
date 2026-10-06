import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
const Navbar = () => {
  const { token, admin, logout } = useContext(StoreContext); const navigate=useNavigate();
  return <header className="navbar"><div className="admin-brand" onClick={()=>navigate("/")}><img src="/brand/biteflow-mark.svg" alt=""/><div><strong>BiteFlow</strong><small>Operations Console</small></div></div>{token&&admin?<button className="logout-button" onClick={()=>{logout();navigate("/");}}>Sign out</button>:<span className="console-status">Secure admin access</span>}</header>;
};
export default Navbar;
