import { ShieldCheck, Github, Heart } from "../../components/icons/Icon";
import "./Footer.css";
const Footer = () => <footer className="footer"><div className="footer-inner"><div><div className="footer-brand"><img src="/brand/biteflow-mark.svg" alt=""/> BiteFlow</div><p>Production-minded food commerce, designed for speed and reliability.</p></div><div className="footer-links"><span><ShieldCheck size={16}/> Secure checkout</span><span><Github size={16}/> Built with MERN</span><span><Heart size={15}/> Crafted with care</span></div></div><div className="footer-bottom">© {new Date().getFullYear()} BiteFlow. Engineering showcase project.</div></footer>;
export default Footer;
