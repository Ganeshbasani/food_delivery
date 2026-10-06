import { useState } from "react";
import { Salad, CakeSlice, Sandwich, Soup, Wheat, Utensils, Search } from "../../components/icons/Icon";
import "./CategoryStrip.css";

const categories = [
  ["All", Utensils], ["Salad", Salad], ["Rolls", Wheat], ["Deserts", CakeSlice], ["Sandwich", Sandwich], ["Cake", CakeSlice], ["Pure Veg", Salad], ["Pasta", Soup], ["Noodles", Soup],
];

const CategoryStrip = ({ value, onChange, search, onSearch }) => {
  const [localSearch, setLocalSearch] = useState(search);
  return (
    <section className="catalog-toolbar" id="menu">
      <div className="section-heading"><p className="section-kicker">CURATED MENU</p><h2>Order what fits your mood.</h2><p>Search by dish or move through categories.</p></div>
      <div className="toolbar-row">
        <div className="category-scroller">{categories.map(([name, Icon]) => <button key={name} className={name === value ? "category-chip active" : "category-chip"} onClick={() => onChange(name)}><Icon size={16}/>{name}</button>)}</div>
        <form className="search-box" onSubmit={(e) => { e.preventDefault(); onSearch(localSearch); }}><Search size={17}/><input value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)} placeholder="Search dishes..."/><button type="submit">Search</button></form>
      </div>
    </section>
  );
};
export default CategoryStrip;
