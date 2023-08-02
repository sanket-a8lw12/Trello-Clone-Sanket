// import React from 'react'
// import "./TrelloCard.css"
// import { Link } from 'react-router-dom';

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

export default function TrelloCard({ cardName, id}) {
  const cardStyle = {
    backgroundColor: "lightgrey",
    backgroundImage: "url(https://images.pexels.com/photos/260877/pexels-photo-260877.jpeg?auto=compress&cs=tinysrgb&w=600)",
    backgroundSize: "cover",
    color: "white",
    borderRadius: "0.4em",
    display: "flex",
    justifyContent: "center",
    border: "3px solid black",
    width: "14em",
    height: "6em",
  };

  return (
    <Link to={`/trelloCardList/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6">
            <b>{cardName}</b>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}





