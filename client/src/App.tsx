import styles from './app.module.scss';
import Board from './components/Board/Board';
import LevelSelection from './components/LevelSelection/LevelSelection';

function App() {
  return (
    <div className={styles.app}>
      <LevelSelection />
      {/* <Board /> */}
    </div>
  );
}

export default App;
