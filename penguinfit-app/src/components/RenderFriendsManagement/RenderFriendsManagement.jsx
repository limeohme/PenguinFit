import DisplayFriends from '../DisplayFriends/DisplayFriends';
import { useEffect, useState } from 'react';
import { getAllUsers, getUserFriends } from '../../services/user-service';
import FriendsAutocomplete from '../FriendsAutocomplete/FriendsAutocomplete';




export default function RenderFriendsManagement({ username }) {
  const [ users, setUsers ] = useState([]);
  const [ friends, setFriends ] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((snapshot) => setUsers(Object.keys(snapshot.val())));
  }, []);

  useEffect(() => {
    getUserFriends(username)
      .then((snapshot) => {
        const val = snapshot.val();
        setFriends( val ? val : [] );
      });
  }, [username]);

  return (
    <>
      <FriendsAutocomplete notFriends={users}> </FriendsAutocomplete>
      { users && <DisplayFriends friends={ Object.keys(friends) } username={username} ></DisplayFriends> }
    </>
  );
};