import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { addUserFriends } from '../../services/user-service';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FriendsAutocomplete({ username, notFriends }) {

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, value) => setSelectedOptions(value);

  return (
    <Autocomplete
      onChange={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          // Prevent's default 'Enter' behavior.
          event.defaultMuiPrevented = true;
          console.log(selectedOptions);
          addUserFriends(username, selectedOptions);
        }
      }}
      multiple
      size="small"
      id="friends-autocomplete"
      //   options={notFriends.map(el => el = { username: el })}
      options={notFriends.map(el => el = { username: el })}
      disableCloseOnSelect
      getOptionLabel={(option) => option.username}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.username}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Add friends" placeholder="Add friends" />
      )}
    />
  );
};