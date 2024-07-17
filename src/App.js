import './styles/App.css';
//import components
import AllCharacters from './pages/allCharacters'
import SingleCharacter from './pages/singleCharacter';
import Form from './pages/Form';
//import hooks
import { useState, useEffect, useCallback } from 'react'
//import components from React Router
import { Route, Routes } from 'react-router-dom'

function App() {
  //our API URL
  const apiURL= `http://localhost:8000`
  
  const [characters, setCharacters] = useState([]);

  //functions
  // const getCharacters = async() => {
  //   const response = await fetch(apiURL + '/characters/')
  //   const data = await response.json()
  //   console.log(data)
  //   setCharacters(data)
  // }
  const getCharacters = useCallback(async () => {
    try {
      const response = await fetch(apiURL + '/characters/');
      const data = await response.json();
      console.log(data);
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }, [apiURL]);
  

  // const handleFormSubmission = async (data, type) => {
  //   if(type === 'new') { 
  //     await fetch(`${apiURL}/characters/`, {
  //       method: 'post', 
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data)
  //     })
  //     getCharacters()
  //   } else if (type !== 'new'){
  //     await fetch(`${apiURL}/characters/${data.id}/`, {
  //       method: 'put',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data)
  //     })
  //     getCharacters()
  //   }
  // }
  const handleFormSubmission = async (data, type) => {
    try {
      if (type === 'new') { 
        await fetch(`${apiURL}/characters/`, {
          method: 'post', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        getCharacters();
      } else if (type !== 'new' && data.id) { // Ensure data.id is defined
        await fetch(`${apiURL}/characters/${data.id}/`, {
          method: 'put',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        getCharacters();
      } else {
        console.error('Invalid data.id:', data.id);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
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
  }, [getCharacters])

  return (
    <div class="App">
      <h1 className='text-6xl'>Tekken 7 Characters</h1>
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
          element={<Form characters={characters} handleSubmit={handleFormSubmission} buttonLabel='Add Character' formType='new'/>}
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
