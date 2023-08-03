import { Height, Padding } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import axios from "axios";
import CardData from './CardData';


export default function ListCard({ name, id }) {

  const [addACard, setAddACard] = useState("");

  const [cardData, setCardData] = useState([]);


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
        setCardData(trello);
      }).catch((error) => {
        console.error(error);
      })
  }, [])

  //function to set name and add new card

  function handleAddACardName(name) {
    setAddACard(name);
  }

  async function handleAddACard(name) {
    const url = 'https://api.trello.com/1/cards';
    let newCard = await axios.post(`${url}?name=${name}&idList=${id}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
    setCardData([...cardData, newCard.data])
    setAddACard('');
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
            return <CardData key={data.name}
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


