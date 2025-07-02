import './Carousel.css';
import image from '../assets/images/021.jpg'
import wheel from '../assets/images/Llanta.png'
import { useEffect, useRef, useState } from 'react';

const images = [
  { id: 1, src: image, label: 'Prioridad: Seguridad' },
  { id: 2, src: image, label: 'Experiencia Exclusiva' },
  { id: 3, src: image, label: 'Grupos Reducidos' },
  { id: 4, src: image, label: 'Bosque Privado' },
  { id: 5, src: image, label: 'Piscina Termal' },
];

const degreesPerItem = 360 / images.length;

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragAngle, setDragAngle] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(200); // valor inicial
  const containerRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setRadius(width * 0.40);
      }
    };

    updateRadius(); // al montar
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || startX.current === null) return;

    const deltaX = e.clientX - startX.current;
    const angleOffset = deltaX * 0.4; // Sensibilidad ajustable
    setDragAngle(angleOffset);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = 'auto';

    const threshold = 30;

    if (dragAngle > threshold) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      setRotation((prev) => prev - degreesPerItem);
    } else if (dragAngle < -threshold) {
      setActiveIndex((prev) => (prev + 1) % images.length);
      setRotation((prev) => prev + degreesPerItem);
    }

    setDragAngle(0);
    startX.current = null;
  };

  const currentRotation = rotation - dragAngle;

  return (
    <div
      className="carousel-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={wheel}
        className="wheel"
        style={{ transform: `rotate(${-currentRotation}deg)` }}
        alt="Rueda"
      />

      {images.map((item, index) => {
        const baseAngle = index * degreesPerItem;
        const angle = baseAngle - currentRotation;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.sin(rad);
        const y = -radius * Math.cos(rad);
        const isActive = index === activeIndex;

        return (
          <div
            key={item.id}
            className={`carousel-item ${isActive ? 'active' : ''}`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              zIndex: isActive ? 10 : 1,
            }}
          >
            <img src={item.src} alt={item.label} draggable={false} />
            <p>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}