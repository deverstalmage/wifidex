import React, {
  Component,
  View,
  Text,
  WebView,
  SegmentedControlIOS,
} from 'react-native';

import { natureChart } from '../data/natureChart';

export default class Strategy extends Component {
  render() {
    const { format, description, abilities, evconfigs, moveslots, name, natures, items } = this.props;
    const evconfig = evconfigs[0];
    const stats = Object.keys(evconfig);
    const evs = stats.map((stat, i) => {
      // const bgColor =
      return (
        <View key={`stat_${stat}`} style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: '700'}}>{stat}</Text>
          <Text style={{fontStyle: 'italic'}}>{evconfig[stat]}</Text>
        </View>
      );
    });

    const moveStyle = {
      color: 'black',
      padding: 5,
      backgroundColor: '#f0f0f0',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    };

    return (
      <View style={{flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}>
        <Text>{format}: {name} @ {items.join(' / ')}</Text>
        <Text>{abilities.join(' / ')}</Text>
        <Text>
          {natures.map(a => {
            let string = a;
            const stat1 = natureChart[a][0];
            const stat2 = natureChart[a][1];
            if (stat1 !== stat2) string += ` (+${stat1}, -${stat2})`;
            return string;
          }).join(' / ')}
        </Text>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={moveStyle}>{moveslots[0].join(' / ')}</Text>
            <Text style={moveStyle}>{moveslots[1].join(' / ')}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={moveStyle}>{moveslots[2].join(' / ')}</Text>
            <Text style={moveStyle}>{moveslots[3].join(' / ')}</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          {evs}
        </View>
        <View style={{height: 1, backgroundColor: 'lightgray', flex: 1, marginTop: 10, marginBottom: 20}} />
      </View>
    )
  }
}