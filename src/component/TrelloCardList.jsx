import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListCard from './ListCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, CardContent, Typography } from '@mui/material';
const {VITE_KEY, VITE_TOKEN} = import.meta.env;

export default function TrelloCardList() {


  const [listBoard, setListBoard] = useState([]);

  const [cardName, setCardName] = useState("");

  const { id } = useParams();

  const url = `https://api.trello.com/1/boards/${id}/lists?key=7d88baae66e0dbda0675ce6fbb6b1aa8&token=ATTA31f0431674540d74dfa25400a6d53fcd457d38bdb6067c796929effcc92bc0a5B9968DA5`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((boardList) => {
        setListBoard(boardList);
      });
  }, []);

  const cardStyle = {
    backgroundColor: "lightgrey",
    // backgroundImage: `url(${cardImage})`,
    backgroundSize: "cover",
    color: "white",
    borderRadius: "0.4em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "3px solid black",
    minWidth: "15em",
    height: "7em",
  };


  const handleCardChange = (name) => {
    setCardName(name);
  }

  async function handleAddCard(cardname){
    const url = `https://api.trello.com/1/boards/${id}/lists?name=${cardname}&key=${VITE_KEY}&token=${VITE_TOKEN}`;
    let newList = await axios.post(`${url}`);
    setListBoard([...listBoard, newList]);
  }

  return (
    <div style={{
      display: "flex",
      paddingTop: "5em",
      gap: "1em",
      overflowX: "auto",
      height: "85vh"
    }}>

      {listBoard.map((data) => {
        return < ListCard key={data.name}
          name={data.name} id={data.id} setListBoard={setListBoard}/>
      })}

      <Card style={cardStyle}>
        <CardContent >
          <Typography variant="h6">
            <TextField sx={{ height: "2em" }}
              label="Enter List Name"
              variant="outlined"
            onChange={(event) => handleCardChange(event.target.value)}
            />
          </Typography>
          <Button onClick={()=> handleAddCard(cardName)}
            variant="contained"
            size="medium"
            sx={{
              width: '9em',
              height: "2em",
              mt: 2,
              marginLeft: "2.5em"
            }}>

            Add List

          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
