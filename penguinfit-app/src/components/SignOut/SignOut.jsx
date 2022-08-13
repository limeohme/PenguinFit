
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { signOutUser } from '../../services/auth-service';
import { removeUserFromStorage } from '../../services/local-storage-service';

const signOutHandler = ( changeUser, navigate ) => {
  signOutUser(changeUser);
  removeUserFromStorage();
  navigate('/home');
};

function SignOut(changeUser) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => signOutHandler(changeUser, navigate)} variant="contained">
    Sign out
    </Button>
  );
}

export default SignOut;
