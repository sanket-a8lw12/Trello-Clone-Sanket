import { Height, Padding } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
export default function ListCard({name}) {


  const cardStyle = {
    backgroundColor: "grey",
    // backgroundImage: `url("${image}")`,
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
    <>
        
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h6">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}


