
import { signOutUser } from '../../services/auth-service';
import { removeUserFromStorage } from '../../services/local-storage-service';

const signOutHandler = ({ changeUser, }) => {
  signOutUser(changeUser);
  removeUserFromStorage();
};

function SignOut(changeUser) {
  return (
    <p onClick={() => signOutHandler(changeUser)}>
        Sign out
    </p>
  );
}

export default SignOut;
