import * as types from '../actions/actionTypes';

const initialState = {
  title: '',
  content: [],
  open: false,
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_INFO_PANEL:
      return {
        ...state,
        title: action.title,
        content: action.content,
      };
      break
    case types.OPEN_INFO_PANEL:
      return {
        ...state,
        open: true,
      };
      break;
    case types.CLOSE_INFO_PANEL:
      return {
        ...state,
        open: false,
      };
      break;
    default:
      return state;
  }
}
