import { Plus, Minus, Star } from "../../components/icons/Icon";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodCard.css";

const FoodCard = ({ food }) => {
  const { cart, addToCart, removeFromCart } = useContext(StoreContext);
  const quantity = Number(cart[food._id] || 0);
  return (
    <article className="food-card">
      <div className="food-image-wrap"><img src={food.image} alt={food.name} loading="lazy"/><span className="rating"><Star size={13} fill="currentColor"/> 4.8</span></div>
      <div className="food-card-body"><div className="food-card-top"><h3>{food.name}</h3><strong>${food.price.toFixed(2)}</strong></div><p>{food.description}</p><div className="food-card-footer"><span className="category-label">{food.category}</span>{quantity === 0 ? <button className="add-control" onClick={()=>addToCart(food._id)}><Plus size={17}/> Add</button> : <div className="quantity-control"><button onClick={()=>removeFromCart(food._id)} aria-label="Remove item"><Minus size={16}/></button><b>{quantity}</b><button onClick={()=>addToCart(food._id)} aria-label="Add item"><Plus size={16}/></button></div>}</div></div>
    </article>
  );
};
export default FoodCard;
