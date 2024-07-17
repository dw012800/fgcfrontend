import React from "react"
import {useMemo, useState} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"

import './pages.css'

const Form = (props) => {
  const navigate = useNavigate()
  const params = useParams()

  // Will get current post here for edit
const currentCharacter = useMemo(() => props.characters.find(character => character.id === parseInt (params.id)), [params.id, props.characters])

  const [formData, setFormData] = useState(
    props.formType === 'new' ? {
      name: '',
      details: '',
      image: '',
    } : {
      name: currentCharacter.name, 
      details: currentCharacter.details, 
      image: currentCharacter.image,
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
    <form className='flex flex-col items-center' onSubmit={handleSubmission}>
      <h3 className="mt-4">Name</h3>
      <input className="border-2 border-black w-15"
        type='text'
        onChange={handleChange}
        value={formData.name}
        name='name'
      />
      <h3 className="mt-4">Details</h3>
      <input className="border-2 border-black h-20 w-3/4"
        type='text'
        onChange={handleChange}
        value={formData.details}
        name='details'
      />
      <h3 className="mt-4">ImageURL</h3>
      <input className="border-2 border-black h-20 w-3/4"
        type='text'
        onChange={handleChange}
        value={formData.image}
        name='image'
      />
      <input className='w-35 mt-4 border-2 border-black'type='submit' value={props.buttonLabel} /> 

      <Link className='w-20 mt-4 border-2 border-black justify-center' to="/">
        <button>Go Back</button>
      </Link>
    </form>
  )
}

export default Form

// import React, { useMemo, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// import './pages.css';

// const Form = (props) => {
//   const navigate = useNavigate();
//   const params = useParams();

//   // Will get current character here for edit
//   const currentCharacter = useMemo(
//     () => props.characters.find((character) => character.id === parseInt(params.id)),
//     [params.id, props.characters]
//   );

//   const [formData, setFormData] = useState({
//     name: props.formType === 'new' ? '' : currentCharacter.name,
//     details: props.formType === 'new' ? '' : currentCharacter.details,
//     id: props.formType === 'new' ? null : parseInt(currentCharacter.id),
//     image: null, // Placeholder for image file
//   });

//   const handleChange = (event) => {
//     const { name, value, type } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? event.target.files[0] : value,
//     }));
//   };

//   const handleSubmission = (event) => {
//     event.preventDefault();

//     // Create FormData object to send image file
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('details', formData.details);
//     formDataToSend.append('image', formData.image); // append image file
//     if (props.formType !== 'new') {
//       formDataToSend.append('id', formData.id);
//     }

//     // Handle submit with form data
//     try {
//       props.handleSubmit(formDataToSend, props.formType);
//       navigate('/');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <form className="flex flex-col items-center" onSubmit={handleSubmission}>
//       <h3 className="mt-4">Name</h3>
//       <input
//         className="border-2 border-black w-15"
//         type="text"
//         onChange={handleChange}
//         value={formData.name}
//         name="name"
//         required
//       />
//       <h3 className="mt-4">Details</h3>
//       <input
//         className="border-2 border-black h-20 w-3/4"
//         type="text"
//         onChange={handleChange}
//         value={formData.details}
//         name="details"
//         required
//       />
//       <h3 className="mt-4">Upload Image</h3>
//       <input
//         className="border-2 border-black"
//         type="file"
//         onChange={handleChange}
//         name="image"
//         accept="image/*"
//       />
//       <input className="w-35 mt-4 border-2 border-black" type="submit" value={props.buttonLabel} />
//       <Link className="w-20 mt-4 border-2 border-black justify-center" to="/">
//         <button>Go Back</button>
//       </Link>
//     </form>
//   );
// };

// export default Form;
