import React from "react"
import {Link, useNavigate} from 'react-router-dom'

const nameStyle = {
  color: '#006643',
}

const Character = ({character, deleteCharacter}) => {
  const navigate = useNavigate()

  const handleDelete = (event) => {
    event.preventDefault()
    deleteCharacter(character.id)
    navigate('/')
  }
  return (
    <div>
      <img src={character.image} alt={character.name} style={{ width: 100, height: 100, borderRadius: '50%' }} />
      <Link to={`/characters/${character.id}`}>
        <h1 style={nameStyle}>{character.name}</h1>
      </Link>
     

      <form onSubmit={handleDelete}>
        <input type='submit' value='Delete' />
      </form>
    </div>
  )
}

export default Character