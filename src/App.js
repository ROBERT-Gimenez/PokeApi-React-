import React from 'react';
import { getPokemons , getPokemonsData  } from './api';
import './App.css';
import Navbar from './components/navbar';
import Pokedex from './components/pokedex';
import Searchbar from './components/searchbar';
import { FavoriteProvider } from './contexts/favoriteContext';

const {useState , useEffect} = React;

function App() {
  const [pokemons , setPokemons] = useState([]);
  const [page , setPage] = useState(1);
  const [total , setTotal] = useState(0);
  const [loading , setLoading] = useState(true);
  const {favorites , setFavorites} = useState([]);

  const fetchPokemons = async () =>{
    try {
      setLoading(true)
      const data = await getPokemons(25,25 * page);
      const promises = data.results.map( async (pokemon) =>{
        return await getPokemonsData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25))
  } catch(err){ }
  }

  useEffect(()=>{
    fetchPokemons();
  }, [page]);
  const updateFavoritePokemons = (name) => {
    const update = [...favorites]
    const isFavorite = favorites.indexOF(name);
    if(isFavorite >= 0){
      updateFavoritePokemons.splice(isFavorite,1);
    }else{
      update.push(name)
    }
    setFavorites(update);
  }

  return (
    <FavoriteProvider value={{
      favoritePokemons:favorites,
      updateFavoritePokemons:updateFavoritePokemons
      }} >
    <div>
      <Navbar/>
      <div>
      <Searchbar/>
      <Pokedex pokemons={pokemons}
      loading={loading}
      page={page}
      setPage={setPage}
      total={total}
      />
    </div>
    </div>
    </FavoriteProvider>
  );
}

export default App;
