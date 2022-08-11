export default function Home() {
  return <h1 className="home">Home</h1>;
}

// import { useContext, useEffect, useState } from 'react';
// import AppState from '../../providers/app-state';
// import PostGeneral from '../../components/PostGeneral/PostGeneral';
// import {
//   getLivePosts,
//   getPostsCount,
//   sortPostsBy,
// } from '../../services/posts-service';
// import { getLiveUsers, getUsersCount } from '../../services/users-service';
// import './Home.css';

// function Home() {
//   const {
//     appState: { user },
//   } = useContext(AppState);
//   const [postsCount, setPostsCount] = useState(null);
//   const [usersCount, setUsersCount] = useState(null);
//   const [displayPosts, setDisplayPosts] = useState([]);
//   const [active, setActive] = useState(false);

//   const toggleActive = () => {
//     setActive(!active);
//   };

//   const getDisplayPosts = (e) => {
//     if (e.target.outerText === 'most recent') {
//       setDisplayPosts(sortPostsBy('dateValue'));
//       toggleActive();
//     }

//     if (e.target.outerText === 'most popular') {
//       setDisplayPosts(sortPostsBy('popularity'));
//       toggleActive();
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = getLivePosts(() => {
//       setDisplayPosts(sortPostsBy('dateValue') ?? []);
//     }, []);

//     return () => unsubscribe();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const unsubscribe = getLiveUsers((snapshot) => {
//       setUsersCount(getUsersCount(snapshot) ?? null);
//     }, []);

//     return () => unsubscribe();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const unsubscribe = getLivePosts((snapshot) => {
//       setPostsCount(getPostsCount(snapshot) ?? null);
//     }, []);

//     return () => unsubscribe();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="home">
//       <div className="welcome-msg">
//         {user && (
//           <h2>
//             Welcome, <span className="welcome-user-name">{user.username}</span>
//           </h2>
//         )}
//       </div>
//       <div className="counters-container">
//         {/* <h4 className="counters-title"></h4> */}
//         <p className="counters-text">
//           There are currently <span className="counters-num">{usersCount}</span>{' '}
//           party penguins <span className="counters-icon">🐧</span> and{' '}
//           <span className="counters-num">{postsCount}</span> party spots{' '}
//           <span className="counters-icon">🎈</span>
//         </p>
//       </div>
//       <div className="home-posts-menu">
//         <h3
//           className={`sorting-title ${active ? 'not-active' : 'active-posts'}`}
//           onClick={(e) => getDisplayPosts(e)}
//         >
//           most recent
//         </h3>
//         <span className="sorting-title stripe">|</span>
//         <h3
//           className={`sorting-title ${active ? 'active-posts' : 'not-active'}`}
//           onClick={(e) => getDisplayPosts(e)}
//         >
//           most popular
//         </h3>
//       </div>

//       <ul className="home-posts-container">
//         {displayPosts.length ? (
//           displayPosts.map((post, key) => (
//             <PostGeneral key={post.id} post={post} />
//           ))
//         ) : (
//           <div className=".no-posts-msg-home">No posts to show yet.</div>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default Home;
