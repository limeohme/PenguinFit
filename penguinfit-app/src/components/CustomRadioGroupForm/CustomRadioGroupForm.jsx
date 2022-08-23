import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';



export default function CustomRadioGroupForm ({ name, value, onChangeFunc, labels = [], error }) {

  return ( 
    <FormControl>
      {/* <FormLabel>Type</FormLabel> */}
      <RadioGroup
        name={name}
        value={value}
        onChange={onChangeFunc}
        row
        sx={{ justifyContent: 'left', alignSelf:'center' }}
      >
        { labels.map((label) => {
          return <FormControlLabel
            key={label}  
            value={label}  
            control={<Radio size="small" />}
            label={label}        
          />;
        })
        }
      </RadioGroup>
      <FormHelperText id="type-error-text" sx={{ color:'#D81159' }}>{<em>{error? error:''}</em>}</FormHelperText>
    </FormControl>
  );
}