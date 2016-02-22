import * as types from './actionTypes';

function requestPokemon() {
  return {
    type: types.REQUEST_POKEMON,
  };
}

function receivePokemon(data, strategy) {
  return {
    type: types.RECEIVE_POKEMON,
    data,
    strategy,
  };
}

function fetchPokemonFailed(error) {
  return {
    type: types.FAILED_POKEMON,
    error,
  };
}

export function fetchPokemon(name) {

  return function(dispatch) {

    dispatch(requestPokemon());

    const dex = fetch(`http://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}/`);
    const strategy = fetch('http://www.smogon.com/dex/_rpc/dump-pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({gen: 'xy', alias: name.toLowerCase()})
    });

    return Promise.all([dex, strategy])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        if (!data[0].id) throw new Error(`Pokemon "${name}" not found`);
        return dispatch(receivePokemon(data[0], data[1]));
      })
      .catch(error => dispatch(fetchPokemonFailed(error.message)));
  };
}
