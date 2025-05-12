import React, { createContext, useState, useContext, useCallback } from 'react';
import { shuffleArray } from '../utils/shuffle';
import { tarotCards } from '../data/tarotData';
import { TarotCard } from '../types/tarot';

interface TarotContextType {
  cards: TarotCard[];
  isSelectionActive: boolean;
  selectedCard: TarotCard | null;
  startConsultation: () => void;
  selectCard: (card: TarotCard) => void;
  resetConsultation: () => void;
}

const TarotContext = createContext<TarotContextType | null>(null);

export const useTarot = () => {
  const context = useContext(TarotContext);
  if (context === null) {
    throw new Error('useTarot deve ser usado dentro de um TarotProvider');
  }
  return context;
};

export const TarotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isSelectionActive, setIsSelectionActive] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const startConsultation = useCallback(() => {
    const shuffledCards = shuffleArray([...tarotCards]);
    setCards(shuffledCards);
    setIsSelectionActive(true);
    setSelectedCard(null);
  }, []);

  const selectCard = useCallback((card: TarotCard) => {
    if (isSelectionActive && !selectedCard) {
      setSelectedCard(card);
    }
  }, [isSelectionActive, selectedCard]);

  const resetConsultation = useCallback(() => {
    setIsSelectionActive(false);
    setSelectedCard(null);
  }, []);

  return (
    <TarotContext.Provider 
      value={{ 
        cards, 
        isSelectionActive, 
        selectedCard, 
        startConsultation, 
        selectCard, 
        resetConsultation 
      }}
    >
      {children}
    </TarotContext.Provider>
  );
};