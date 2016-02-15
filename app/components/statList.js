import React, {
  Component,
  View,
  Text,
} from 'react-native';

export default class StatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stats, style } = this.props;

    const statList = stats.map(stat => {
      const { base_stat: base, stat: { name } } = stat;
      return (
        <Text key={`stat_${name}`}>{name}: {base}</Text>
      )
    }).reverse();

    return (
      <View style={Object.assign({padding: 10}, style)}>
        {statList}
      </View>
    );
  }
}