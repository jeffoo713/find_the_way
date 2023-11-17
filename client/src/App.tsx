import { useState } from 'react';
import './app.scss';
import Board from './components/Board/Board';

function App() {
  const [showWay, setShowWay] = useState<boolean>(true);

  return (
    <div className='app'>
      <h1 onClick={() => setShowWay(prev => !prev)}>FIND THE WAY!</h1>
      <Board showWay={showWay} />
    </div>
  );
}

export default App;
