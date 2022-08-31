import { useContext, useEffect, useState } from 'react';
import AppState from '../../providers/app-state';

import { getActivityRequestsArray } from '../../utils/activities-utils';
import { getLiveUserActivities, getMostRecentUserActivities, getLiveActivityRequests,  getUserActivitiesFromRequests } from '../../services/activities-service';

import { Box, Grid, Paper, Typography } from '@mui/material';
import CreateActivityForm from '../../components/FormsComponents/CreateActivityForm/CreateActivityForm';
import DisplayActivities from '../../components/ListComponents/DisplayActivities/DisplayActivities';
import DisplayActivityRequests from '../../components/ListComponents/DisplayActivityRequests/DisplayActivityRequests';
import { getActivitiesDataByType, getFieldByType, getLiveUserLastNDaysData } from '../../services/data-viz-service';
import { PieChartActivityTypes } from '../../components/DataVisualisationComponents/PieCharts/PieCharts';
import { CaloriesToDurationByActivityTypeBar } from '../../components/DataVisualisationComponents/BarCharts/ActivityBarCharts';
import { CaloriesBurnedByDay } from '../../components/DataVisualisationComponents/BarCharts/CaloriesBurnedByDay';


function Activities() {
  
  const { appState:{ user } } = useContext(AppState);
  const [activities, setActivities] = useState([]);
  const [activityRequests, setActivityRequests] = useState([]);
  const [countByType, setCountByType] = useState({});

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
    const unsubscribe = getLiveUserLastNDaysData(user.username, (snapshot) => {
      try{
        const lastNDaysData = Object.values(snapshot.val());

        // obj/activites/countByType
        const activitiesDataByType = getActivitiesDataByType(lastNDaysData);
        const typesByCount = getFieldByType(activitiesDataByType, 'countOfType');
        setCountByType(typesByCount);
        // console.log(countByType);

        // obj/cals/burned


        // obj/activites/durationByType & caloriesByType


      }catch(err){
        console.error(err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = getLiveActivityRequests(user.username, async (snapshot) => {

      try{
        if (snapshot.exists()) {
          const requestsArr = getActivityRequestsArray(snapshot);
          const requested = await getUserActivitiesFromRequests(requestsArr);
  
          setActivityRequests(requested);
          
        } else {
  
          setActivityRequests([]);
        }
      }catch(err){
        console.error(err);
      }
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
      <Grid container item direction="column" gap={4} xs={12} sm={5}>
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

      <Grid item xs={12} sm={7}>
        <Typography variant='h5' sx={{ pb:2 }}>Statistics:</Typography>
        
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
            <Paper sx={{ backgroundColor: '#ffffff75',  p: 1  }}>
              
              <Box>
                <Typography sx={{ fontSize: 15 }}> calories burned by day </Typography>
                <Typography sx={{ fontSize: 10 }}> (last 14 days) </Typography>
              </Box>

              <CaloriesBurnedByDay></CaloriesBurnedByDay>
            </Paper>
          </Grid>
          <Grid container item spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ backgroundColor: '#ffffff75',  p: 1  }}>
                <Box>
                  <Typography sx={{ fontSize: 15 }}> activity types in % </Typography>
                  <Typography sx={{ fontSize: 10 }}> (last 14 days) </Typography>
                </Box>
                
                <PieChartActivityTypes countByType={countByType}></PieChartActivityTypes>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ backgroundColor: '#ffffff75',  p: 1  }}>
                
                <Box>
                  <Typography sx={{ fontSize: 15 }}> duration vs. calories burned by type </Typography>
                  <Typography sx={{ fontSize: 10 }}> (last 14 days) </Typography>
                </Box>
                
                <CaloriesToDurationByActivityTypeBar ></CaloriesToDurationByActivityTypeBar>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      
    </Grid>
  ); 
};

export default Activities;