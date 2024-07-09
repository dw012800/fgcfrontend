import React from "react"
import Character from "../components/character"
import {Link} from "react-router-dom"

const AllCharacters = (props) => (
  <>
    <Link to='/new'>
      <button className="border-2 border-black mt-4">Add a Character</button>
    </Link>
    {props.characters.map(
      (character)=> <Character character={character} key={character.name} deleteCharacter={props.deleteCharacter}/>
    )}
  </>


  
  )

export default AllCharacters