import { useContext, useEffect, useState } from 'react';
import AppState from '../../providers/app-state';

import { getActivityRequestsArray } from '../../utils/activities-utils';
import { getLiveUserActivities, getMostRecentUserActivities, getLiveActivityRequests,  getUserActivitiesFromRequests } from '../../services/activities-service';

import { Grid, Paper, Typography } from '@mui/material';
import CreateActivityForm from '../../components/FormsComponents/CreateActivityForm/CreateActivityForm';
import DisplayActivities from '../../components/ListComponents/DisplayActivities/DisplayActivities';
import DisplayActivityRequests from '../../components/ListComponents/DisplayActivityRequests/DisplayActivityRequests';


// // user goals
// const steps = [
//   {
//     name: 'Da skolasam da zawursha',
//     status: 'po4ti',
//     createdOn: new Date(),
//     dueDate: new Date(),
//     completed: 90,
//   },
//   {
//     name: 'Da skolasam da si namerq rabota',
//     status: 'zle e',
//     createdOn: new Date(),
//     dueDate: new Date(),
//     completed: 1,
//   },
// ];

// // user friends
// const friends = [{
//   title:'exercisesCount',
//   results: [{ 
//     name:'Pesho',
//     data: { x:1 , y:5 }
//   },
//   {
//     name:'Gosho',
//     data: { x:2 , y:10 }
//   },
//   {
//     name:'Stawri',
//     data: { x:3 , y:7 }
//   },
//   {
//     name:'Stawri',
//     data: { x:4 , y:7 }
//   }]
// },
// {
//   title:'goals',
//   results: [{ 
//     name:'Pesho',
//     data: { x:1 , y:10 }
//   },
//   {
//     name:'Gosho',
//     data: { x:2 , y:7 }
//   },
//   {
//     name:'Stawri',
//     data: { x:3 , y:5 }
//   },
//   {
//     name:'Stawri',
//     data: { x:4 , y:5 }
//   }]
// },];

function Activities() {
  
  const { appState:{ user } } = useContext(AppState);
  const [activities, setActivities] = useState([]);
  const [activityRequests, setActivityRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = getLiveUserActivities(user.username, async () => {
      try{
        const recent = await getMostRecentUserActivities(user.username);
        setActivities(recent);
      }catch(err){
        console.error(err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = getLiveActivityRequests(user.username, async (snapshot) => {
      if (snapshot.exists()) {
        const requestsArr = getActivityRequestsArray(snapshot);
        getUserActivitiesFromRequests(requestsArr)
          .then((result)=>{
            setActivityRequests(result);
          });
      } else {
        setActivityRequests([]);
      }

      // try{
      //   const recent = await getMostRecentUserActivities(user.username, ACTIVITIES_REQUEST_LIMIT);
      //   setActivities(recent);
      // }catch(err){
      //   console.error(err);
      // }
    });

    return () => unsubscribe();
  }, []);

  return(
    <Grid
      container
      direction="row"
      justifyContent="left"
      alignItems="left"
      sx={{ p:3 }}
      spacing={4}
    >
      <Grid container item direction="column" gap={4} xs={12} sm={5.5}>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>New activity:</Typography>
          <Paper sx={{ backgroundColor: '#ffffff' }}>
            <CreateActivityForm />
          </Paper>
        </Grid>

        <Grid container item direction="column" >
          <DisplayActivityRequests requests={activityRequests} username={user.username}/>
        </Grid>

        <Grid container item direction="column">
          <DisplayActivities activities={activities} username={user.username}/>
        </Grid>

      </Grid>

      <Grid item xs={12} sm={6.5}>
        <Typography variant='h5' sx={{ pb:2 }}>Statistics:</Typography>
        {/* <DetailedGoalsStepper steps={ steps }></DetailedGoalsStepper> */}
        <Grid 
          container
          item
          direction="column"
          justifyContent="left"
          alignItems="left"
          gap={4}
        //   sx={{ p:4 }}
        //   spacing={4}
        >
          <Grid item>
            <Paper sx={{ height: '400px', backgroundColor: '#ffffff75' }}>
                graphic
            </Paper>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ height: '300px', backgroundColor: '#ffffff75' }}>
                graphic
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ height: '300px', backgroundColor: '#ffffff75' }}>
                graphic
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      
    </Grid>
  ); 
};

export default Activities;