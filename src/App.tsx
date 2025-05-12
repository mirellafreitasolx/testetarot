import React from 'react';
import { TarotProvider } from './context/TarotContext';
import Layout from './components/Layout';
import './styles/global.css';

function App() {
  return (
    <TarotProvider>
      <Layout />
    </TarotProvider>
  );
}

export default App;