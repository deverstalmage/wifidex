import React, {
  Component,
  View,
  Image,
} from 'react-native';

import StatList from './statList';
import TypeList from './typeList';
import AbilityList from './abilityList';

export default class Entry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fetchPokemon, updateSearchText } = this.props;
    const { searchText, data, error, errorMessage, isFetching } = this.props;

    const statList = data ? <StatList stats={data.stats} /> : null;
    const typeList = data ? <TypeList types={data.types} /> : null;
    const abilityList = data ? <AbilityList abilities={data.abilities} /> : null;
    const image = data ? <Image style={{height: 200}} source={{uri: `http://img.pokemondb.net/artwork/${data.name}.jpg`}} /> : null;

    return (
      <View>
        {image}
        {typeList}
        {abilityList}
        {statList}
      </View>
    );
  }
}
