
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import AppState from '../../providers/app-state';
import { signOutUser } from '../../services/auth-service';
import { removeUserFromStorage } from '../../services/local-storage-service';

function SignOut() {
  // useContext
  const { appState, setState } = useContext(AppState);
  const navigate = useNavigate();

  const signOutHandler = () => {
    // we don't need to call the setter of the appState in auth.js - we can return the promise of signOut 
    // and handle it here - inside the then: setState / removeFromLocal / navigate - all sync fns
    signOutUser()
      .then(() => {
        setState({
          ...appState,
          user: null,
          userAuthData: null,
        });
        removeUserFromStorage();
        navigate('home');
      })
      .catch(console.error);
  };

  return <Typography onClick={signOutHandler} >Logout</Typography>;
}

export default SignOut;
