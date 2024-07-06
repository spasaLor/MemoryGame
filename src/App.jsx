import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [score,setScore]=useState(0);
  const [best,setBest]=useState(0);

  return(
    <>
      <header>
        <Header score={score} best={best}/>
      </header>
      <main>
        <MainContent score={score} best={best} setScore={setScore} setBest={setBest}/>
      </main>
    </>
  );
}

export default App
