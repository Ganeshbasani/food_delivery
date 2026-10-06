import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => <aside className="sidebar"><div className="sidebar-title">CONTROL PLANE</div><NavLink to="/" className="sidebar-option">Overview</NavLink><NavLink to="/add" className="sidebar-option">Create product</NavLink><NavLink to="/list" className="sidebar-option">Catalog</NavLink><NavLink to="/orders" className="sidebar-option">Orders</NavLink></aside>;
export default Sidebar;
