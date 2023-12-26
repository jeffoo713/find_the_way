import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalProvider from './context/globalContext/globalContextProvider';

const container = document.getElementById('app')!;
const root = createRoot(container);

root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
