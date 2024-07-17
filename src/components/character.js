import React from "react"
import {Link, useNavigate} from 'react-router-dom'
import '../styles/char.css'



const Character = ({character, deleteCharacter}) => {
  const navigate = useNavigate()

  const handleDelete = (event) => {
    event.preventDefault()
    deleteCharacter(character.id)
    navigate('/')
  }
  return (

    <div className='mt-10 border-2 border-black w-36 h-30'>
      <img className= 'w-32 h-29' src={character.image} alt={character.name} />
      <Link to={`/characters/${character.id}`}>
        <h1 className="text-green-600 underline">{character.name}</h1>
      </Link>
     

      <form  className='border-2 border-black border-b-0 bg-red-500'onSubmit={handleDelete}>
        <input type='submit' value='Delete' />
      </form>

    </div>

  )
}

export default Character