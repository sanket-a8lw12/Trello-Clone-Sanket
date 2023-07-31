import { Height } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';

export default function ListCard() {
  const cardStyle = {
    color: "white",
    borderRadius: "1em",
    display: "flex",
    justifyContent: "center",
    border: "3px solid black",
    Height: "2em",
    width: "4em"
  };
  function handleClick() {
    console.log("Deep")
  }
  return (
    <>
      <Link to={`/trelloCardList/${id}`}>
        <div className='trelloCard' style={cardStyle} onClick={handleClick}>
        </div>
      </Link>
    </>
  )
}
