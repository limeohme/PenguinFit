import DisplayFriends from '../DisplayFriends/DisplayFriends';
import { useEffect, useState } from 'react';
import { getAllUsers, listenToFriends, getUserFriends } from '../../services/user-service';
import FriendsAutocomplete from '../FriendsAutocomplete/FriendsAutocomplete';


const getAddFriendsOptions = (friends, users, username) => {
  // eslint-disable-next-line no-unused-vars
  const { [username]:remove , ...usersCopy } = users;
  for (const friend in friends){
    delete usersCopy[friend];
  }
  return usersCopy;
};

export default function RenderFriendsManagement({ username }) {
  const [ users, setUsers ] = useState([]);
  const [ friends, setFriends ] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((snapshot) => setUsers(snapshot.val()));
    getUserFriends(username)
      .then((userGoals) => setFriends(userGoals));
  }, []);

  useEffect(() => {
    const unsubscribe = listenToFriends(username, () => {
      getUserFriends(username)
        .then((userGoals) => setFriends(userGoals));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <FriendsAutocomplete 
        notFriends={Object.keys(getAddFriendsOptions(friends, users, username)) }
        username={username} >
      </FriendsAutocomplete>
      <DisplayFriends friends={ Object.keys(friends) } username={username} ></DisplayFriends>
    </>
  );
};