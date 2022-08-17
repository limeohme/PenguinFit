import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CreateGoalForm from '../../components/CreateGoalForm/CreateGoalForm';
import DetailedGoalsStepper from '../../components/DetailedGoalsStepper/DetailedGoalsStepper';
import FriendsComparisonStepper from '../../components/FriendsComparisonStepper/FriendsComparisonStepper';
import AppState from '../../providers/app-state';
import { listenToOtherGoals, getUserGoals, listenToCardioGoals, listenToStrengthGoals } from '../../services/goals-service';


// user friends
const friends = [{
  title:'exercisesCount',
  results: [{ 
    name:'Pesho',
    data: { x:1 , y:5 }
  },
  {
    name:'Gosho',
    data: { x:2 , y:10 }
  },
  {
    name:'Stawri',
    data: { x:3 , y:7 }
  },
  {
    name:'Stawri',
    data: { x:4 , y:7 }
  }]
},
{
  title:'goals',
  results: [{ 
    name:'Pesho',
    data: { x:1 , y:10 }
  },
  {
    name:'Gosho',
    data: { x:2 , y:7 }
  },
  {
    name:'Stawri',
    data: { x:3 , y:5 }
  },
  {
    name:'Stawri',
    data: { x:4 , y:5 }
  }]
},];


const extractGoals = (obj) => {
  if(!obj) return [];
  return Object.values(obj).map(el => Object.values(el) );
};

const getSteps = (obj) => {
  return [...extractGoals(obj.cardio), ...extractGoals(obj.strength), ...extractGoals(obj.other) ].flat();
};

function Goals() {
  const { appState } = useContext(AppState);
  const [ goals, setGoals ] = useState({});
  const user = appState.user;

  useEffect(() => {
    getUserGoals(user.username)
      .then((userGoals) => setGoals(userGoals));
  },[user]);
  
  //get live other goals
  useEffect(() => {
    const unsubscribe = listenToOtherGoals(user.username, () => {
      // console.log('other');
      getUserGoals(user.username)
        .then((userGoals) => setGoals(userGoals));
    });
    return () => unsubscribe();
  }, []);

  //get live cardio goals
  useEffect(() => {
    const unsubscribe = listenToCardioGoals(user.username, () => {
      // console.log('cardio');
      getUserGoals(user.username)
        .then((userGoals) => setGoals(userGoals));
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const unsubscribe = listenToStrengthGoals(user.username, () => {
      // console.log('Strength');
      getUserGoals(user.username)
        .then((userGoals) => setGoals(userGoals));
    });
    return () => unsubscribe();
  }, []);

  return(
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={4}>
        <DetailedGoalsStepper steps={getSteps(goals)}></DetailedGoalsStepper>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid container direction="row">
          <Grid item xs={12} sm={6}>
            <FriendsComparisonStepper steps={ friends }> </FriendsComparisonStepper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FriendsComparisonStepper steps={ friends }> </FriendsComparisonStepper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CreateGoalForm username={user.username} goals={goals}></CreateGoalForm>
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={() => console.log(getSteps(goals))}>OPA</Button> 
    </Grid>
  ); 
};

export default Goals;