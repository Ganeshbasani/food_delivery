import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, Trash2 } from "../../components/icons/Icon";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const CartPage = () => {
  const { cartItems, cartTotal, addToCart, removeFromCart } = useContext(StoreContext);
  const delivery = cartItems.length ? 2 : 0;
  const total = cartTotal + delivery;
  return <main className="page-shell"><div className="page-heading"><p className="section-kicker">YOUR CART</p><h1>Ready when you are.</h1><p>Review your basket before secure checkout.</p></div>
    {!cartItems.length ? <div className="empty-panel"><ShoppingBasketIcon/><h2>Your cart is empty.</h2><p>Add a few dishes and they’ll appear here.</p><Link to="/#menu" className="primary-cta dark">Explore menu <ArrowRight size={17}/></Link></div> : <div className="cart-layout"><section className="cart-list">{cartItems.map(item=><div className="cart-row" key={item._id}><img src={item.image} alt=""/><div className="cart-info"><h3>{item.name}</h3><span>{item.category}</span></div><div className="quantity-control"><button onClick={()=>removeFromCart(item._id)}><Minus size={15}/></button><b>{item.quantity}</b><button onClick={()=>addToCart(item._id)}><Plus size={15}/></button></div><strong>${(item.price*item.quantity).toFixed(2)}</strong><button className="remove-all" title="Remove one" onClick={()=>removeFromCart(item._id)}><Trash2 size={16}/></button></div>)}</section>
      <aside className="summary-card"><h2>Order summary</h2><div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div><div><span>Delivery</span><strong>${delivery.toFixed(2)}</strong></div><div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><Link to="/checkout" className="checkout-cta">Continue to checkout <ArrowRight size={17}/></Link></aside></div>}
  </main>;
};
const ShoppingBasketIcon=()=> <div className="empty-icon">🛒</div>;
export default CartPage;
