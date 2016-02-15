import React, {
  Component,
  View,
  Text,
} from 'react-native';

export default class AbilityList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { abilities } = this.props;

    const abilityList = abilities.sort().map((ability, i) => {
      const { ability: { name }, is_hidden: hidden } = ability;
      const slash = i < abilities.length - 1 ? ' / ' : null;
      return <Text key={`ability_${name}`}>{name}{hidden ? '*': null}{slash}</Text>;
    });

    return (
      <View style={{padding: 10, flex: 1, flexDirection: 'row'}}>
        {abilityList}
      </View>
    );
  }
}