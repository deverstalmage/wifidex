import React, {
  Component,
  View,
  Text,
  WebView,
  SegmentedControlIOS,
} from 'react-native';

import Strategy from './strategy';

function removeHTML(string) {
  return string.replace(/(<([^>]+)>)/ig, '');
}

const formats = ['All', 'OU', 'UU', 'Lower'];
const allTiers = ['OU', 'UU', 'RU', 'NU', 'PU', 'LC'];
const lowerTiers = ['RU', 'NU', 'PU', 'LC'];

export default class StrategyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'All',
    };
  }

  render() {
    const { strategy: strategies } = this.props;
    const list = strategies.map(moveset => {
      const { format, description, abilities, evconfigs, moveslots, name, natures, items } = moveset;
      if (
        (
          format !== this.state.format &&
          this.state.format !== 'All' &&
          this.state.format !== 'Lower'
        ) || (
          this.state.format === 'Lower' &&
          lowerTiers.indexOf(format) < 0
        ) || (
          this.state.format === 'All' &&
          allTiers.indexOf(format) < 0
        )
      ) return null;
      return <Strategy {...moveset} key={`${format}_${name}`} />;
    }).reverse().filter(s => s !== null);

    const content = list.length ? list : <Text style={{marginTop: 10, marginBottom: 10}}>No sets found for this format</Text>;

    return (
      <View>
        <SegmentedControlIOS
          values={formats}
          selectedIndex={0}
          onValueChange={val => this.setState({format: val})}
          tintColor="#BD1550"
        />
        {content}
      </View>
    );
  }
}