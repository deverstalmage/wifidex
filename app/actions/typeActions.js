import * as types from './actionTypes';

import * as infoPanelActions from './infoPanelActions';

function requestType() {
  return {
    type: types.REQUEST_TYPE,
  };
}

function receiveType(data) {
  return {
    type: types.RECEIVE_TYPE,
    name: data.name,
    damageRelations: data.damage_relations,
  };
}

function fetchTypeFailed(error) {
  return {
    type: types.FAILED_TYPE,
    error,
  };
}

function getType(name) {
  return fetch(`http://pokeapi.co/api/v2/type/${name.trim().toLowerCase()}/`).then(response => response.json());
}

export function updateInfoPanelWithType(name) {

  return function(dispatch) {

    dispatch(requestType());

    getType(name)
      .then(data => {
        if (!data.id) throw new Error(`Type "${name}" not found`);
        const content = data.damage_relations;
        let contentStrings = [];
        for (let relation in content) {
          if (content[relation].length > 0) contentStrings.push(relation.replace(/_/g, ' ') + ': ' + content[relation].map(c => c.name).join(', '))
        }
        dispatch(receiveType(data));
        dispatch(infoPanelActions.openInfoPanel());
        return dispatch(infoPanelActions.updateInfoPanel(data.name, contentStrings));
      })
      .catch(error => dispatch(fetchTypeFailed(error.message)));
  };
}
