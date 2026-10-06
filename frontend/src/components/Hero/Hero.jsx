import { ArrowRight, ShieldCheck, Zap, MapPin } from "../../components/icons/Icon";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => (
  <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow"><Zap size={14}/> FAST, FRESH, BUILT FOR SCALE</div>
      <h1>Food that moves at the <span>speed of your day.</span></h1>
      <p>BiteFlow brings a modern ordering experience, secure checkout, live order visibility, and an operations-ready admin platform together in one system.</p>
      <div className="hero-actions"><Link to="/#menu" className="primary-cta">Explore the menu <ArrowRight size={18}/></Link><span className="trust"><ShieldCheck size={17}/> Secure checkout</span></div>
      <div className="hero-meta"><span><MapPin size={16}/> Multi-zone ready</span><span>•</span><span>Real-time order lifecycle</span></div>
    </div>
    <div className="hero-visual"><div className="hero-glow"/><img src="/header_img.png" alt="Fresh meal selection"/></div>
  </section>
);
export default Hero;
