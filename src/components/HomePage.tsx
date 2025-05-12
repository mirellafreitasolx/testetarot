import React from 'react';
import { useTarot } from '../context/TarotContext';
import { MoonStar } from 'lucide-react';

const HomePage: React.FC = () => {
  const { startConsultation } = useTarot();

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="title">Tarot Místico</h1>
        <p className="subtitle">Descubra os segredos que o universo reserva para você</p>
        
        <div className="icon-wrapper">
          <MoonStar size={48} className="moon-star-icon" />
        </div>
        
        <button 
          className="start-button"
          onClick={startConsultation}
        >
          Iniciar consulta
        </button>
        
        <p className="instruction">
          Prepare sua mente, concentre-se na sua pergunta e embarque nessa jornada espiritual.
        </p>
      </div>
    </div>
  );
};

export default HomePage;