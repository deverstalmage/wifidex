'use strict';

import React, { Component, View, ScrollView } from 'react-native';
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
    return (
      <View style={{flex: 1, padding: 10, paddingTop: 30}}>
        <View style={{flex: 1}}>
          <Search
            isFetching={state.pokemon.isFetching}
            searchError={state.pokemon.error}
            onSearch={actions.pokemon.fetchPokemon}
            {...state.search}
            {...actions.search} />
        </View>
        <ScrollView style={{flex: 5}}>
          <Entry
            {...state.pokemon}
            {...actions.pokemon} />
        </ScrollView>
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
