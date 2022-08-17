import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function FriendsAutocomplete() {
  return (
    <Autocomplete
      multiple
      size="small"
      id="friends-autocomplete"
      options={users}
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
}
  
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const users = [
  { username: 'Stawri' },
  { username: 'VankoU' },
  { username: 'Pesho' },
];