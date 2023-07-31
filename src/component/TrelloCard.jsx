import React from 'react'
import "./TrelloCard.css"
import { Link } from 'react-router-dom';


export default function TrelloCard({cardImage, cardName, id}) {
    const cardStyle = {
        backgroundImage: `url(${cardImage})`,
        backgroundSize: "cover",
        color: "white",
        borderRadius: "1em",
        display: "flex",
        justifyContent: "center",
        border: "3px solid black"
      };
      function handleClick(){
        console.log("Deep")
      }

  return (
    <>
    <Link to={`/trelloCardList/${id}`}>
    <div className='trelloCard' style={cardStyle} onClick={handleClick}>
    <b>{cardName}</b>
    </div>
    </Link>
    </>
  )
}
