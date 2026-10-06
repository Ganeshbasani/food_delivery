import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { ShoppingBag, LogIn, LogOut, UserRound } from "../../components/icons/Icon";
import "./Navbar.css";

const Navbar = () => {
  const { user, token, cartItems, setAuthOpen, signOut } = useContext(StoreContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar-shell">
      <div className="navbar">
        <Link className="brand" to="/">
          <img src="/brand/biteflow-mark.svg" alt="" />
          <span>BiteFlow</span>
        </Link>
        <nav className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Discover</Link>
          <Link className={location.pathname === "/orders" ? "active" : ""} to="/orders">Orders</Link>
        </nav>
        <div className="nav-actions">
          <Link className="cart-link" to="/cart" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>
          {token ? (
            <div className="profile-menu">
              <button className="profile-button" onClick={() => setOpen((v) => !v)} aria-label="Account">
                <UserRound size={18} />
                <span>{user?.name?.split(" ")[0] || "Account"}</span>
              </button>
              {open && (
                <div className="profile-popover">
                  <strong>{user?.name}</strong>
                  <small>{user?.email}</small>
                  <button onClick={signOut}><LogOut size={16} /> Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-button" onClick={() => setAuthOpen(true)}><LogIn size={17} /> Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
