import * as types from './actionTypes';

export function updateSearchText(searchText) {
  return {
    type: types.UPDATE_SEARCH_TEXT,
    searchText,
  }
}
