import React, {
  Component,
  View,
  Image,
  Text,
  SegmentedControlIOS,
} from 'react-native';

import StatList from './statList';
import TypeList from './typeList';
import AbilityList from './abilityList';
import StrategyList from './strategyList';

const formats = ['OU', 'UU', 'RU', 'NU', 'PU']

export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: ['OU'],
    };
  }

  render() {
    const { fetchPokemon, updateSearchText } = this.props;
    const { searchText, data, error, errorMessage, isFetching, strategy } = this.props;

    const numName = data ? <Text>#{data.id}: {data.name}</Text> : null;
    const statList = data ? <StatList stats={data.stats} /> : null;
    const typeList = data ? <TypeList types={data.types} /> : null;
    const abilityList = data ? <AbilityList abilities={data.abilities} /> : null;
    const strategyList = strategy ? <StrategyList formats={this.state.format} strategy={strategy} /> : null;
    const image = data ? <Image style={{borderWidth: 1, borderColor: 'lightgray', width: 150, height: 150}} source={{uri: `http://www.smogon.com/dex/media/sprites/xy/${data.name}.gif`}} /> : null;
    const formatSelector = data ? (
      <View style={{padding: 10}}>
        <SegmentedControlIOS
          values={formats}
          selectedIndex={0}
          onValueChange={val => this.setState({format: [val]})}
        />
      </View>
    ) : null;

    return (
      <View style={{flex: 1}}>
        {numName}
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          {image}
          {statList}
        </View>
        {formatSelector}
        {typeList}
        {abilityList}
        {strategyList}
      </View>
    );
  }
}
