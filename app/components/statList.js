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
    const { stats } = this.props;

    const statList = stats.map(stat => {
      const { base_stat: base, stat: { name } } = stat;
      return (
        <Text key={`stat_${name}`}>{name}: {base}</Text>
      )
    }).reverse();

    return (
      <View style={{padding: 10}}>
        {statList}
      </View>
    );
  }
}