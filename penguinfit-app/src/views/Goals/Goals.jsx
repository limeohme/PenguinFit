import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CreateGoalForm from '../../components/CreateGoalForm/CreateGoalForm';
import DetailedGoalsStepper from '../../components/DetailedGoalsStepper/DetailedGoalsStepper';
import FriendsComparisonStepper from '../../components/FriendsComparisonStepper/FriendsComparisonStepper';
import AppState from '../../providers/app-state';
import { getUserGoals, strengthListener, cardioListener, goalsListener } from '../../services/goals-service';
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

  const ListenTo = (listener, username) => {
    useEffect(() => {
      const unsubscribe = listener(username, () => {
        getUserGoals(username)
          .then((userGoals) => setGoals(userGoals));
      });
      return () => unsubscribe();
    }, []);
  };

  ListenTo(goalsListener, user.username);
  ListenTo(cardioListener, user.username);
  ListenTo(strengthListener, user.username);

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
            <CreateGoalForm username={user.username}></CreateGoalForm>
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={ () => console.log(goals) }>OPA</Button> 
    </Grid>
  ); 
};

export default Goals;