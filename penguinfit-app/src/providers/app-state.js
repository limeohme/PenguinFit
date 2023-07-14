import { createContext } from 'react';

const AppState = createContext({
  appState: null,
  setState: () => {},
});

export default AppState;
