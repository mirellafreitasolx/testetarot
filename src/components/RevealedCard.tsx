import React, { useState, useEffect } from 'react';
import { useTarot } from '../context/TarotContext';

const RevealedCard: React.FC = () => {
  const { selectedCard, resetConsultation, startConsultation } = useTarot();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
      }, 500);

      const revealTimer = setTimeout(() => {
        setIsFullyRevealed(true);
      }, 1500);

      return () => {
        clearTimeout(flipTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [selectedCard]);

  const handleNewReading = () => {
    setIsFlipped(false);
    setIsFullyRevealed(false);
    
    setTimeout(() => {
      resetConsultation();
      startConsultation();
    }, 500);
  };

  const getWhatsAppLink = (cardName: string) => {
    const encodedName = encodeURIComponent(cardName);
    return `https://wa.me/5511914693564?text=Carta%20escolhida%3A%20${encodedName}`;
  };

  if (!selectedCard) return null;

  return (
    <div className="revealed-card-container">
      <div className={`revealed-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-inner">
          <div className="card-front">
            <img
              src={selectedCard.backImageUrl}
              alt="Verso da carta de Tarot"
              className="card-image"
            />
          </div>
          <div className="card-back">
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.name}
              className="card-image"
            />
          </div>
        </div>
      </div>
      
      {isFullyRevealed && (
        <div className="card-info">
          <h2 className="card-name">{selectedCard.name}</h2>
          <a 
            href={getWhatsAppLink(selectedCard.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            {window.innerWidth <= 768 ? "Clique aqui para\nvoltar para a conversa" : "Clique aqui para voltar para a conversa"}
          </a>
          <button 
            className="new-reading-button"
            onClick={handleNewReading}
          >
            Realizar outra consulta
          </button>
        </div>
      )}
    </div>
  );
};

export default RevealedCard;