import { useContext, useState } from "react";
import { ArrowRight, LockKeyhole } from "../../components/icons/Icon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, authHeaders } from "../../api/client";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { cartItems, cartTotal, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ firstName:"",lastName:"",email:"",street:"",city:"",state:"",country:"India",zipcode:"",phone:"" });
  const change = (e)=>setData({...data,[e.target.name]:e.target.value});
  const submit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please sign in before checkout.");
    try {
      const response = await api.post("/order/place", { items: cartItems.map(item=>({foodId:item._id,quantity:item.quantity})), address:data }, {headers:authHeaders(token)});
      if (response.data.session_url) window.location.href = response.data.session_url;
      else navigate(`/payment/${response.data.orderId}`);
    } catch(error){ toast.error(error.response?.data?.error?.message || "Unable to start checkout."); }
  };
  return <main className="page-shell"><div className="page-heading"><p className="section-kicker">SECURE CHECKOUT</p><h1>Where should we deliver?</h1><p>Your final price is calculated by the server from current product prices.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><div className="form-grid">{["firstName","lastName","email","phone","street","city","state","country","zipcode"].map(field=><label key={field}>{field.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}<input name={field} type={field==="email"?"email":"text"} value={data[field]} onChange={change} required /></label>)}</div><button className="checkout-cta" type="submit">Pay ${ (cartTotal+2).toFixed(2) } securely <ArrowRight size={17}/></button><p className="checkout-note"><LockKeyhole size={15}/> Payment is processed by Stripe. BiteFlow never receives card details.</p></form><aside className="summary-card sticky-summary"><h2>Order summary</h2>{cartItems.map(item=><div key={item._id}><span>{item.name} × {item.quantity}</span><strong>${(item.price*item.quantity).toFixed(2)}</strong></div>)}<div><span>Delivery</span><strong>$2.00</strong></div><div className="summary-total"><span>Total</span><strong>${(cartTotal+2).toFixed(2)}</strong></div></aside></div></main>;
};
export default PlaceOrder;
