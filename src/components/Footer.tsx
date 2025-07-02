import { FaArrowRight } from 'react-icons/fa';
import './Footer.css';
import image from '../assets/images/021.jpg'

const Footer = () => {
  const galleryImages = [image];

  return (
    <footer className="fixed-footer">
      <div className="footer-content">
        <div className="text-button-group">
          <h2 className="footer-title">GALERIA DE AVENTURAS</h2>
          <button className="gallery-button">
            Ver galería <FaArrowRight />
          </button>
        </div>
        
        <div className="gallery-container">
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item">
              <img src={img} alt={`Aventura ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;