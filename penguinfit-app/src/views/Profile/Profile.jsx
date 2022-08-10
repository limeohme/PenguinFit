// import './Profile.css';
// import { useContext, useEffect, useState } from 'react';
// import AppState from '../../providers/app-state';
// import Foldable from '../../components/Foldable/Foldable';
// import { changeEmail, changePassword } from '../../services/auth-service';
// import { validateProfileUpdates } from '../../utils/validations';
// import PostGeneral from '../../components/PostGeneral/PostGeneral';
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from 'firebase/storage';
// import { storage } from '../../config/firebase-config';
// import {
//   updateUserParam,
//   updateUserProfilePicture,
//   getDislikedPosts,
//   getLikedPosts,
//   getCommentedOnPosts,
// } from '../../services/users-service';
// import {
//   getLoggedUser,
//   getLoggedUserAuth,
//   updateUserInfo,
// } from '../../services/local-storage-service';
// import { filterPostsBy } from '../../services/posts-service';
// import { DISLIKE_ICON, LIKE_ICON } from '../../common/constants';

// function Profile() {
//   const {
//     appState: { user },
//     setState,
//   } = useContext(AppState);
//   const handle = user.username;
//   const [profilePictureURL, setProfilePictureURL] = useState(
//     user.profilePicture || user.avatarURL,
//   );
//   const [message, setMessage] = useState('');
//   const [show, setShow] = useState(false);
//   const [showChangePicture, setShowChangePicture] = useState(false);
//   const [userPosts, setUserPosts] = useState({
//     like: [],
//     dislike: [],
//     commentedOn: [],
//   });
//   const [showLikedPosts, setShowLikedPosts] = useState(false);
//   const [showYourPosts, setShowYourPosts] = useState(false);
//   const [showDislikedPosts, setShowDislikedPosts] = useState(false);
//   const [showCommentedOnPosts, setShowCommentedOnPosts] = useState(false);
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//     passwordCheck: '',
//     firstName: '',
//     lastName: '',
//   });

//   const [editMenu, setEditMenu] = useState(false);

//   useEffect(() => {
//     updateAppState();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     getLikedPosts(user.username)
//       .then((posts) => posts.filter(Boolean))
//       .then((posts) => setUserPosts({ ...userPosts, like: posts }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showLikedPosts]);

//   useEffect(() => {
//     getDislikedPosts(user.username)
//       .then((posts) => posts.filter(Boolean))
//       .then((posts) => setUserPosts({ ...userPosts, dislike: posts }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showDislikedPosts]);

//   useEffect(() => {
//     getCommentedOnPosts(user.username)
//       .then((posts) => posts.filter(Boolean))
//       .then((posts) => setUserPosts({ ...userPosts, commentedOn: posts }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showCommentedOnPosts]);

//   const givenLikes = user.like || {};
//   const givenLikesCount = Object.keys(givenLikes).length;
//   const givenDislikes = user.dislike || {};
//   const givenDislikesCount = Object.keys(givenDislikes).length;

//   const userActivityStatus =
//     givenDislikesCount <= givenLikesCount ? 'supporter' : 'hater';

//   function updateAppState() {
//     const updatedState = {
//       user: getLoggedUser(),
//       userAuthData: getLoggedUserAuth() || null,
//     };
//     setState(updatedState);
//   }

//   function formSetter(prop, value) {
//     setForm({
//       ...form,
//       [prop]: value,
//     });
//   }

//   function editDetailsHandler(ev, form) {
//     ev.preventDefault();
//     const { password, email, firstName, lastName } = form;
//     if (password) {
//       changePassword(password).catch((e) =>
//         setMessage('Requires recent login to change password !'),
//       );
//     }
//     if (email) {
//       changeEmail(email).catch((e) =>
//         setMessage('Requires recent login to change email !'),
//       );
//     }
//     if (firstName) {
//       updateUserParam(user.username, 'firstName', firstName);
//     }
//     if (lastName) {
//       updateUserParam(user.username, 'lastName', lastName);
//     }
//     setMessage('Details changed successfully');
//   }

//   function uploadPicture(e) {
//     e.preventDefault();

//     const file = e.target[0]?.files?.[0];

//     if (!file) return setMessage(`Please select a file!`);
//     const storagePath = storageRef(storage, `images/${handle}/avatar`);

//     uploadBytes(storagePath, file)
//       .then((snapshot) => {
//         return getDownloadURL(snapshot.ref)
//           .then((URL) => {
//             return updateUserProfilePicture(handle, URL)
//               .then(() => {
//                 updateAppState();
//                 setProfilePictureURL(URL);
//                 updateUserInfo({ ...user, profilePicture: URL });
//               })
//               .catch(console.error);
//           })
//           .catch(console.error);
//       })
//       .catch(console.error);

//     setMessage(`Profile picture changed successfully!`);
//     setShowChangePicture(!showChangePicture);
//   }

//   const yourPosts = filterPostsBy(`author`, user.username);

//   return (
//     <div className="profile">
//       <div className="image-crop">
//         <img className="profile-avatar" src={profilePictureURL} alt="avatar" />
//       </div>
//       <h1 className="user-name">{user.username},</h1>

//       <div className="activity-status-container">
//         <p className="status-info">
//           You gave away {givenLikesCount} {LIKE_ICON} and {givenDislikesCount}{' '}
//           {DISLIKE_ICON}
//         </p>
//         <p className={userActivityStatus === 'hater' ? 'hater' : 'supporter'}>
//           You are a {userActivityStatus}!
//         </p>
//       </div>

//       <Foldable
//         buttonShow={<div className="edit-profile-btn">🔨</div>}
//         buttonHide={<div className="edit-profile-btn">✖</div>}
//         setShow={setEditMenu}
//         show={editMenu}
//       >
//         <div className="edit-menu">
//           <Foldable
//             buttonShow={<button className="edit-det-btn">Edit Details</button>}
//             buttonHide={''}
//             setShow={setShow}
//             show={show}
//           >
//             <form className="inputs">
//               <input
//                 type="firstName"
//                 placeholder="First Name"
//                 onChange={(e) => formSetter('firstName', e.target.value)}
//               ></input>
//               <br />
//               <input
//                 type="lastName"
//                 placeholder="Last Name"
//                 onChange={(e) => formSetter('lastName', e.target.value)}
//               ></input>
//               <br />
//               <input
//                 type="email"
//                 placeholder="New email"
//                 onChange={(e) => formSetter('email', e.target.value)}
//               ></input>
//               <br />
//               <input
//                 type="password"
//                 placeholder="New password"
//                 autoComplete="new-password"
//                 onChange={(e) => formSetter('password', e.target.value)}
//               ></input>
//               <br />
//               <input
//                 type="password"
//                 placeholder="New password again..."
//                 autoComplete="new-password"
//                 onChange={(e) => formSetter('passwordCheck', e.target.value)}
//               ></input>
//               <br />
//             </form>

//             <div className="confirm-buttons">
//               <button
//                 className="cancel"
//                 onClick={() => {
//                   setShow(!show);
//                   setMessage('');
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="edit-menu-btn save"
//                 onClick={(e) => {
//                   try {
//                     validateProfileUpdates(form);
//                     setShow(!show);
//                     editDetailsHandler(e, form);
//                   } catch (err) {
//                     setMessage(err.message);
//                   }
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </Foldable>
//           <h4 className="err">{message || ''}</h4>
//           <Foldable
//             buttonShow={<button className="edit-pic-btn">Edit Picture</button>}
//             buttonHide={''}
//             setShow={setShowChangePicture}
//             show={showChangePicture}
//           >
//             <div className="change-pic-menu">
//               <form onSubmit={(e) => uploadPicture(e)}>
//                 <label className="custom-file-upload">
//                   <input type="file" />
//                   <div id="upl-btn">Select File</div>
//                 </label>
//                 <button
//                   className="cancel"
//                   onClick={() => {
//                     setShowChangePicture(!showChangePicture);
//                     setMessage('');
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button className="edit-menu-btn save" type="submit">
//                   Save
//                 </button>
//                 <div className="confirm-buttons"></div>
//               </form>
//             </div>
//           </Foldable>
//         </div>
//       </Foldable>
//       <div className="info-profile">
//         <Foldable
//           buttonShow={<h4>Show your posts</h4>}
//           buttonHide={<h4>Hide your posts</h4>}
//           setShow={setShowYourPosts}
//           show={showYourPosts}
//         >
//           {yourPosts.length ? (
//             yourPosts.map((post) => <PostGeneral key={post.id} post={post} />)
//           ) : (
//             <span className="no-posts-msg">You haven`t posted yet.</span>
//           )}
//         </Foldable>
//         <Foldable
//           buttonShow={<h4>Show posts you've commented on</h4>}
//           buttonHide={<h4>Hide posts you've commented on</h4>}
//           setShow={setShowCommentedOnPosts}
//           show={showCommentedOnPosts}
//         >
//           {userPosts.commentedOn.length ? (
//             userPosts.commentedOn.map((post) => (
//               <PostGeneral key={post.id} post={post} />
//             ))
//           ) : (
//             <span className="no-posts-msg">
//               You haven`t commented on any posts yet.
//             </span>
//           )}
//         </Foldable>
//         <Foldable
//           buttonShow={<h4>Show liked posts</h4>}
//           buttonHide={<h4>Hide liked posts</h4>}
//           setShow={setShowLikedPosts}
//           show={showLikedPosts}
//         >
//           {userPosts.like.length ? (
//             userPosts.like.map((post) => (
//               <PostGeneral key={post.id} post={post} />
//             ))
//           ) : (
//             <span className="no-posts-msg">You haven`t liked posts yet.</span>
//           )}
//         </Foldable>
//         <Foldable
//           buttonShow={<h4>Show disliked posts</h4>}
//           buttonHide={<h4>Hide disliked posts</h4>}
//           setShow={setShowDislikedPosts}
//           show={showDislikedPosts}
//         >
//           {userPosts.dislike.length ? (
//             userPosts.dislike.map((post) => (
//               <PostGeneral key={post.id} post={post} />
//             ))
//           ) : (
//             <span className="no-posts-msg">
//               You haven`t disliked posts yet.
//             </span>
//           )}
//         </Foldable>
//       </div>
//     </div>
//   );
// }

// export default Profile;
