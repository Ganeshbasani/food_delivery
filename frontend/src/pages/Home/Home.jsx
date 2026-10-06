import { useContext, useEffect, useState } from "react";
import { LoaderCircle, Sparkles } from "../../components/icons/Icon";
import { StoreContext } from "../../context/StoreContext";
import Hero from "../../components/Hero/Hero";
import CategoryStrip from "../../components/CategoryStrip/CategoryStrip";
import FoodCard from "../../components/FoodCard/FoodCard";

const Home = () => {
  const { foodList, loadingFoods, fetchFood } = useContext(StoreContext);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => { fetchFood({ category, search }); }, [category]);
  return <>
    <Hero/>
    <CategoryStrip value={category} onChange={(next)=>setCategory(next)} search={search} onSearch={(value)=>{setSearch(value);fetchFood({category,search:value});}}/>
    <section className="catalog-grid-wrap"><div className="catalog-grid-header"><div><h2>Popular right now</h2><p><Sparkles size={15}/> Curated from the BiteFlow menu</p></div><span>{foodList.length} items</span></div>
      {loadingFoods ? <div className="loading-state"><LoaderCircle className="spin"/> Loading menu…</div> : foodList.length ? <div className="catalog-grid">{foodList.map((food)=><FoodCard key={food._id} food={food}/>)}</div> : <div className="empty-state">No dishes match that search.</div>}
    </section>
  </>;
};
export default Home;
