'use strict';

import React, { Component, View } from 'react-native';
import {bindActionCreators} from 'redux';
import * as pokemonActions from '../actions/pokemonActions';
import * as searchActions from '../actions/searchActions';
import { connect } from 'react-redux';

import Entry from '../components/entry';
import Search from '../components/search';

// @connect(state => ({
//   state: state.counter
// }))
class WifidexApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    console.log('STATE', state);
    return (
      <View style={{padding: 10, paddingTop: 30}}>
        <Search
          isFetching={state.pokemon.isFetching}
          onSearch={actions.pokemon.fetchPokemon}
          {...state.search}
          {...actions.search} />
        <Entry
          {...state.pokemon}
          {...actions.pokemon} />
      </View>
    );
  }
}

export default connect(state => ({state}),
  (dispatch) => ({
    actions: {
      pokemon: bindActionCreators(pokemonActions, dispatch),
      search: bindActionCreators(searchActions, dispatch),
    },
  })
)(WifidexApp);
