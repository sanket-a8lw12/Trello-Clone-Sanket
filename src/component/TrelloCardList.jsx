
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrelloCard from './TrelloCard';
import ListCard from './ListCard';

export default function TrelloCardList() {
  const [listBoard, setListBoard] = useState([]);
  const { id } = useParams().id;

  const url = `https://api.trello.com/1/boards/${id}/lists?key=7d88baae66e0dbda0675ce6fbb6b1aa8&token=ATTA31f0431674540d74dfa25400a6d53fcd457d38bdb6067c796929effcc92bc0a5B9968DA5`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((boardList) => {
        setListBoard(boardList);
      });
  }, []); // Add an empty dependency array here

  return (
    <>
      {listBoard.map((data) => {
          return < ListCard key={data.name}/>
        })}
    </>
  );
}
