import styles from './app.module.scss';
import Board from './components/Board/Board';
import LevelSelection from './components/LevelSelection/LevelSelection';
import GlobalProvider from './stateManagement/globalContextProvider';

function App() {
  return (
    <GlobalProvider>
      <div className={styles.app}>
        <LevelSelection />
        {/* <Board /> */}
      </div>
    </GlobalProvider>
  );
}

export default App;
