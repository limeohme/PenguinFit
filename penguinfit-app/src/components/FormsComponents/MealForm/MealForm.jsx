import { Button, FormHelperText, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { MEAL_TYPES } from '../../../common/constants';
import AppState from '../../../providers/app-state';
import { addMealToDB, getFoodItemData, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../../services/meals-service';
import { formatDateToString } from '../../../utils/utils';
import CustomRadioGroupForm from '../../CustomRadioGroupForm/CustomRadioGroupForm';
import { validateMeal } from './meal-form-validations';


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
  const { appState: { user } } = useContext(AppState);
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
    setItem(val);
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    setGrams(+val);
  };

  const handleTypeChange  = (e) => {
    const val = e.target.value;
    setType(val);
    setMealObj({ ...mealObj, type: val });    
  };

  const handleTitleChange  = (e) => {
    const val = e.target.value;
    setTitle(val);
    setMealObj({ ...mealObj, title: val });    
  };

  const setMessageHandler = (mes) => {
    setMessage(mes);
    setTimeout(() => {
      setMessage('');
    }, 4000);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (item && grams) {
      try {
        const foodItemObject = await getFoodItemData(item, grams);
        const zeID = foods.length;
        setFoods([...foods, { ...foodItemObject, quantity: grams, id: zeID }]);
        setMealObj({ ...mealObj, foods: [...foods, { ...foodItemObject, quantity: grams, id: zeID }], cal: mealObj.cal + foodItemObject.cal });
        setItem(''); setGrams('');
      } catch (err) {
        console.error(err);
        setMessageHandler('Ooops... We don\'t recognize this food item!');
      }      
    } else {
      setMessageHandler('Please enter food item name and quantity!');
    }
  };

  const handleRemove = (e) => {
    setFoods(foods.filter( el => `${el.foodItem + el.id}` !== e.target.name));
  };

  const handleAddtoDB = (meal) => {
    try {
      validateMeal(meal);
      addMealToDB(user.username, meal);
      meal.foods.forEach((food) => {
        updateDailyCalsGetter(user.username).then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, food.cal).catch(console.error));
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
    } catch (err) {
      setMessageHandler(err.message);
    }
  };

  return (
    <Grid 
      container direction="column" justifyContent="space-between" 
      alignItems="center" alignSelf="left" sx={styles.form}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="foods-input" name="foods" size="small" label="food item" value={item}
            type="text" onChange={handleFoodItemChange} fullWidth variant="standard" 
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{!message.includes('food')? null : <em>{message}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="quantity-input" name="quantity" label="quantity" type="number"
            value={grams} onChange={handleQuantityChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">gr</InputAdornment>,
            }}
            fullWidth variant="standard" size="small"
          />
          <FormHelperText id="quantity-error-text" sx={{ color:'#D81159' }}>{!message.includes('quantity')? null : <em>{message}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD ITEM
          </Button>
        </Grid>
      </Grid>

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
          <CustomRadioGroupForm name={'type'} value={type} 
            onChangeFunc={handleTypeChange} labels={MEAL_TYPES} error={!message.includes('type')? null: message}/>
        </Grid>
                        
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            id="title-input" name="title" label="title" type="text"
            value={title} onChange={handleTitleChange}
            fullWidth variant="standard" size="small"
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{!message.includes('title')? null: <em>{message}</em>}</FormHelperText>
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
