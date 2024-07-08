import './App.css';
//import components
import AllCharacters from './pages/allCharacters'
import SingleCharacter from './pages/singleCharacter';
import Form from './pages/Form';
//import hooks
import { useState, useEffect } from 'react'
//import components from React Router
import { Route, Routes } from 'react-router-dom'

function App() {
  //our API URL
  const apiURL = 'http://localhost:8000/'
  
  const [characters, setCharacters] = useState([]);

  //functions
  const getCharacters = async() => {
    const response = await fetch(apiURL + '/characters/')
    const data = await response.json()
    console.log(data)
    setCharacters(data)
  }

  const handleFormSubmission = async (data, type) => {
    if(type === 'new') { 
      await fetch(`${apiURL}/characters/`, {
        method: 'post', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getCharacters()
    } else {
      await fetch(`${apiURL}/characters/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getCharacters()
    }
  }

  const deleteCharacter = async (id) => {
    await fetch(`${apiURL}/characters/${id}/`,
    {
      method: 'delete'
    })
    getCharacters()
  }
  
  //useEffect
  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <div className="App">
      <h1>Characters</h1>
      <Routes>
      <Route
          exact 
          path ="/"
          element={<AllCharacters characters={characters} deleteCharacter={deleteCharacter} />}
        />
        <Route
          exact
          path = '/characters/:id'
          element={<SingleCharacter characters={characters} />}
        />
        <Route
          exact
          path = '/new'
          element={<Form characters={characters} handlesubmit={handleFormSubmission} buttonLabel='Add Character' formType='new'/>}
        />
        <Route
          exact 
          path ="edit/:id"
          element={<Form characters={characters} handleSubmit={handleFormSubmission} buttonLabel='Edit Character' formType='edit' />}
        />
      </Routes>
    </div>
  );
}

export default App;
