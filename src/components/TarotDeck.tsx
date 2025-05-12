import React from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCard from './TarotCard';

const TarotDeck: React.FC = () => {
  const { cards, selectCard } = useTarot();

  return (
    <div className="tarot-deck-container">
      <h2 className="deck-title">Escolha uma carta</h2>
      <div className="tarot-deck">
        {cards.map((card, index) => (
          <TarotCard 
            key={card.id} 
            card={card} 
            index={index} 
            total={cards.length}
            onSelect={() => selectCard(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotDeck;