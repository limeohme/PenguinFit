import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ACTIVITIES_REQUEST_LIMIT } from '../../common/constants';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
import SingleActivityView from '../../components/SingleActivity/SingleActivity';
import AppState from '../../providers/app-state';
import { getLiveUserActivities, getMostRecentUserActivities } from '../../services/activities-service';
// import CreateGoalForm from '../../components/CreateGoalForm/CreateGoalForm';
// import DetailedGoalsStepper from '../../components/DetailedGoalsStepper/DetailedGoalsStepper';
// import FriendsComparisonStepper from '../../components/FriendsComparisonStepper/FriendsComparisonStepper';

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
  const [activities, setActivities] = useState([]);
  const { appState:{ user } } = useContext(AppState);



  useEffect(() => {
    const unsubscribe = getLiveUserActivities(user.username, async () => {
      const recent = await getMostRecentUserActivities(user.username, ACTIVITIES_REQUEST_LIMIT);
      console.log(recent);
      setActivities(recent);
      
    //   console.log(recent.map((act)=>act.createdOn));
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
        <Grid item>
          <Typography variant='h5' sx={{ pb:2 }}>New activity:</Typography>
          {/* <Divider></Divider> */}
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <CreateActivityForm></CreateActivityForm>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>Recent activities:</Typography>
          
          <Grid container item direction="column-reverse" gap={1.5} justifyContent='centre'>
            {activities.length
              ? activities.map(([id, activity])=> <SingleActivityView key={id} activity={activity}></SingleActivityView>) 
              : 'No activities yet'}
          </Grid>

          {/* <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView>
          <SingleActivityView></SingleActivityView> */}
          
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