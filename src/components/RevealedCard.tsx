import React, { useState, useEffect } from 'react';
import { useTarot } from '../context/TarotContext';

const RevealedCard: React.FC = () => {
  const { selectedCard, resetConsultation, startConsultation } = useTarot();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      // Inicia a animação de flip após um pequeno delay
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
      }, 500);

      // Marca como totalmente revelada após a animação de flip
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
    
    // Pequeno delay antes de resetar e iniciar nova consulta
    setTimeout(() => {
      resetConsultation();
      startConsultation();
    }, 500);
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
          <p className="instruction-text">Volte para a conversa e informe o nome da carta escolhida</p>
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

export default RevealedCard