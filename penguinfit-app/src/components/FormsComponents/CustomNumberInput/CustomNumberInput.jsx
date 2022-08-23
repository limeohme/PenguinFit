import { FormHelperText, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const stylesNumInput = {
  helperText: {
    color: '#D81159',
    fontStyle: 'italic'
  }
};
  
const CustomNumberInput = ({ name, label, value, handler, error }) => {
  const [negativeErr, setNegativeErr] = useState(null);

  const toPositiveNumber = (e) => {

    const numValue = parseInt(e.target.value);

    if(numValue < 0){
      setNegativeErr({ msg: 'only positives' });
      return;
    }else{
      setNegativeErr(null);
    }

    const val = Number.isNaN(numValue)? '' : numValue;
    
    handler(e, name, val);
  };
  
  return (
    <>
  
      <TextField
        type="number"
        id={`${name}-input`}
        name={name}
        label={label}
        value={value}
        onChange={(e) => toPositiveNumber(e)}
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>,
        }}
        fullWidth
        size="small"
        variant="standard"
      />

      <FormHelperText id={`${name}-error-neg`} sx={stylesNumInput.helperText}>
        {negativeErr?.msg}
      </FormHelperText>

      <FormHelperText id={`${name}-error`} sx={stylesNumInput.helperText}>
        {error?.msg}
        {/* {Number.isNaN(value)? error?.msg : null} */}
      </FormHelperText>

    </>
 
  );
};
  
export default CustomNumberInput;