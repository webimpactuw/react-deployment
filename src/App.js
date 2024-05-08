import logo from './logo.svg';
import './App.css';
import client from "./client";
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';

function App() {
  const [dogs, setDogs] = useState([]);
  const builder = imageUrlBuilder(client);

  // Fetch dog information
  useEffect(() => {
    async function getDogs() {
      const query = `*[_type == "dog"]`;
      const dogs = await client.fetch(query);
      setDogs(dogs);
    } 

    getDogs();
  }, []);

  // Used to display images
  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <div className="App">
      {dogs.map(dog => (
        <div key={dog._id} style={{backgroundColor: 'lightgray', padding: 10, margin: 10, borderRadius: 10}}>
          <img src={urlFor(dog.image).url()} alt={dog.name} style={{width: 100, borderRadius: 10}}/>
          <h2>🐶{dog.name}</h2>
          <p>🔢{dog.age} years old</p>
          <p>🌐{dog.breed}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
