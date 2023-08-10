import { Height, Padding } from '@mui/icons-material';
import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import axios from "axios";
import CardData from './CardData';

const initialState = {
  addACard: '',
  cardData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ADD_A_CARD':
      return { ...state, addACard: action.payload };
    case 'SET_CARD_DATA':
      return { ...state, cardData: action.payload };
    default:
      return state;
  }
}

export default function ListCard({ name, id }) {



  // console.log("ListCard = " + id);

  // const [addACard, setAddACard] = useState("");

  // const [cardData, setCardData] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { addACard, cardData } = state;


  const cardStyle = {
    backgroundColor: "black",
    backgroundSize: "cover",
    color: "white",
    borderRadius: "0.4em",
    display: "flex",
    justifyContent: "center",
    border: "3px solid black",
    minWidth: "15em",
    // flexWrap: "wrap",
  };



  const url = `https://api.trello.com/1/lists/${id}/cards?key=${VITE_KEY}&token=${VITE_TOKEN}`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        return response.data
      }).then((trello) => {
        // setCardData(trello);
        dispatch({ type: 'SET_CARD_DATA', payload: trello });
      }).catch((error) => {
        console.error(error);
      })
  }, [])

  //function to set name and add new card

  function handleAddACardName(name) {
    // setAddACard(name);
    dispatch({ type: 'SET_ADD_A_CARD', payload: name });
  }

  async function handleAddACard(name) {
    const url = 'https://api.trello.com/1/cards';
    let newCard = await axios.post(`${url}?name=${name}&idList=${id}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
    console.log("newCard.data = " + newCard.data, cardData)
    // setCardData([...cardData, newCard.data])
    // setAddACard('');
    dispatch({ type: 'SET_CARD_DATA', payload: [...cardData, newCard.data] });
    dispatch({ type: 'SET_ADD_A_CARD', payload: '' });
  }

  return (
    <div>

      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {name}
          </Typography>
          {cardData.filter((item) => {
            return item.idList === id;
          }).map((data) => {
            return <CardData key={data.id}
              id={data.id}
              name={data.name}
              setCardData={setCardData}
              cardData={cardData}
            />
          })

          }

          <Card>
            <CardContent sx={{
              display: "flex",
              gap: "1em"
            }}>
              <Typography variant="h6">
                <TextField sx={{
                  height: "1em",
                  width: '8em'
                }}
                  label="Add a Card"
                  variant="outlined"
                  onChange={(event) => handleAddACardName(event.target.value)} />  {/* name of the card */}

              </Typography>

              <Fab size="medium" color="secondary" aria-label="add"
                onClick={() => {
                  if (addACard) { handleAddACard(addACard) }
                }}  >  {/* Add a cards */}
                <AddIcon />   {/* Add button for the cards */}
              </Fab>
            </CardContent>
          </Card>


        </CardContent>
      </Card>
    </div>
  )
}


