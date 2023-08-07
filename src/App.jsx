import { useReducer, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import Trello from './component/Trello';
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import TrelloCardList from './component/TrelloCardList';


const { VITE_KEY, VITE_TOKEN } = import.meta.env;

const initialState = {
  trelloData: [],
  error: '',
  isLoaded: false,
};

const actionTypes = {
  SET_TRELLO_DATA: 'SET_TRELLO_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_IS_LOADED: 'SET_IS_LOADED',
};

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_TRELLO_DATA:
      return { ...state, trelloData: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_IS_LOADED:
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const baseURL = `https://api.trello.com/1/members/me/boards?key=${VITE_KEY}&token=${VITE_TOKEN}`;

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        dispatch({ type: actionTypes.SET_TRELLO_DATA, payload: response.data });
        dispatch({ type: actionTypes.SET_IS_LOADED, payload: true });
      })
      .catch((error) => {
        console.error(error.message);
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      });
  }, []);

  async function handleClick(name) {
    const url = 'https://api.trello.com/1/boards';
    try {
      let response = await axios.post(`${url}?name=${name}&key=${VITE_KEY}&token=${VITE_TOKEN}`);
      let newBoard = response.data; // Access the data property of the response object
      dispatch({ type: actionTypes.SET_TRELLO_DATA, payload: [...state.trelloData, newBoard] });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  }

  if (state.error !== '') {
    return <h2>{state.error}</h2>
  }

  return (
    <>
      {!state.isLoaded ?
        <h2 id='Loading'>Loading the data...</h2> :
        <div>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Trello trelloData={state.trelloData} handleClick={handleClick} />
              </>
            }>
            </Route>
            <Route path="/trelloCardList/:id" element={
              <>
                <TrelloCardList />
              </>
            }>
            </Route>
          </Routes>
        </div>
      }
    </>
  );
}

export default App;
