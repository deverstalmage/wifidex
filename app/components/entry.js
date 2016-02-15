import React, {
  Component,
  View,
  Image,
} from 'react-native';

import StatList from './statList';
import TypeList from './typeList';
import AbilityList from './abilityList';
import StrategyList from './strategyList';

export default class Entry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fetchPokemon, updateSearchText } = this.props;
    const { searchText, data, error, errorMessage, isFetching, strategy } = this.props;

    const statList = data ? <StatList stats={data.stats} /> : null;
    const typeList = data ? <TypeList types={data.types} /> : null;
    const abilityList = data ? <AbilityList abilities={data.abilities} /> : null;
    const strategyList = strategy ? <StrategyList strategy={strategy} /> : null;
    const image = data ? <Image style={{width: 150, height: 150}} source={{uri: `http://www.smogon.com/dex/media/sprites/xy/${data.name}.gif`}} /> : null;

    return (
      <View>
        <View>
          {image}
          {statList}
        </View>

        {typeList}
        {abilityList}
        {strategyList}
      </View>
    );
  }
}
