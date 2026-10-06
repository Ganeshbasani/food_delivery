import { useEffect, useState } from "react";
import { PackageCheck, CircleAlert, Clock3 } from "../../components/icons/Icon";
import { api, authHeaders } from "../../api/client";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const statusCopy = {PLACED:"Placed",CONFIRMED:"Confirmed",PREPARING:"Preparing",OUT_FOR_DELIVERY:"Out for delivery",DELIVERED:"Delivered",CANCELLED:"Cancelled"};
const OrdersPage = () => {
  const { token, setAuthOpen } = useContext(StoreContext);
  const [orders,setOrders]=useState([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{ if(!token){setLoading(false);return;} api.get("/order/user",{headers:authHeaders(token)}).then(r=>setOrders(r.data.data||[])).finally(()=>setLoading(false)); },[token]);
  if(!token) return <main className="page-shell"><div className="empty-panel"><CircleAlert/><h2>Sign in to view orders.</h2><p>Your order history is tied to your secure account.</p><button className="checkout-cta" onClick={()=>setAuthOpen(true)}>Sign in</button></div></main>;
  return <main className="page-shell"><div className="page-heading"><p className="section-kicker">ORDER HISTORY</p><h1>Everything you’ve ordered.</h1><p>Track payment and fulfillment from one place.</p></div>{loading?<div className="loading-state"><Clock3/> Loading orders…</div>:orders.length?<div className="orders-list">{orders.map(order=><article className="order-card" key={order._id}><div className="order-card-head"><div><span className="order-id">#{String(order._id).slice(-8).toUpperCase()}</span><h3>{order.items.map(item=>`${item.name} × ${item.quantity}`).join(", ")}</h3></div><span className={`status-pill ${order.status.toLowerCase()}`}>{statusCopy[order.status]||order.status}</span></div><div className="order-card-meta"><span>{new Date(order.createdAt).toLocaleString()}</span><span>{order.paymentStatus}</span><strong>${Number(order.amount).toFixed(2)}</strong></div><div className="order-progress">{["PLACED","CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED"].map((status,index)=><span className={order.status===status||["PLACED","CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED"].indexOf(order.status)>index?"done":""} key={status}>{statusCopy[status]}</span>)}</div></article>)}</div>:<div className="empty-panel"><PackageCheck/><h2>No orders yet.</h2><p>Your completed checkouts will show up here.</p></div>}</main>;
};
export default OrdersPage;
