import React, {
  Component,
  View,
  ScrollView,
  Image,
  Text,
  ActivityIndicatorIOS,
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

    const numName = data ? <Text style={{marginBottom: 10}}>#{data.id}: {data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Text> : null;
    const statList = data ? <StatList stats={data.stats} /> : null;
    const typeList = data ? <TypeList types={data.types} /> : null;
    const abilityList = data ? <AbilityList abilities={data.abilities} preferredAbilities={strategy.map(s => s.abilities).reduce((a1, a2) => a1.concat(a2), []).map(a => a.toLowerCase())} /> : null;
    const strategyList = strategy ? <StrategyList strategy={strategy} /> : null;
    const image = data ? <Image style={{borderWidth: 1, borderColor: 'lightgray', width: 150, height: 150, marginRight: 10}} source={{uri: `http://www.smogon.com/dex/media/sprites/xy/${data.name}.gif`}} /> : null;

    let content;
    if (isFetching) {
      content = <ActivityIndicatorIOS style={{height: 100, alignItems: 'center', justifyContent: 'center'}} />;
    } else {
      content = data ? (
        <ScrollView style={{flex: 1, padding: 10}}>
          {numName}
          <View style={{flex: 1, flexDirection: 'row'}}>
            {image}
            {statList}
          </View>
          {typeList}
          {abilityList}
          {strategyList}
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 0.05}}>
          <Image style={{height: 50, width: 50}} source={{uri: 'http://orig14.deviantart.net/727b/f/2012/102/f/1/pokeball_sprite_by_creepypasta81691-d4vzl6r.png'}} />
        </View>
      );
    }

    return <View style={{flex: 1}}>{content}</View>;
  }
}
