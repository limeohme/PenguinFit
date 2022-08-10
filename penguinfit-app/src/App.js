import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AppState from './providers/app-state';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import NotFound from './views/NotFound/NotFound';
import Profile from './views/Profile/Profile';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Home from './views/Home/Home';
// import About from './views/About/About';
// import Posts from './views/Posts/Posts';
// import CreatePost from './views/CreatePost/CreatePost';
// import PostDetailed from './views/PostDetailed/PostDetailed';
import {
  getLoggedUser,
  getLoggedUserAuth,
} from './services/local-storage-service';
import Authenticated from './hoc/Authenticated';
import AuthenticatedAdmin from './hoc/AuthenticatedAdmin';
// import DeletedPost from './views/PostDetailed/DeletedPost/DeletedPost';
// import UserDetailed from './views/UserDetailed/UserDetailed';
// import Users from './views/Users/Users';

function App() {
  const [appState, setState] = useState({
    user: getLoggedUser(),
    userAuthData: getLoggedUserAuth() || null,
  });

  return (
    <BrowserRouter>
      <AppState.Provider value={{ appState, setState }}>
        <div className="container">
          <Navbar />

          <main className="Outlet">
            <Routes>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              {/* <Route path="about" element={<About />} /> */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="posts"
                element={
                  <Authenticated>
                    {/* <Posts /> */}
                  </Authenticated>
                }
              />
              <Route
                path="create-post"
                element={
                  <Authenticated>
                    {/* <CreatePost /> */}
                  </Authenticated>
                }
              />
              <Route
                path="posts/:postId"
                element={
                  <Authenticated>
                    {/* <PostDetailed /> */}
                  </Authenticated>
                }
              />
              <Route
                path="deleted"
                element={
                  <Authenticated>
                    {/* <DeletedPost /> */}
                  </Authenticated>
                }
              />
              <Route
                path="profile"
                element={
                  <Authenticated>
                    <Profile />
                  </Authenticated>
                }
              />
              <Route
                path="users"
                element={
                  <AuthenticatedAdmin>
                    {/* <Users /> */}
                  </AuthenticatedAdmin>
                }
              />
              <Route
                path="users/:username"
                element={
                  <Authenticated>
                    {/* <UserDetailed /> */}
                  </Authenticated>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppState.Provider>
    </BrowserRouter>
  );
}

export default App;

