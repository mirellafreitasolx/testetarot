import React, { useState } from 'react';

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    imageUrl: string;
    backImageUrl: string;
  };
  index: number;
  total: number;
  isSelected: boolean;
  isTransitioning: boolean;
  onSelect: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  index, 
  total, 
  isSelected,
  isTransitioning,
  onSelect 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const calculatePosition = () => {
    const isMobile = window.innerWidth <= 768;
    
    // Ângulo total do arco (em graus) - reduzido para mobile
    const arcAngle = isMobile ? 40 : 60;
    
    // Converter para radianos
    const angleInRadians = (arcAngle * Math.PI) / 180;
    
    // Calcular o ângulo para esta carta
    const cardAngle = (index / (total - 1) - 0.5) * angleInRadians;
    
    // Raio do arco - ajustado para mobile
    const radius = isMobile ? 280 : 600;
    
    // Ajuste vertical para mobile - subiu mais o leque
    const verticalOffset = isMobile ? -20 : 0;
    
    // Calcular posições X e Y usando funções trigonométricas
    const x = Math.sin(cardAngle) * radius;
    const y = (1 - Math.cos(cardAngle)) * (radius / 3) + verticalOffset;
    
    // Calcular a rotação da carta
    const rotation = (cardAngle * 180) / Math.PI;

    if (isSelected) {
      return {
        transform: `translate(0, 0) rotate(0deg)`,
        transition: 'all 1s ease-in-out',
        zIndex: 1000,
      };
    }

    // Aplicar transformação base e adicionar hover se necessário
    const baseTransform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    const hoverTransform = isHovered && !isTransitioning ? ' translateY(-20px)' : '';
    
    return {
      transform: baseTransform + hoverTransform,
      opacity: isTransitioning ? 0 : 1,
      transition: 'all 0.5s ease-in-out',
      zIndex: isHovered ? 100 : index,
    };
  };

  return (
    <div 
      className="tarot-card-wrapper"
      style={calculatePosition()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <div className="tarot-card">
        <img
          src={card.backImageUrl}
          alt="Verso da carta de Tarot"
          className="card-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default TarotCard;