import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AppState from '../providers/app-state';

export default function Authenticated({ children }) {
  const { appState } = useContext(AppState);
  const location = useLocation();

  if (!appState.user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}
