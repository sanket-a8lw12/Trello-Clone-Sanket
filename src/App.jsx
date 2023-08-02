import { useState, useEffect } from 'react'
import './App.css'
import Header from './component/Header'
import Trello from './component/Trello';

import axios from "axios";
import {
  Route,
  Routes
} from "react-router-dom";
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import TrelloCardList from './component/TrelloCardList';

function App() {

  const [trelloData, setTrelloData] = useState([]);

  const baseURL = `https://api.trello.com/1/members/me/boards?key=${VITE_KEY}&token=${VITE_TOKEN}`;

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
    const url = 'https://api.trello.com/1/boards';
    let newBoard = await axios.post(`${url}?name=${name}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
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
