// import './Navbar.css';
// import { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import AppState from '../../providers/app-state';
// // import { APP_TITLE } from '../../common/constants';
// import { publicPages, userPages } from '../../common/pages';
// import { renderPublicLinks, renderUserLinks } from '../../utils/utils';
// import { removeUserFromStorage } from '../../services/local-storage-service';
// import { userRole } from '../../common/user-role';

// function Navbar() {
//   const { appState, setState } = useContext(AppState);
//   const loginLink = (
//     <NavLink to="/login">
//       <div className="nav-element">
//         <p className="text-link" id="login">
//           Login
//         </p>
//       </div>
//     </NavLink>
//   );

//   const toNavLink = (path, link, id) => {
//     if (path === 'logout')
//       return (
//         <NavLink
//           to="/"
//           onClick={() => {
//             setState({ ...appState, user: null, userData: null });
//             removeUserFromStorage();
//           }}
//           key={id}
//         >
//           <div className="nav-element">
//             <p className="text-link" id={path}>
//               {link}
//             </p>
//           </div>
//         </NavLink>
//       );

//     return (
//       <NavLink to={`/${path}`} key={id}>
//         <div className="nav-element">
//           <p className="text-link" id={path}>
//             {link}
//           </p>
//         </div>
//       </NavLink>
//     );
//   };

//   return (
//     <nav>
//       <div className="app-title">
//         <p className="text-link">
//           The<span id="x">•</span>Spot
//         </p>
//         {/* <p className="text-link">{APP_TITLE}</p> */}
//       </div>
//       {renderPublicLinks(publicPages, toNavLink)}
//       {/* TODO insert Users nav link */}
//       {appState.user !== null && appState.user.role === userRole.ADMIN ? (
//         <NavLink to="/users">
//           <div className="nav-element">
//             <p className="text-link" id="users">
//               Users
//             </p>
//           </div>
//         </NavLink>
//       ) : null}
//       {renderUserLinks(appState.user, loginLink, userPages, toNavLink)}
//     </nav>
//   );
// }

// export default Navbar;
