import React, {
  Component,
  View,
  Text,
} from 'react-native';

export default class TypeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { types } = this.props;

    const typeList = types.map(type => {
      const { type: { name } } = type;
      return (
        <Text key={`type_${name}`}>{name}</Text>
      )
    }).reverse();

    return (
      <View style={{padding: 10}}>
        {typeList}
      </View>
    );
  }
}