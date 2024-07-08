// import {useMemo, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleCharacter = ({ characters }) => {
//     const params = useParams();
//     const [moves, setMoves] = useState([]);
//       const [currentCharacter, setCurrentCharacter] = useState(null);
  
      
//       useEffect(() => {
//         // const foundCharacter = useMemo(() => characters.find(character => character.id === parseInt
//         //     (params.id)), [params.id, characters])
//         // Find current character based on params.id
//         const foundCharacter = characters.find(character => character.id === parseInt(params.id));
//         setCurrentCharacter(foundCharacter);
      
//         const fetchMoves = async () => {
//         try {
//           const movesResponse = await axios.get(`http://localhost:8000/moves/character/${foundCharacter.name}/`);
//           setMoves(movesResponse.data);
//         } catch (error) {
//           console.error('Error fetching moves:', error);
//         }
//       };
  
//       fetchMoves();
//     }, [params.id]);
  
//     if (!characters.length) {
//         return <div>Loading...</div>;
//       }
    

//       return (
//         <div>
//           <h1>{currentCharacter.name}</h1>
//           <h2>{currentCharacter.details}</h2>
//           <h3>Moves:</h3>
//           <ul>
//             {moves.map(move => (
//               <li key={move.id}>{move.command}</li>
//             ))}
//           </ul>
//           <Link to={`/edit/${params.id}`}>
//             <button>Edit Character</button>
//           </Link>
//           <Link to="/">
//             <button>Go Back</button>
//           </Link>
//         </div>
//       );
//     };
    
//     export default SingleCharacter;
    
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

console.log('page opened')
const apiURL= `http://localhost:8000`

const SingleCharacter = ({ characters }) => {
  const params = useParams();
  const [moves, setMoves] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);

  useEffect(() => {
    // Find current character based on params.id
    const foundCharacter = characters.find(character => character.id === parseInt(params.id));
    setCurrentCharacter(foundCharacter);
    
    // Fetch moves based on character_name
    const fetchMoves = async () => {
      try {
        const movesResponse = await axios.get(`${apiURL}/moves/character/${foundCharacter.name}/`);
        setMoves(movesResponse.data);
      } catch (error) {
        console.error('Error fetching moves:', error);
      }
    };

    if (foundCharacter) {
      fetchMoves();
    }
  }, [params.id, characters]);

  if (!currentCharacter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={`${currentCharacter.image}`} alt={currentCharacter.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <h1>{currentCharacter.name}</h1>
      <h2>{currentCharacter.details}</h2>
      <h3>Moves:</h3>
      <ul>
        {moves.map(move => (
          <li key={move.id}>Command: {move.command}, Hitlevel:{move.hitlevel}, Damage:{move.damage}, Startup:{move.startup}, Block:{move.block}, Hit:{move.hit}, Counterhit:{move.counterhit}</li>
        ))}
      </ul>
      <Link to={`/edit/${params.id}`}>
        <button>Edit Character</button>
      </Link>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleCharacter;
