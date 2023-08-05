import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import { FormGroup, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from './CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBox from './CheckBox';


export default function CheckListPopUp({ name, id, cardData }) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");


  const listUrl = `https://api.trello.com/1/cards/${id}/checklists?key=${VITE_KEY}&token=${VITE_TOKEN}`;

  useEffect(() => {
    axios.get(listUrl)
      .then((response) => {
        return response.data
      }).then((listData) => {
        setList(listData);
      }).catch((error) => {
        console.error(error);
      })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleListName(name) { // function to set the name on list
    console.log("name clicked " + name);
    setListName(name);
  }

  function handList() {
    setOpen(false);
  }


  async function deleteCheckList(ID) {
    const deleteUrl = "https://api.trello.com/1/checklists/";
    await axios.delete(`${deleteUrl}${ID}?key=${VITE_KEY}&token=${VITE_TOKEN}`)

    let newList = list.filter((item) => {
      return item.id !== ID;
    })
    setList(newList);
  }






  async function handleAddList(listName) {
    console.log("Clicked add" + listName)
    const url = "https://api.trello.com/1/checklists?";
    let newCheckList = await axios.post(`${url}&name=${listName}&idCard=${id}&key=${VITE_KEY}&token=${VITE_TOKEN}`)
    setList([...list, newCheckList.data]);
  }

  console.log("List data")
  console.log(list)


  return (
    <div>
      <Button onClick={handleClickOpen}>{name}</Button>
      <Dialog
        open={open}
      
        scroll='body'
        sx={{ backgroundColor: "grey" }}
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center", }}>{name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}
          sx={{ width: "em" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            sx={{ textAlign: "center" }}
          >

            {list.map((item) => {
              return < Box sx={{
                '& > :not(style)': { m: 1 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }} key={item.name}>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Fab variant="extended" sx={{
                    width: "14em"
                  }} >
                    {item.name}
                  </Fab>



                  <DeleteIcon onClick={() => deleteCheckList(item.id)}
                    sx={{ color: "red" }} />
                </div>

                  < CheckBox list={list} setList={setList} item={item}  id={id}/>


              </Box>
            })}

          </DialogContentText>
        </DialogContent>

        <form onSubmit={(event) => {
          console.log('submited');
          event.preventDefault();
          handleAddList(event.target.name.value)
        }}>
          <Typography variant="h6"
            sx={{
              padding: "1em", display: "flex", gap: "1em",
            }}
          >
            <TextField sx={{
              height: "1em",
              width: '10em',
            }}
              id='name'
              label="Enter CheckList Name"
              variant="outlined"
            />

            <Fab color="primary" aria-label="add" type='submit'>
              <AddIcon />
            </Fab>

          </Typography>
          <DialogActions>
            <Button onClick={() => handList()}>Cancel</Button>
          </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}