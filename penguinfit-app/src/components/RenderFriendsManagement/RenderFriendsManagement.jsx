import DisplayFriends from '../ListComponents/DisplayFriends/DisplayFriends';
import { useEffect, useState } from 'react';
import { getAllUsers, listenToFriends, getUserFriends } from '../../services/user-service';
import FriendsAutocomplete from '../FriendsAutocomplete/FriendsAutocomplete';
import {  listenToRequests } from '../../services/friends-service';
import DisplaySentRequests from '../ListComponents/DisplaySentRequests/DisplaySentRequests';
import { Divider, Grid } from '@mui/material';
import DisplayReceivedRequests from '../ListComponents/DisplayReceivedRequests/DisplayReceivedRequests';
import { getAddFriendsOptions, sortRequests } from '../../utils/friends-utils';


export default function RenderFriendsManagement({ username }) {
  const [ users, setUsers ] = useState([]);
  const [ friends, setFriends ] = useState([]);
  const [ requests, setRequests ] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((snapshot) => setUsers(snapshot.val()));
    getUserFriends(username)
      .then((UserFriends) => setFriends(UserFriends));
  }, [username]);
  
  useEffect(() => {
    const unsubscribe = listenToRequests(username, (snapshot) => {
      setRequests(sortRequests(snapshot.val(), username));
    });
    return () => unsubscribe();
  }, [username]);

  useEffect(() => {
    const unsubscribe = listenToFriends(username, () => {
      getUserFriends(username)
        .then((UserFriends) => setFriends(UserFriends));
    });
    return () => unsubscribe();
  }, [username]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={1.5}
    >
      <Grid item xs={12} sm={12}>
        <FriendsAutocomplete 
          notFriends={getAddFriendsOptions(requests ,friends, users, username)}
          username={username} 
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <DisplayFriends 
          friends={ friends }
          username={ username } 
        />
      </Grid>
      {requests && requests.sent.length > 0 &&
      <Grid item xs={12} sm={12}>
        <Divider>Sent requests</Divider>
        <DisplaySentRequests
          requests={requests.sent}
        />
      </Grid> 
      }
      {requests && requests.received.length > 0 &&
      <Grid item xs={12} sm={12}>
        <Divider>Received requests</Divider>
        <DisplayReceivedRequests
          requests={requests.received}
        />
      </Grid> 
      }
    </Grid>
  );
};