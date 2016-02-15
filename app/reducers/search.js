import * as types from '../actions/actionTypes';

const initialState = {
  searchText: '',
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
      break;
    default:
      return state;
  }
}
