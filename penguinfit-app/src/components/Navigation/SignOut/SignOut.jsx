
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import AppState from '../../../providers/app-state';
import { signOutUser } from '../../../services/auth-service';
import { removeUserFromStorage } from '../../../services/local-storage-service';

function SignOut() {
  
  const { appState, setState } = useContext(AppState);
  const navigate = useNavigate();

  const signOutHandler = () => {
    
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
