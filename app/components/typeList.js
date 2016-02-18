import React, {
  Component,
  View,
  Text,
} from 'react-native';

import Type from './type.js';

export default class TypeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { types } = this.props;

    const typeList = types.map(type => {
      const { type: { name } } = type;
      return <Type key={`type_${name}`} onPress={this.props.launchInfoPanel} name={name} />;
    }).reverse();

    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
        {typeList}
      </View>
    );
  }
}