import { Autocomplete, Checkbox, Grid, TextField, Button } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { sendFriendRequest } from '../../services/friends-service';
// import { addUserFriends } from '../../services/user-service';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FriendsAutocomplete({ username, notFriends }) {

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = () => {
    selectedOptions.forEach(el => sendFriendRequest(username, el));
    setSelectedOptions([]);
  };
  const handleChange = (event, value) => setSelectedOptions(value);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      handleSubmit();
    }
  };
  return (
    <Grid 
      container
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={1.5}
    >
      <Grid item xs={9} sm={9}>
        <Autocomplete
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event)}
          value={selectedOptions}
          multiple
          size="small"
          id="friends-autocomplete"
          options={notFriends}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ minWidth: '15rem' }}
          renderInput={(params) => (
            <TextField {...params} label="Add friends" placeholder="Add friends" />
          )}
        />
      </Grid>
      <Grid item xs={3} sm={3}>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}  >Add</Button>
      </Grid>
    </Grid>
  );
};