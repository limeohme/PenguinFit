import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Container } from '@mui/system';

export default function Home({ isMdUp }) {
  const padding = isMdUp? 10 : 0;
  // const align = isMdUp? '0' : 'auto';

  return(
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      // rowSpacing = {3}
      sx={{ flex: 1, boxSizing: 'border-box', padding: '0 2em' }}
    >
      <Grid item xs={12} sm={5}  sx={{ pl: padding, display: 'flex', flexDirection: 'column' }}>

        <Typography variant="h6" sx={{ width: '100%', mt: '2rem' }}>
          Stay Fit,<br/>
          Track your progress,
        </Typography>
        <Typography variant="h4" sx={{ width: '100%', color: '#6633ff', mt: 2 }}>
          Become a Master Penguin!
        </Typography>
        <Typography sx={{ width: '100%', mt: 2 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Repellendus nostrum vel, ducimus aspernatur quae laboriosam enim et id similique esse ut dolore sit distinctio quis suscipit explicabo cupiditate. Vitae, ipsum!
        </Typography>
        <Button variant="contained" size="large" component={Link} to='/register'
          sx={{ maxWidth: 'fit-content', backgroundColor:'#6633ff', mt: 4 }}>
          GET STARTED
        </Button>

      </Grid>

      <Grid item xs={12} sm={7}>
        
        <Card sx={{ maxHeight: '75vh', backgroundColor: 'transparent', p:5 }} elevation={0}>
          <CardMedia
            component="img"
            height={isMdUp? '360px' : '100%'}
            image={require('../../images/PenguinNoBack.png')}
            alt="penguin"
            sx={{ objectFit: 'scale-down' }}
          />
        </Card>
        
      </Grid>
      
    </Grid>
  );
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
