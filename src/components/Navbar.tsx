import './Navbar.css';
import { FaWhatsapp, FaTiktok, FaInstagram, FaArrowRight } from 'react-icons/fa';


const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="brand-container">
        <span className="brand-name">SUPER QUADS</span>
      </div>

      <div className="nav-menu">
        <a href="#tour" className="nav-link">Tour</a>
        <a href="#galeria" className="nav-link">Galeria de aventuras</a>
        <a href="#acerca" className="nav-link">Acerca de</a>
      </div>

      <div className="nav-social">
        <a href="#" className="social-icon"><FaWhatsapp /></a>
        <a href="#" className="social-icon"><FaTiktok /></a>
        <a href="#" className="social-icon"><FaInstagram /></a>
        <button className="reserve-button">
          RESERVAR <FaArrowRight />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;