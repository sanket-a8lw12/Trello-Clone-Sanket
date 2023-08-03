import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import axios from "axios";
import CheckList from './CheckList';

export default function CardData({ id, name, setCardData, cardData }) {

  async function deleteCard(){
    // console.log(id);
    console.log("clicked on delete")
    const urlDelete = "https://api.trello.com/1/cards/"
    let newArr = await axios.delete(`${urlDelete}${id}?key=${VITE_KEY}&token=${VITE_TOKEN}`);
    // console.log(newArr)

    let newArray = cardData.filter((item)=>{
      // console.log(item.id);
      // console.log("id = " +id)
      // console.log("--------")
      return item.id !== id;
    })
    setCardData(newArray);
    
  }

  console.log(cardData);


  return (
    <Box sx={{
      '& > :not(style)': { m: 1 },
      display: "flex",
      justifyContent: "space-between",
      border: "2px solid black",
    }}>

      <Fab variant="extended" sx={{
        width: "14em"

      }}>
        <CheckList name={name} id={id}/>
      </Fab>
      <DeleteIcon onClick={() => deleteCard()}
      sx={{color: "red"}} />
    </Box>
  );
}

