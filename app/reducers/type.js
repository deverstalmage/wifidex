import * as types from '../actions/actionTypes';

const initialState = {
  data: null,
  error: null,
  isFetching: false,
};

export default function type(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_TYPE:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case types.RECEIVE_TYPE:
      return {
        ...state,
        isFetching: false,
        name: action.name,
        damageRelations: action.damageRelations
      };
      break;
    case types.FAILED_TYPE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
