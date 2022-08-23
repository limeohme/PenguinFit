import { Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CreateGoalForm from '../../components/FormsComponents/CreateGoalForm/CreateGoalForm';
import DetailedGoalsStepper from '../../components/Navigation/DetailedGoalsStepper/DetailedGoalsStepper';
// import FriendsComparisonStepper from '../../components/FriendsComparisonStepper/FriendsComparisonStepper';
import AppState from '../../providers/app-state';
import { goalsListener } from '../../services/goals-service';

// user friends
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


const extractGoals = (obj) => {
  if(!obj) return [];
  return Object.values(obj).map(el => Object.values(el) );
};


const getSteps = (obj) => {
  if(!obj) return [];
  // console.log([...Object.values(obj).map(el => extractGoals(el))].flat(2));
  return [...Object.values(obj).map(el => extractGoals(el))].flat(2);
};

function Goals() {
  const { appState } = useContext(AppState);
  const [ goals, setGoals ] = useState({});
  const user = appState.user;


  useEffect(() => {
    const unsubscribe = goalsListener(user.username, (snapshot) => {
      setGoals(snapshot.val());
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
          <Typography variant='h5' sx={{ pb:2 }}>New goal:</Typography>
          <Paper sx={{ backgroundColor: '#ffffff75' }}>
            <CreateGoalForm username={user.username}></CreateGoalForm>
          </Paper>
        </Grid>
        <Grid container item direction="column">
          <Typography variant='h5' sx={{ pb:2 }}>Friends :</Typography>
          
          <Grid container item direction="column" gap={1.5} justifyContent='centre'>
            {/* <FriendsComparisonStepper steps={ friends }> </FriendsComparisonStepper> */}

          </Grid>
          
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6.5} >
        <Typography variant='h5' sx={{ pb:2 }}>Your goals:</Typography>
        <Grid 
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Grid item >
            <Paper sx={{ backgroundColor: '#ffffff75' }}>
              <DetailedGoalsStepper steps={getSteps(goals)}></DetailedGoalsStepper>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  ); 
};

export default Goals;