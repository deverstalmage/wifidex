import * as types from './actionTypes';

export function updateInfoPanel(title, content) {
  console.log('updateINfoPanel', title, content);
  return {
    type: types.UPDATE_INFO_PANEL,
    title,
    content,
  };
}

export function openInfoPanel() {
  return {
    type: types.OPEN_INFO_PANEL,
    open: true,
  };
}

export function closeInfoPanel() {
  return {
    type: types.CLOSE_INFO_PANEL,
    open: false,
  };
}