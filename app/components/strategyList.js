import React, {
  Component,
  View,
  Text,
  WebView,
  SegmentedControlIOS,
} from 'react-native';

function removeHTML(string) {
  return string.replace(/(<([^>]+)>)/ig, '');
}

const formats = ['OU', 'UU', 'RU', 'NU', 'PU', 'LC'];

export default class StrategyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'OU',
    };
  }

  render() {
    const { strategy: { strategies } } = this.props;
    const movesets = strategies.map(s => s.movesets.map(m => Object.assign({format: s.format}, m))).reduce((s1, s2) => s1.concat(s2));
    const list = movesets.map((moveset, i) => {
      const { format, description, abilities, evconfigs, moveslots, name, natures, items } = moveset;
      if (format !== this.state.format) return null;
      const evconfig = evconfigs[0];
      const stats = Object.keys(evconfig);
      let evs = '';
      stats.forEach(stat => evs = evs + (stat + ': ' + evconfig[stat] + ', '));
      return (
        <View key={`strat_${i}`} style={{flex: 1, marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}>
          <Text>{evs}</Text>
        </View>
      );
    }).reverse().filter(s => s !== null);

    const content = list.length ? list : <Text>No content for formats {this.state.format} found</Text>;

    return (
      <View style={{padding: 10}}>
        <SegmentedControlIOS
          values={formats}
          selectedIndex={0}
          onValueChange={val => this.setState({format: val})}
        />
      {content}
      </View>
    );
  }
}