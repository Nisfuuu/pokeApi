import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [listPokemon, setListPokemon] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20`);

      const listPokemonData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const dataPokemon = await axios.get(pokemon.url);
          const data = dataPokemon.data;
          return {
            name: data.name,
            img: data.sprites.front_default,
            hp: data.stats[0].base_stat,
            att: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
          };
        })
      );
      setListPokemon(listPokemonData);
    };
    fetch();
  }, []);
  return (
    <>
      <div className="container">
        <div className="w-full pt-24">
          {listPokemon.map((pokemon) => (
            <div key={pokemon.name}>
              <div class="card mx-auto mb-40 scale-150 bg-[#618fca]">
                <div class="card-img ">
                  <img className="m-auto" src={pokemon.img} alt="" />
                </div>
                <div class="card-info">
                  <p class="text-title text-[#618fca]">{pokemon.name}</p>
                  <li>{pokemon.hp}</li>
                </div>
                <div class="card-footer">
                  <span class="text-title">$499.49</span>
                  <div class="card-button"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
