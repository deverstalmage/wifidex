import * as types from './actionTypes';

export function fetchPokemon(name) {

  return function(dispatch) {

    console.log('FETCHING ' + name);

    dispatch(requestPokemon());

    return fetch(`http://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}/`)
      .then(response => response.json())
      .then(data => {
        if (!data.id) throw new Error(`Pokemon "${name}" not found`);
        return dispatch(receivePokemon(data));
      })
      .catch(error => dispatch(fetchPokemonFailed(error.message)));
  };
}

export function requestPokemon() {
  return {
    type: types.REQUEST_POKEMON,
  };
}

export function receivePokemon(data) {
  return {
    type: types.RECEIVE_POKEMON,
    data,
  };
}

export function fetchPokemonFailed(error) {
  return {
    type: types.FAILED_POKEMON,
    error,
  };
}
