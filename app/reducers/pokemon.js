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
        isFetching: true,
      };
    case types.RECEIVE_POKEMON:
      return {
        ...state,
        isFetching: false,
        data: action.data,
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
