'use strict';

import React, { Component, View, ScrollView } from 'react-native';

import Entry from '../components/entry';
import Search from '../components/search';

export default class Wifidex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={{paddingTop: 64}}>
        <Search
          isFetching={state.pokemon.isFetching}
          searchError={state.pokemon.error}
          onSearch={actions.pokemon.fetchPokemon}
          {...state.search}
          {...actions.search} />
        <ScrollView>
          <Entry
            {...state.pokemon}
            {...actions.pokemon} />
        </ScrollView>
      </View>
    );
  }
}

// export default connect(state => ({state}),
//   (dispatch) => ({
//     actions: {
//       pokemon: bindActionCreators(pokemonActions, dispatch),
//       search: bindActionCreators(searchActions, dispatch),
//     },
//   })
// )(Wifidex);
