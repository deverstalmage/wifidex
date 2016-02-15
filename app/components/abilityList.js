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

    const abilityList = abilities.map(ability => {
      const { ability: { name }, is_hidden: hidden } = ability;
      return (
        <Text key={`ability_${name}`}>{name} {hidden ? '*': null}</Text>
      )
    }).reverse();

    return (
      <View style={{padding: 10}}>
        {abilityList}
      </View>
    );
  }
}