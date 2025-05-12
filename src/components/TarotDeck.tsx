import React, { useState } from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCard from './TarotCard';

const TarotDeck: React.FC = () => {
  const { cards, selectCard } = useTarot();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCardSelect = (card: any, index: number) => {
    if (isTransitioning) return;
    
    setSelectedIndex(index);
    setIsTransitioning(true);

    // Aguarda a animação de centralização antes de revelar a carta
    setTimeout(() => {
      selectCard(card);
    }, 1000);
  };

  return (
    <div className="tarot-deck-container">
      <h2 className="deck-title">Escolha uma carta</h2>
      <div className="tarot-deck">
        {cards.map((card, index) => (
          <TarotCard 
            key={card.id} 
            card={card} 
            index={index}
            isSelected={selectedIndex === index}
            isTransitioning={isTransitioning}
            total={cards.length}
            onSelect={() => handleCardSelect(card, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotDeck;