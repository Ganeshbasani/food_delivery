import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, XCircle } from "../../components/icons/Icon";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { api, authHeaders } from "../../api/client";
import { StoreContext } from "../../context/StoreContext";

const PaymentStatus = () => {
  const { orderId } = useParams(); const { token } = useContext(StoreContext); const [data,setData]=useState(null);
  useEffect(()=>{if(token) api.get(`/order/payment/${orderId}`,{headers:authHeaders(token)}).then(r=>setData(r.data.data));},[token,orderId]);
  const paid=data?.paymentStatus==="PAID"; const cancelled=data?.status==="CANCELLED";
  return <main className="page-shell payment-page"><div className="payment-card">{paid?<CheckCircle2 size={58} className="success-icon"/>:cancelled?<XCircle size={58} className="error-icon"/>:<CircleDashed size={58} className="pending-icon"/>}<p className="section-kicker">PAYMENT STATUS</p><h1>{paid?"Payment confirmed.":cancelled?"Checkout cancelled.":"Payment processing."}</h1><p>{paid?"Your order is confirmed and has entered the BiteFlow fulfillment pipeline.":cancelled?"No charge was confirmed for this order.":"We’re waiting for Stripe to confirm the payment. You can safely revisit this page."}</p>{data&&<div className="payment-summary"><span>Order #{String(data.id).slice(-8).toUpperCase()}</span><strong>${Number(data.amount).toFixed(2)}</strong></div>}<div className="payment-actions"><Link to="/orders" className="checkout-cta">View orders</Link><Link to="/" className="secondary-cta">Back to menu</Link></div></div></main>;
};
export default PaymentStatus;
