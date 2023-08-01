import { useState, useEffect } from 'react'

import './App.css'
import Header from './component/Header'
import Trello from './component/Trello';

import axios from "axios";

import {
  Route,
  Routes
} from "react-router-dom";

import TrelloCardList from './component/TrelloCardList';

function App() {

  const [trelloData, setTrelloData] = useState([]);

  const baseURL = 'https://api.trello.com/1/members/me/boards?key=7d88baae66e0dbda0675ce6fbb6b1aa8&token=ATTA31f0431674540d74dfa25400a6d53fcd457d38bdb6067c796929effcc92bc0a5B9968DA5';



  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        return response.data
      }).then((trello) => {
        setTrelloData(trello);
      }).catch((error) => {
        console.error(error);
      })
  }, [])



  async function handleClick(name) {
    const url = 'https://api.trello.com/1/boards/';
    const params = {
      name: name,
      key: '7d88baae66e0dbda0675ce6fbb6b1aa8',
      token: 'ATTA31f0431674540d74dfa25400a6d53fcd457d38bdb6067c796929effcc92bc0a5B9968DA5',
    };

    let newBoard = await axios.post(url, null, { params: params });
    setTrelloData([...trelloData, newBoard])
  }


  return (
    <>
    <Header />
      <Routes>

        <Route path="/" element={
          <>
            <Trello trelloData={trelloData} handleClick={handleClick} />
          </>
        }>
        </Route>
        <Route path="/trelloCardList/:id" element={

          <>  
            <TrelloCardList />
          </>
        }>
        </Route>
      </Routes >


    </>
  )
}

export default App
