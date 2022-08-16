import { Grid, Paper } from '@mui/material';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
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
  return(
    <Grid
      container
      direction="row"
      justifyContent="left"
      alignItems="left"
      sx={{ p:4 }}
      spacing={4}
    >
      <Grid item xs={12} sm={5.5}>
        <Paper sx={{ backgroundColor: '#ffffff75' }}>
          <CreateActivityForm></CreateActivityForm>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6.5}>
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