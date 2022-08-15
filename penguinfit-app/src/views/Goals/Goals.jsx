import { Grid } from '@mui/material';
import CreateGoalForm from '../../components/CreateGoalForm/CreateGoalForm';
import DetailedGoalsStepper from '../../components/DetailedGoalsStepper/DetailedGoalsStepper';
import FriendsComparisonStepper from '../../components/FriendsComparisonStepper/FriendsComparisonStepper';

// user goals
const steps = [
  {
    name: 'Da skolasam da zawursha',
    status: 'po4ti',
    createdOn: new Date(),
    dueDate: new Date(),
    completed: 90,
  },
  {
    name: 'Da skolasam da si namerq rabota',
    status: 'zle e',
    createdOn: new Date(),
    dueDate: new Date(),
    completed: 1,
  },
];

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

// function sortPeople (criteria, people) {
//   return people.sort((a,b) => (b[criteria] - a[criteria]));
// }

// function createPeopleSteps (people){
//   const mostAc = sortPeople('exercisesCount', people);
//   const names = mostAc.map(el => el.name);
//   // const data = mostAc.map((el, i) => el = { x: i, y : el.exercisesCount });

//   return [{
//     title: 'exercisesCount',
//     names,
//     data: [
//       { x: 1, y: 2 },
//       { x: 2, y: -1 },
//       { x: 3, y: 1 },
//       { x: 4, y: 3 }
//     ],
//   }];
// };
// const friendsStep = [{
//   title: 'someStufff',
//   names: ['Pesho', 'Gosho', 'Ivan', 'Stavri'],
//   data: [
//     { x:0 , y:2 },
//     { x:1 , y:4 },
//     { x:2 , y:6 },
//     { x:2 , y:6 },




//   ]
// }];

function Goals() {
  return(
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={4}>
        <DetailedGoalsStepper steps={ steps }></DetailedGoalsStepper>
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
            <CreateGoalForm></CreateGoalForm>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  ); 
};

export default Goals;