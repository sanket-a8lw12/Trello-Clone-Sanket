import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './component/Header';
import Trello from './component/Trello';
import TrelloCardList from './component/TrelloCardList';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { setData, setError, addBoard } from './boardSlice';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;

function App() {
  const dispatch = useDispatch();
  const { trelloData, error, isLoaded } = useSelector((state) => state.board);

  const baseURL = `https://api.trello.com/1/members/me/boards?key=${VITE_KEY}&token=${VITE_TOKEN}`;

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        dispatch(setData(response.data));
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setError(error.message));
      });
  }, [dispatch]);

  async function handleClick(name) {
    const url = 'https://api.trello.com/1/boards';
    try {
      const response = await axios.post(`${url}?name=${name}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
      dispatch(addBoard(response.data));
    } catch (error) {
      console.error(error.message);
    }
  }

  if (error !== '') {
    return <h2>{error}</h2>;
  }

  return (
    <>
      {!isLoaded ? (
        <h2 id="Loading">Loading the data...</h2>
      ) : (
        <div>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Trello trelloData={trelloData} handleClick={handleClick} />
                </>
              }
            ></Route>
            <Route
              path="/trelloCardList/:id"
              element={
                <>
                  <TrelloCardList />
                </>
              }
            ></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;

