import { Button, FormHelperText, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { MEAL_TYPES } from '../../../common/constants';
import AppState from '../../../providers/app-state';
import { addMealToDB, getFoodItemData, updateDailyCalsGetter, updateDailyCalsUpdater, updateUserNutrients } from '../../../services/meals-service';
import { formatDateToString } from '../../../utils/utils';
import CustomRadioGroupForm from '../../CustomRadioGroupForm/CustomRadioGroupForm';
import CustomAutocomplete from '../CustomAutocomplete/CustomAutocomplete';
import { validateMeal } from './meal-form-validations';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';


const styles = {
  inputs: {
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
  const [item, setItem] = useState('');
  const [itemState, setItemState] = useState('');
  const [grams, setGrams] = useState('');
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
    val && val >= 1 ? setGrams(+val): setGrams(val);
  };

  const handleFoodStateChange = (_e, _name, val) => {
    setItemState(val);
  };
  const handleMealDetailsChange  = (e, name, val) => {
    if (e.target.name === 'title'){
      val = e.target.value;
      name = e.target.name;
    }
    
    setMealObj({ ...mealObj, [name]: val });    
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
        const foodItemObject = await getFoodItemData(`${itemState} ${item}`.trim(), grams);
        const zeID = mealObj.foods.length;
        setMealObj({ 
          ...mealObj, 
          foods: [...mealObj.foods, 
            { ...foodItemObject, quantity: grams, id: zeID }], cal: mealObj.cal + foodItemObject.cal });
        setItem(''); setGrams(''); setItemState('');
      } catch (err) {
        console.error(err);
        setMessageHandler('Ooops... We don\'t recognize this food item!');
      }      
    } else {
      setMessageHandler('Please enter food item name and quantity!');
    }
  };

  
  const handleAddtoDB = (meal) => {
    try {
      validateMeal(meal);
      addMealToDB(user.username, meal);
      updateDailyCalsGetter(user.username).then((snapshot) => updateDailyCalsUpdater(snapshot, user.username, meal.cal).catch(console.error));
      
      updateUserNutrients(user.username, meal.foods).catch(console.error);

      
      setMealObj({ ...mealObj, title: '', type: '', foods: [] });
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
  
  const handleRemove = (e) => {
    setMealObj({ ...mealObj, foods: mealObj.foods.filter( el => `${el.foodItem + el.id}` !== e.target.name) });
  };
  
  return (
    <Grid 
      container direction="column" justifyContent="space-between" 
      alignItems="center" alignSelf="left" sx={styles.form}>
      <Grid container spacing={2}>
        <Grid item xs={3.5}>
          <CustomAutocomplete name={'food-state'} label={'raw or cooked'} value={itemState}
            handler={handleFoodStateChange} options={['raw', 'cooked']} 
            error={!itemState? { msg: 'raw unless specified.' }: null}/>
        </Grid>
        <Grid item xs={3.5}>
          <TextField
            id="foods-input" name="foods" size="small" label="food item" value={item}
            type="text" onChange={handleFoodItemChange} fullWidth variant="standard" 
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{!message.includes('food')? null : <em>{message}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={3.5}>
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
        <Grid item xs={1.5} sx={{ display:'flex', alignItems: 'start', justifyContent: 'center' }}>
          <CustomTooltip title="add item" arrow>
            <AddCircleIcon variant="contained" color="primary" onClick={handleAdd} sx={{ width: '100%', mt: 2, cursor: 'pointer' }} />
          </CustomTooltip>
        </Grid>
      </Grid>

      <Grid container direction="column-reverse" spacing={2}>
        <Grid item xs={12}>
          <CustomRadioGroupForm name={'type'} value={mealObj.type} 
            onChangeFunc={handleMealDetailsChange} labels={MEAL_TYPES} error={!message.includes('type')? null: message}/>
        </Grid>
        {mealObj.foods.map((el, index) => {
          return ( <Grid item xs key={index}>
            <Typography key={index}>{`${el.foodItem} | ${el.quantity} gr.` }
              <Button variant='text' size='small' name={el.foodItem+el.id} onClick={handleRemove}>x</Button>
            </Typography>
          </Grid>
          );
        })}
                        
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            id="title-input" name="title" label="title" type="text"
            value={mealObj.title} onChange={handleMealDetailsChange}
            fullWidth variant="standard" size="small"
          />
          <FormHelperText id="duration-error-text" sx={{ color:'#D81159' }}>{!message.toLowerCase().includes('title')? null: <em>{message}</em>}</FormHelperText>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant='contained' color="primary" onClick={() => handleAddtoDB(mealObj)} sx={{ width: '100%', boxSizing: 'border-box' }}>
            ADD
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MealForm;
