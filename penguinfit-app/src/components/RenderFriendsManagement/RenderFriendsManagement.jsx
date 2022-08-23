import DisplayFriends from '../ListComponents/DisplayFriends/DisplayFriends';
import { useEffect, useState } from 'react';
import { getAllUsers, listenToFriends, getUserFriends } from '../../services/user-service';
import FriendsAutocomplete from '../FriendsAutocomplete/FriendsAutocomplete';



const getAddFriendsOptions = (friends, users, username) => {
  // eslint-disable-next-line no-unused-vars
  const { [username]:remove , ...usersCopy } = users;
  for (const friend of friends){
    delete usersCopy[friend.username];
  }
  return Object.keys(usersCopy);
};

export default function RenderFriendsManagement({ username }) {
  const [ users, setUsers ] = useState([]);
  const [ friends, setFriends ] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((snapshot) => setUsers(snapshot.val()));
    getUserFriends(username)
      .then((UserFriends) => setFriends(UserFriends));
  }, []);

  useEffect(() => {
    const unsubscribe = listenToFriends(username, () => {
      getUserFriends(username)
        .then((UserFriends) => setFriends(UserFriends));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <FriendsAutocomplete 
        notFriends={getAddFriendsOptions(friends, users, username)}
        username={username} 
      >
      </FriendsAutocomplete>
      <DisplayFriends 
        friends={ friends }
        username={username} >
      </DisplayFriends>
    </>
  );
};