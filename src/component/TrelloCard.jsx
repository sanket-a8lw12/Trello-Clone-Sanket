import React from 'react';
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
    minWidth: "14em",
    minHeight: "6em",
  };

  return (

      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6">
            <b>{cardName}</b>
          </Typography>
        </CardContent>
      </Card>
  );
}





