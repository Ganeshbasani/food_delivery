import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import AuthModal from "./components/AuthModal/AuthModal";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CartPage from "./pages/CartPage/CartPage";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";

const App = () => <div className="app"><Navbar/><ToastContainer position="top-right" autoClose={2500}/><Routes><Route path="/" element={<Home/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<PlaceOrder/>}/><Route path="/orders" element={<OrdersPage/>}/><Route path="/payment/:orderId" element={<PaymentStatus/>}/></Routes><AuthModal/><Footer/></div>;
export default App;
