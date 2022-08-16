import React from "react";
import {searchPokemon} from "../api";
const {useState} = React;

const Searchbar = () =>{
    const [Search , setSearch] = useState('');
    const [pokemon , setPokemon] = useState();

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onClick = async (e) => {
        const data = await searchPokemon(Search);
        setPokemon(data);
    };

    return <div className="searchbar-container">
        <div className="searchbar">
            <input onChange={onChange} placeholder="Buscar Pokemon" />
        </div>
        <div className="searchbar-btn">
            <button onClick={onClick} >Buscar</button>
        </div>
        <div>
        {pokemon &&
        <div>
        <div>{pokemon.name}</div>
        <div>{pokemon.waigth}</div>
        <img src = {pokemon.sprites.front_default}/>
        </div>
        }
        </div>
        </div>
};
export default Searchbar;