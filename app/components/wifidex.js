'use strict';

import React, { Component, View, ScrollView } from 'react-native';

import Entry from '../components/entry';
import Search from '../components/search';

import { list as pokemon } from '../data/pokemon';
const pokemonNames = Object.keys(pokemon);

export default class Wifidex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const pkmn = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    this.props.actions.pokemon.fetchPokemon(pkmn);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={{paddingTop: 64, flex: 1}}>
        <Search
          isFetching={state.pokemon.isFetching}
          searchError={state.pokemon.error}
          onSearch={actions.pokemon.fetchPokemon}
          {...state.search}
          {...actions.search} />
        <ScrollView style={{flex: 1}}>
          <Entry
            {...state.pokemon}
            {...actions.pokemon} />
        </ScrollView>
      </View>
    );
  }
}