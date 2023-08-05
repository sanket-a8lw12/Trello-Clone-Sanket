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
  let newList = list.map((data)=>{
    if(data.id === item.id){
      data.checkItems = [...data.checkItems, newCheckItem.data];
    }
    return data;
  })

  setList([...newList]);

}

function handleCheckBoxName(name){
  setCheckBoxName(name)
}


//cards/${cardId}/checkItem/${event.target.id}?


function handleCheckItemState(event){

  const updateUrl = 'https://api.trello.com/1/'
  let newCheckItem = axios.put(`${updateUrl}cards/${id}/checkItem/${event.target.id}?&key=${VITE_KEY}&token=${VITE_TOKEN}`, {
    state: event.target.checked && 'complete' || 'incomplete'
  });
  console.log("new check item updated = "  + newCheckItem.data)

  let newUpdatedList = list.map((data)=>{
    if(data.id === item.id){
      console.log("data.check = " +data)
      data.checkItems = data.checkItems.map((checkItemData)=>{
        if(checkItemData.id === event.target.id){
          checkItemData.state = event.target.checked && 'complete' || 'incomplete';
        }
        return checkItemData;
      })
    }
    return data;
 
  })

  setList([...newUpdatedList]);


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

    {item && item.checkItems.map((checkBoxItem) => {
      // console.log(checkBoxItem);
      return (
        <FormGroup key={checkBoxItem.name}>
          <FormControlLabel control={<Checkbox id={checkBoxItem.id} checked ={checkBoxItem.state === 'complete'}
          onChange={handleCheckItemState}
          />} label={checkBoxItem.name} />
        </FormGroup>
      )
    })}
    </>
  );
}