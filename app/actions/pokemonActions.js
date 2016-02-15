import * as types from './actionTypes';

export function fetchPokemon(name) {

  return function(dispatch) {

    console.log('FETCHING ' + name);

    dispatch(requestPokemon());

    return fetch(`http://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}/`)
      .then(response => response.json())
      .then(data => {
        console.log('DATA;', data);
        return dispatch(receivePokemon(data));
      })
      .catch(error => {
        console.log('Error', error);
        return dispatch(fetchPokemonFailed(name, error));
      });
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

export function fetchPokemonFailed(name, error) {
  return {
    type: types.FAILED_POKEMON,
    message: `Couldn't fetch ${name}`,
    error,
  };
}
