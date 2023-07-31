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


  // console.log(trelloData);

  // trelloData.map((item) => {
  //   console.log("----------------")
  //   console.log(item.prefs.backgroundImage);
  // })

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Trello trelloData={trelloData}/>
          </>
          }/>

          <Route path="/trelloCardList/:id" element={
            
            <>
             <Header />
            <TrelloCardList />
            </>
          }/>
      </Routes >


    </>
  )
}

export default App
