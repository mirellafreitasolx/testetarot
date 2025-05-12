import React from 'react';
import { useTarot } from '../context/TarotContext';
import HomePage from './HomePage';
import TarotDeck from './TarotDeck';
import RevealedCard from './RevealedCard';
import StarryBackground from './StarryBackground';

const Layout: React.FC = () => {
  const { isSelectionActive, selectedCard } = useTarot();

  return (
    <div className="layout">
      <StarryBackground />
      <div className="content">
        {!isSelectionActive && !selectedCard && <HomePage />}
        {isSelectionActive && !selectedCard && <TarotDeck />}
        {selectedCard && <RevealedCard />}
      </div>
    </div>
  );
};

export default Layout;