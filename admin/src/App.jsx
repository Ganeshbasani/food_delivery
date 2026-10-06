import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { StoreContext } from "./context/StoreContext";

const Guard = ({ children }) => { const { token, admin } = useContext(StoreContext); return token && admin ? children : <Navigate to="/login" replace/>; };
const App = () => <><Navbar/><ToastContainer position="top-right" autoClose={2500}/><Routes><Route path="/login" element={<Login/>}/><Route path="/*" element={<Guard><div className="app-content"><Sidebar/><main className="admin-main"><Routes><Route path="/" element={<Dashboard/>}/><Route path="/add" element={<Add/>}/><Route path="/list" element={<List/>}/><Route path="/orders" element={<Orders/>}/></Routes></main></div></Guard>}/></Routes></>;
export default (props)=><BrowserRouter><App {...props}/></BrowserRouter>;
