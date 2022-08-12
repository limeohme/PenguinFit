
import { Button } from '@mui/material';
import { signOutUser } from '../../services/auth-service';
import { removeUserFromStorage } from '../../services/local-storage-service';

const signOutHandler = ({ changeUser, }) => {
  signOutUser(changeUser);
  removeUserFromStorage();
};

function SignOut(changeUser) {
  return (
    <Button onClick={() => signOutHandler(changeUser)} variant="contained">
    Sign out
    </Button>
  );
}

export default SignOut;
