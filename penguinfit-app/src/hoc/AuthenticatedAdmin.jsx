// import { useContext } from 'react';
// import { useLocation, Navigate } from 'react-router-dom';
// import { userRole } from '../common/user-role';
// import AppState from '../providers/app-state';

// export default function AuthenticatedAdmin({ children }) {
//   const { appState } = useContext(AppState);
//   const location = useLocation();

//   if (!appState.user) {
//     return <Navigate to="/login" state={{ from: location.pathname }} />;
//   }

//   if (appState.user && appState.user.role !== userRole.ADMIN) {
//     return <Navigate to="/home" />;
//   }

//   return children;
// }
