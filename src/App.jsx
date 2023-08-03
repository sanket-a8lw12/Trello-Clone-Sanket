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
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const baseURL = `https://api.trello.com/1/members/me/boards?key=${VITE_KEY}&token=${VITE_TOKEN}`;

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        return response.data
      }).then((trello) => {
        setTrelloData(trello);
        setIsLoaded(true);
      }).catch((error) => {
        console.error(error.message);
        setError(error.message);
      })
  }, [])



  async function handleClick(name) {
    const url = 'https://api.trello.com/1/boards';
    let newBoard = await axios.post(`${url}?name=${name}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
    setTrelloData([...trelloData, newBoard])
  }


  if (error !== '') {
    return <h2>{error}</h2>
  }


  return (
    <>
      {!isLoaded ?
        <h2 id='Loading'>Loading the data...</h2> :
        <div>
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
        </div>
      }

    </>
  )
}

export default App
