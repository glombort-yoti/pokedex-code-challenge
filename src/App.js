import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const server = "https://raw.githubusercontent.com/ramclen/Poke-Server/master";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const search = (e) => {
    const { value } = e.target;
    setFiltered(
      pokedex.filter((pokedex) => {
        return pokedex.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };
  const getMoreInfo = (id) => {
    setSelectedPokemon(pokedex[id - 1]);
  };

  const loadData = async () => {
    let description = await fetch(`${server}/descriptions.json`).then((res) =>
      res.json()
    );

    let pokeFetch = await fetch(`${server}/pokedex.json`).then((res) =>
      res.json()
    );
    pokeFetch = pokeFetch[3].Pokedex;

    pokeFetch = pokeFetch.map((pokemon, index) => {
      pokemon.description = description[index].description;
      pokemon.image = description[index].image;
      return pokemon;
    });

    setPokedex(pokeFetch);
    setFiltered(pokeFetch);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {selectedPokemon === null ? (
        <>
          <input type="text" onChange={search} />
          <ul>
            {filtered.map((pokemon) => (
              <li
                className="pokemon-list-item"
                key={pokemon.id}
                onClick={() => getMoreInfo(pokemon.id)}
              >
                <img
                  className="pokemon-list-img"
                  src={`${server}/${pokemon.image.thumbnail}`}
                  alt="poke"
                />
                {pokemon.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h1>{selectedPokemon.name}</h1>
          <p>{selectedPokemon.description}</p>
          <p>
            {selectedPokemon.type.map((item) => {
              return <p style={{ backgroundColor: "green" }}>{item}</p>;
            })}
          </p>
          <img
            src={`${server}/${selectedPokemon.image.image}`}
            alt={selectedPokemon.name}
          />

          <button type="button" onClick={() => setSelectedPokemon(null)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
