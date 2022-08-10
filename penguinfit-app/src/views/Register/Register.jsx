// import './Register.css';
// import { useContext, useState } from 'react';
// import AppState from '../../providers/app-state';
// import { registerUser, userUpdate } from '../../services/auth-service';
// import { getRandomAvatar } from '../../services/avatar-service';
// import { validateRegistration } from '../../utils/validations';
// import {
//   createUserHandle,
//   getUserByHandle,
// } from '../../services/users-service';
// import SuccessMessage from './SuccessMessage';
// import Error from '../../components/Error/Error';
// import { keepUserInfo } from '../../services/local-storage-service';
// import { userRole } from '../../common/user-role';
// import { formatDateToString } from '../../utils/utils';

// function Register() {
//   const { appState, setState } = useContext(AppState);
//   const [show, setShow] = useState(false);
//   const [errors, setErrors] = useState({
//     regError: '',
//   });
//   const [regMessageTrigger, setTrigger] = useState(false);
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//     passwordCheck: '',
//     username: '',
//     firstName: '',
//     lastName: '',
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
//     try {
//       validateRegistration(form);
//       regHandler(form);
//     } catch (err) {
//       errorSetter('regError', err.message);
//     }
//   }
//   function regHandler(form) {
//     getUserByHandle(form.username)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           return errorSetter(
//             'regError',
//             `User with username ${form.username} already exists!`,
//           );
//         }
//         registerUser(form.email, form.password)
//           .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;

//             userUpdate(form.username)
//               .then(() => {
//                 // const picture = userData.avatarURL || user.photoURL;
//                 // const userInfo = {
//                 //   email: user.email,
//                 //   username: user.displayName,
//                 //   avatarURL: picture,
//                 //   handle: userData.handle,
//                 //   role: userData.role,
//                 //   firstName: userData.firstName,
//                 //   lastName: userData.lastName,
//                 // };
//                 // createdOn: new Date(),
//                 // role: userRole.BASIC,
//                 // avatarURL: '',
//                 // firstName: userInfo.firstName,
//                 // lastName: userInfo.lastName

//                 // likedPosts: {},

//                 const userInfo = {
//                   uid: user.uid,
//                   email: user.email,
//                   handle: user.displayName,
//                   username: user.displayName,
//                   profilePicture: '',
//                   avatarURL: getRandomAvatar(user.displayName),
//                   firstName: form.firstName,
//                   lastName: form.lastName,
//                   role: userRole.BASIC,
//                   createdOn: formatDateToString(new Date()),
//                 };

//                 createUserHandle(userInfo)
//                   .then(() => {
//                     console.log('User successfully added');
//                     setShow(!show);
//                     setTrigger(true);
//                     window.scrollTo(0, 0);
//                   })
//                   .catch(console.error);

//                 keepUserInfo(userInfo, userCredential);

//                 setState({
//                   ...appState,
//                   user: userInfo,
//                 });
//               })
//               .catch(console.error);
//           })
//           .catch((error) => {
//             const errorMessage = error.message;
//             if (errorMessage.includes(`email-already-in-use`)) {
//               errorSetter(
//                 'regError',
//                 `Email ${form.email} has already been registered!`,
//               );
//             }
//           });
//       })
//       .catch(console.error);
//   }

//   return (
//     <>
//       <SuccessMessage
//         setTrigger={setTrigger}
//         regMessageTrigger={regMessageTrigger}
//       ></SuccessMessage>
//       <div className="userErrors"></div>
//       <div className="register">
//         <div className="inputs">
//           {/* <h3>Register</h3> */}
//           <input
//             type="firstName"
//             placeholder="First Name*"
//             onChange={(e) => formSetter('firstName', e.target.value)}
//           ></input>
//           <br />
//           <input
//             type="lastName"
//             placeholder="Last Name*"
//             onChange={(e) => formSetter('lastName', e.target.value)}
//           ></input>
//           <br />
//           <input
//             type="email"
//             placeholder="email*"
//             onChange={(e) => formSetter('email', e.target.value)}
//           ></input>
//           <br />
//           <input
//             type="username"
//             placeholder="username*"
//             onChange={(e) => formSetter('username', e.target.value)}
//           ></input>
//           <br />
//           <input
//             type="password"
//             placeholder="password*"
//             onChange={(e) => formSetter('password', e.target.value)}
//           ></input>
//           <br />
//           <input
//             type="password"
//             placeholder="password again...*"
//             onChange={(e) => formSetter('passwordCheck', e.target.value)}
//           ></input>
//           <p className="required">
//             Fields marked with * are required.
//             <br /> Yes, I know it's all of them...
//           </p>
//           <div className="regErrors">
//             <Error error={errors.regError || ''}></Error>
//           </div>
//           <button
//             onClick={(e) => {
//               submissionHandler(e);
//             }}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;
