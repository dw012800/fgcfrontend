import React from "react"
import {useMemo, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

const Form = (props) => {
  const navigate = useNavigate()
  const params = useParams()

  // Will get current post here for edit
const currentCharacter = useMemo(() => props.characters.find(character => character.id === parseInt (params.id)), [params.id, props.characters])

  const [formData, setFormData] = useState(
    props.formType === 'new' ? {
      name: '',
      details: '',
    } : {
      name: currentCharacter.name, 
      details: currentCharacter.details, 
      id: parseInt(currentCharacter.id)
    }
  )

  const handleChange = (event) => {
    setFormData((prev) => (
    {
      ...prev,
      [event.target.name]: event.target.value
    }
  ))
  }

  const handleSubmission = (event) => {
    event.preventDefault()
    props.handleSubmit(formData, props.formType)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmission}>
      <h3>Title</h3>
      <input 
        type='text'
        onChange={handleChange}
        value={formData.name}
        name='name'
      />
      <h3>Body</h3>
      <input 
        type='text'
        onChange={handleChange}
        value={formData.details}
        name='details'
      />
      <input type='submit' value={props.buttonLabel} /> 
    </form>
  )
}

export default Form