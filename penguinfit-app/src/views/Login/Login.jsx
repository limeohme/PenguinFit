// import './Login.css';
// import { useContext, useState } from 'react';
// import AppState from '../../providers/app-state';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { signInUser } from '../../services/auth-service';
// import { getUserByHandle } from '../../services/users-service';
// import Error from '../../components/Error/Error';
// import { keepUserInfo } from '../../services/local-storage-service';

// // gollalillian@gmail.com
// // bambubambu

// function Login() {
//   const { appState, setState } = useContext(AppState);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [errors, setErrors] = useState({
//     loginError: '',
//     userDataError: '',
//   });
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//   });

//   function formSetter(prop, value) {
//     setForm({
//       ...form,
//       [prop]: value,
//     });
//   }

//   function errorSetter(prop, value) {
//     setErrors({
//       ...errors,
//       [prop]: value,
//     });
//   }

//   function submissionHandler(e) {
//     e.preventDefault();
//     signInHandler(e, form.email, form.password);
//   }

//   function signInHandler(ev, email, password) {
//     ev.preventDefault();
//     signInUser(email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         getUserByHandle(user.displayName)
//           .then((snapshot) => {
//             const userData = snapshot.val();

//             setState({
//               ...appState,
//               user: userData,
//             });
//             keepUserInfo(userData, userCredential);
//             navigate(location?.state?.from ?? '/home');
//           })
//           .catch(console.log);
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         if (errorMessage.includes('user-not-found')) {
//           errorSetter(
//             'loginError',
//             'There is no user with this login information.',
//           );
//         }
//         if (errorMessage.includes('wrong-password')) {
//           errorSetter('loginError', 'Wrong password!');
//         }
//       });
//   }

//   return (
//     <>
//       <form className="login">
//         {/* <h3>Login</h3> */}
//         <input
//           type="email"
//           placeholder="email"
//           onChange={(e) => formSetter('email', e.target.value)}
//         ></input>
//         <br />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={(e) => formSetter('password', e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') submissionHandler(e);
//           }}
//         ></input>
//         <br />
//         <Error error={errors.loginError || ''}></Error>
//         <div
//           className="sign-in-btn"
//           onClick={(e) => {
//             submissionHandler(e);
//           }}
//         >
//           Sign In
//         </div>
//       </form>

//       <div className="not-registered">
//         <div className="not-registered-text">Not Registered?</div>
//         <div className="redirect">
//           <Link to="/register">Sign Up</Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
