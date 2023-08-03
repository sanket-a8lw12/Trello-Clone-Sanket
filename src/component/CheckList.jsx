// import React from 'react'

// export default function CheckList() {
//   return (
//     <div>CheckList</div>
//   )
// }


import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBox from './CheckBox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
const { VITE_KEY, VITE_TOKEN } = import.meta.env;

export default function CheckList({name, id}) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState();

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

  const handleClose = () => {
    setOpen(false);
    console.log("Clicked add")
    console.log(list);
  };



  return (
    <div>
      <Button onClick={handleClickOpen}>{name}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {/* {[...new Array(2)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}

              < CheckBox list={list}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
          <Fab color="primary" aria-label="add" onClick={handleClose}>
        <AddIcon />
      </Fab>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}