import { useState } from 'react';
import { FormHelperText, InputAdornment, TextField } from '@mui/material';
import { getAdornment } from '../../../utils/utils';

const stylesNumInput = {
  helperText: {
    color: '#D81159',
    fontStyle: 'italic'
  }
};
const MAX_INPUT_LENGTH = 10;
  
const CustomNumberInput = ({ type, name, label, value, handler, error, adornment, maxInputLength = MAX_INPUT_LENGTH }) => {
  // add strError, rename negativeErr to numError 
  // - better use only one depending which one gets validated
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

  // change name
  const formatInput = (e) => {

    // add strValue
    const strValue = e.target.value;
    const numValue = parseInt(strValue);

    // to validateNum() and validateStr()
    // if(numValue < 0){
    //   setInputErr({ msg: 'only positives' });
    //   return;
    // }else{
    //   setInputErr(null);
    // }

    // return num or str from validateNum() and validateStr()
    const val = Number.isNaN(numValue)
      ? validateStr(strValue) 
      : validateNum(numValue);
    
    handler(e, name, val);
  };
  
  return (
    <>
  
      {/* add dynamic type */}
      {/* reformat details object */}
      
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
  
export default CustomNumberInput;