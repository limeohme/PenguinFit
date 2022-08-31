import { Autocomplete, FormHelperText, TextField } from '@mui/material';
// import { useState } from 'react';

const stylesAutocomplete = {
  helperText: {
    color: '#D81159',
    fontStyle: 'italic'
  }
};

const CustomAutocomplete = ({ name, label, value, options, handler, error }) => {
//   const [error, setError] = useState(null);

  return (
    // <Grid item xs={8}>
    <>

      <Autocomplete
        id={name}
        value={value} 
        options={options}
        clearIcon={null}
        onOpen={(e) => e.target.value = ''}
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
        onChange={(event, val) => handler(event, name, val)}
        onInputChange={(event, val) => handler(event, name, val)}
        renderInput={(params) => <TextField 
          {...params} 
          fullWidth 
          size="small" 
          variant="standard" 
          label={label} 
        />}
      />


      <FormHelperText id={`${name}-error`} sx={stylesAutocomplete.helperText}>
        {error?.msg}
      </FormHelperText>
    </>
      

  // </Grid>
  );
};

export default CustomAutocomplete;