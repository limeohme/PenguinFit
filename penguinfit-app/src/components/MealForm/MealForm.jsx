import { Button, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import AppState from '../../providers/app-state';
import { addMealToDB, getFoodItemData, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../services/meals-service';
import { formatDateToString } from '../../utils/utils';


const styles = {
  inputs:{
    minWidth: '100%',
  },
  form:{
    gap:'16px',
    p: 2,
    boxSizing: 'border-box'
  }

};

function MealForm () {
  const { appState:{ user } } = useContext(AppState);
  

  // const [formError, setFormError] = useState({ title : '', duration : '', type : '' });

  const [_titleError, _setTitleError] = useState(null);
  const [_foodError, _setfoodError] = useState(null);
  const [foods, setFoods] = useState([]);
  const [item, setItem] = useState('');
  const [grams, setGrams] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [mealObj, setMealObj] = useState({
    title: '',
    type: '',
    foods: [],
    cal: 0,
    dateVal: Date.parse(formatDateToString(new Date())),
    createdOn: formatDateToString(new Date()) 
  });

  const handleFoodItemChange = (e) => {
    const val = e.target.value;
    if (val) setItem(val);
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val) setGrams(+val);
  };

  const handleTypeChange  = (e) => {
    const val = e.target.value;
    if (val) {
      setType(val);
      setMealObj({ ...mealObj, type: val });
    } 
  };

  const handleTitleChange  = (e) => {
    const val = e.target.value;
    if (val) {
      setTitle(val);
      setMealObj({ ...mealObj, title: val });
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (item && grams) {
      try {
        const foodItemObject = await getFoodItemData(item, grams);
        const zeID = foods.length;
        setFoods([...foods, { ...foodItemObject, quantity: grams, id: zeID }]);
        setMealObj({ ...mealObj, foods: [...foods, { ...foodItemObject, quantity: grams, id: zeID }], cal: mealObj.cal + foodItemObject.cal });
        console.log(mealObj.foods);
        setItem(''); setGrams('');
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }      
    } else {
      setMessage('Please enter food item name and quantity!');
    }
  };

  const handleRemove = (e) => {
    setFoods(foods.filter( el => `${el.foodItem + el.id}` !== e.target.name));
  };

  const handleAddtoDB = (meal) => {
    if (meal.title && meal.type && meal.foods.length) {
      addMealToDB(user.username, meal);
      meal.foods.forEach((food) => {
        updateDailyCalsGetter(user.username)
          .then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, food.cal).catch(console.error));
        updateUserNutrients(user.username, food.nutrients.protein, food.nutrients.carbs, food.nutrients.fats).catch(console.error);
      });
      
      setFoods([]); setTitle(''); setType('');
      setMealObj({
        title: '',
        type: '',
        foods: [],
        cal: 0,
        dateVal: Date.parse(formatDateToString(new Date())),
        createdOn: formatDateToString(new Date()) 
      });
    } 
  };

  return (
    <Grid 
      container 
      direction="column" 
      justifyContent="space-between" 
      alignItems="center" 
      alignSelf="left" 
      sx={styles.form} 
    >

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="foods-input"
            name="foods"
            label="food item"
            value={item}
            type="text"
            onChange={handleFoodItemChange}
            fullWidth
            variant="standard" 
            size="small"
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{item? null : <em>{}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="quantity-input"
            name="quantity"
            label="quantity"
            type="number"
            value={grams}
            onChange={handleQuantityChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">gr</InputAdornment>,
            }}
            fullWidth
            variant="standard" 
            size="small"
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{grams? null : <em>{}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD ITEM
          </Button>
        </Grid>
      </Grid>

      {/* optimize and use enums */}
      <Grid container direction="column-reverse" spacing={2}>
        {foods.map((el, index) => {
          return ( <Grid item xs key={index}>
            <Typography key={index}>{`${el.foodItem} | ${el.quantity} gr.` }
              <Button variant='text' size='small' name={el.foodItem+el.id} onClick={handleRemove}>x</Button>
            </Typography>
          </Grid>
          );
        })}
        <Grid item xs={12}>
          <FormControl>
            {/* <FormLabel>Type</FormLabel> */}
            <RadioGroup
              name="type"
              value={type}
              onChange={handleTypeChange}
              row
              sx={{ justifyContent: 'left', alignSelf:'center' }}
            >
              <FormControlLabel
                key="Breakfast"
                value="Breakfast"
                control={<Radio size="small" />}
                label="Breakfast"
              />
              <FormControlLabel
                key="Second Breakfast"
                value={'Second\nBreakfast'}
                control={<Radio size="small" />}
                label="Second Breakfast"
              />
              <FormControlLabel
                key="Elevenses"
                value="Elevenses"
                control={<Radio size="small" />}
                label="Elevenses"
              />
              <FormControlLabel
                key="Luncheon"
                value="Luncheon"
                control={<Radio size="small" />}
                label="Luncheon"
              />
              <FormControlLabel
                key="AfternoonTea"
                value={'Afternoon\nTea'}
                control={<Radio size="small" />}
                label="Afternoon Tea"
              />
              <FormControlLabel
                key="Dinner"
                value="Dinner"
                control={<Radio size="small" />}
                label="Dinner"
              />
              <FormControlLabel
                key="Supper"
                value="Supper"
                control={<Radio size="small" />}
                label="Supper"
              />
            </RadioGroup>
          </FormControl>
          <FormHelperText id="type-error-text" sx={{ color:'#D81159' }}>{title? null : <em>{}</em>}</FormHelperText>
        </Grid>
                        
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            id="title-input"
            name="title"
            label="title"
            value={title}
            type="text"
            onChange={handleTitleChange}
            fullWidth
            variant="standard" 
            size="small"
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{mealObj.title? null : <em>{message}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => handleAddtoDB(mealObj)} sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD MEAL
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MealForm;
