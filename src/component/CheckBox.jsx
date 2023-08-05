import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import axios from "axios";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function CheckBox({ list, setList, item, id}) {

  const [checkBoxName, setCheckBoxName] = React.useState('');

async function addCheckBox() {
  const url = 'https://api.trello.com/1/checklists/';
  let newCheckItem = await axios.post(`${url}${item.id}/checkItems?name=${checkBoxName}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
  console.log(newCheckItem);

}

function handleCheckBoxName(name){
  setCheckBoxName(name)
}

  return (
    <>
    <div style={{display: "flex", gap: "1em"}}>
    <TextField sx={{
      height: "1em",
      width: '10em',
    }}
      id='name'
      label="Enter CheckBox"
      variant="outlined"
      onChange={(event) => handleCheckBoxName(event.target.value)}
    />
    <Fab size="small" color="secondary" aria-label="add" onClick={() => addCheckBox()}>
      <AddIcon />
    </Fab>
    </div>

    {item.checkItems.map((checkBoxItem) => {
      return (
        <FormGroup key={checkBoxItem.name}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={checkBoxItem.name} />
        </FormGroup>
      )
    })}
    </>
  );
}