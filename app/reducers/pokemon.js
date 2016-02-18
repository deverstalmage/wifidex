import * as types from '../actions/actionTypes';

const initialState = {
  data: null,
  error: null,
  isFetching: false,
};

export default function pokemon(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_POKEMON:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case types.RECEIVE_POKEMON:
      const { strategy: { strategies } } = action;
      const movesets = strategies.map(s => s.movesets.map(m => Object.assign({format: s.format}, m))).reduce((s1, s2) => s1.concat(s2), []);
      return {
        ...state,
        isFetching: false,
        data: action.data,
        strategy: movesets,
      };
      break;
    case types.FAILED_POKEMON:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
