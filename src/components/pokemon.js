import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoriteContext";

const Pokemon = (props) =>{
    const {pokemon} =props;
    const {favoritePokemons , updateFavoritePokemons} = useContext(FavoriteContext);

    const redHeart = "❤️"
    const blackHeart = "🖤"
    const heart = "❤️";/* favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart; */

    const clickHeard = (e) => {
        e.preventDefault();
        console.log(pokemon)
        updateFavoritePokemons(pokemon.name)
    }
    return (
        <div className="pokemon-card">
        <div className="pokemon-img">
            <img  src={pokemon.sprites.front_default}  alt={pokemon.name}/>
        </div>
        <div className="card-body">
            <div className="card-top">
                <h3>{pokemon.name}</h3>            
            <div>#{pokemon.id}</div>
            </div>
            <div className="card-bottom">
                <div className="pokemon-type">
                    {pokemon.types.map((type , idx) => {
                    return <div key={idx} className="pokemon-type-text">{type.type.name}</div>
                })}
                </div>
                <button onClick={clickHeard}>
                <div className="pokemon-favorite">{blackHeart}</div>
                </button>
            </div>
        </div>
        </div>
    )
}

export default Pokemon ;