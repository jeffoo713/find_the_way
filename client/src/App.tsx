import { useContext } from 'react';
import styles from './app.module.scss';
import Board from './components/Board/Board';
import LevelSelection from './components/LevelSelection/LevelSelection';
import { GlobalContext } from './context/globalContext/globalContext';

function App() {
  const {
    state: {
      gameConfig: { gameLevel },
    },
  } = useContext(GlobalContext);

  return <div className={styles.app}>{!gameLevel ? <LevelSelection /> : <Board />}</div>;
}

export default App;
