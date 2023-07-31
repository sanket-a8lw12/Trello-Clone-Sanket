import React from 'react'
import TrelloCard from './TrelloCard'
import "./Trello.css"
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Trello({ trelloData }) {
  const [textValue, setTextValue] = React.useState('');

  const handleChange = (name) => {
    // console.log("POSTKKK")
    setTextValue(name);
  };


  async function handleClick(name) {
    const url = 'https://api.trello.com/1/boards/';
    const params = {
      name: name,
      key: '7d88baae66e0dbda0675ce6fbb6b1aa8',
      token: 'ATTA31f0431674540d74dfa25400a6d53fcd457d38bdb6067c796929effcc92bc0a5B9968DA5',
    };

    await axios.post(url, null, { params: params });
  }



  return (
    <div className='trello'>
      <div className='trelloInfo'>
        {trelloData.map((data) => {
          return < TrelloCard key={data.name} cardImage={data.prefs.backgroundImage}
            cardName={data.name} id={data.id}/>
        })}
        


        <div className='createNewcard'>
          <div className='trelloCard' >
            Create New
            <Box
              margin="1em"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <Typography>
                <TextField
                  label="Text Input"
                  variant="outlined"
                  onChange={(event) => handleChange(event.target.value)}
                />
              </Typography>
              <Button variant="contained" onClick={() => handleClick(textValue)} color="success">
                Create
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div >
  )
}
