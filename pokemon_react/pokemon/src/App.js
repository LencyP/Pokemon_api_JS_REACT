import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
  });

  const searchPokemon = () =>
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        // console.log(response) for datas
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
        });
      }
    ); //promise, so we have to use .then and get the response from API

  return (
    <div className="pokemonApp">
      <div className="Title__display">
        <h1>Choose your pokemon!</h1>
        <input
          type="text"
          className="title__display--input"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button className="title__display--button" onClick={searchPokemon}>
          Search pokemon
        </button>
      </div>
      <div className="Pokemon__display">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img} />
      </div>
    </div>
  );
}

export default App;
