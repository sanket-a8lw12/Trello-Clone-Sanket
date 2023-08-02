import React from 'react'
import TrelloCard from './TrelloCard'
import "./Trello.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

export default function Trello({ trelloData, handleClick }) {

  const cardStyle = {
    backgroundColor: "lightgrey",
    backgroundImage: "url(https://images.pexels.com/photos/2238886/pexels-photo-2238886.jpeg?auto=compress&cs=tinysrgb&w=600)",
    backgroundSize: "cover",
    color: "white",
    borderRadius: "0.4em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "3px solid black",
    width: "14em",
    height: "6em",
  };

  const [textValue, setTextValue] = React.useState('');

  const handleChange = (name) => {
    setTextValue(name);
  };

  return (
    <div className='trello'>
      <div className='trelloInfo' >
        {trelloData.map((data) => {
          return < TrelloCard
            key={data.name}
            // image={data.purfs.backgroundImage}
            cardName={data.name}
            id={data.id} />
        })}


        <Card>
          <CardContent style={cardStyle}>
            <Typography variant="h6">
              <TextField
              sx={{backgroundColor: "white"}}
                label="Enter Board Name"
                variant="outlined"
                onChange={(event) => handleChange(event.target.value)}
              />
            </Typography>
            <Button onClick={() => handleClick(textValue)}
            variant="contained" 
            size="medium" 
            sx={{ width: '9em', 
            mt: 2,
             marginLeft: "3.5em"}}>

              Add Board

            </Button>
          </CardContent>
        </Card>
        
      </div>
    </div >
  )
}
