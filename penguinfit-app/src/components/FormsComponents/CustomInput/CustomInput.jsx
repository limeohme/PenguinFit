import { useState } from 'react';
import { getAdornment } from '../../../utils/utils';
import { FormHelperText, InputAdornment, TextField } from '@mui/material';

const stylesNumInput = {
  helperText: {
    color: '#D81159',
    fontStyle: 'italic'
  }
};

const MAX_INPUT_LENGTH = 10;
  
const CustomInput = ({ type, name, label, value, handler, error, adornment, maxInputLength = MAX_INPUT_LENGTH }) => {
  const [inputErr, setInputErr] = useState(null);
  const maxStrLength = maxInputLength;

  const validateNum = (num) => {
    if(num < 0){
      setInputErr({ msg: 'only positives' });
      return 0;
    }else{
      setInputErr(null);
      return num;
    }
  };

  const validateStr = (str) => {
    if(str.length > maxStrLength){
      setInputErr({ msg: `max ${maxStrLength} signs` });
      return '';
    }else{
      setInputErr(null);
      return str;
    }
  };

  const formatInput = (e) => {

    const strValue = e.target.value;
    const numValue = parseInt(strValue);

    const val = Number.isNaN(numValue)
      ? validateStr(strValue) 
      : validateNum(numValue);
    
    handler(e, name, val);
  };
  
  return (
    <>
      <TextField
        type={type}
        id={`${name}-input`}
        name={name}
        label={label}
        value={value}
        onChange={(e) => formatInput(e)}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            {adornment ?? getAdornment(name)}
          </InputAdornment>,
        }}
        fullWidth
        size="small"
        variant="standard"
      />

      <FormHelperText id={`${name}-error-neg`} sx={stylesNumInput.helperText}>
        {inputErr?.msg}
      </FormHelperText>

      <FormHelperText id={`${name}-error`} sx={stylesNumInput.helperText}>
        {error?.msg}
      </FormHelperText>
    </>
 
  );
};
  
export default CustomInput;