import DisplayFriends from '../ListComponents/DisplayFriends/DisplayFriends';
import { useEffect, useState } from 'react';
import { getAllUsers, listenToFriends, getUserFriends } from '../../services/user-service';
import FriendsAutocomplete from '../FriendsAutocomplete/FriendsAutocomplete';
import { getUserRequest } from '../../services/friends-service';
import DisplaySentRequests from '../ListComponents/DisplaySentRequests/DisplaySentRequests';
import { Divider } from '@mui/material';
import DisplayReceivedRequests from '../ListComponents/DisplayReceivedRequests/DisplayReceivedRequests';



const getAddFriendsOptions = (friends, users, username) => {
  // eslint-disable-next-line no-unused-vars
  const { [username]:remove , ...usersCopy } = users;
  for (const friend of friends){
    delete usersCopy[friend.username];
  }
  return Object.keys(usersCopy);
};

const sortRequests = (requests, username) => {
  if(!requests) return null;
  const requestsArr = Object.values(requests);
  const sent = [];
  const received = [];
  requestsArr.forEach(el => {
    if(el.sender === username) {
      return sent.push(el);
    } 
    return received.push(el);
  });
  return { received , sent };
};

export default function RenderFriendsManagement({ username }) {
  const [ users, setUsers ] = useState([]);
  const [ friends, setFriends ] = useState([]);
  const [ requests, setRequests ] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((snapshot) => setUsers(snapshot.val()));
    getUserFriends(username)
      .then((UserFriends) => setFriends(UserFriends));
    getUserRequest(username)
      .then((snapshot) => setRequests(sortRequests(snapshot.val(), username)));
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
        username={ username } 
      />
      {requests && requests.sent.length > 0 &&
      <>
        <Divider>Sent requests</Divider>
        <DisplaySentRequests
          requests={requests.sent}
        />
      </> 
      }
      {requests && requests.received.length > 0 &&
      <>
        <Divider>Received requests</Divider>
        <DisplayReceivedRequests
          requests={requests.received}
        />
      </> 
      }
    </>
  );
};