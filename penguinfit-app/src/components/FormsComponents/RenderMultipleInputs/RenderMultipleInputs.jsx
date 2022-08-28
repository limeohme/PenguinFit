import { Grid } from '@mui/material';
import CustomInput from '../CustomInput/CustomInput';

const RenderMultipleInputs = ( { array, gridItemXS, form, handler, error } ) => {

  return (
    array.length
      ? array.map((el)=>{
        return (
          <Grid item xs={gridItemXS} key={el.name}>
            <CustomInput 
              type={el.type}
              name={el.name}
              label={el.label}
              value={form[el.name]}
              handler={handler}
              error={error}
              adornment={el.adornment}
            />
          </Grid>
        );
      })

      :null
  );
};

export default RenderMultipleInputs;