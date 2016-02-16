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
    const { abilities, preferredAbilities } = this.props;

    const abilityList = abilities.sort().map((ability, i) => {
      const { ability: { name }, is_hidden: hidden } = ability;
      const nameWithSpaces = name.replace(/-/g, ' ');
      const slash = i < abilities.length - 1 ? ' / ' : null;
      return <Text key={`ability_${name}`} style={{fontWeight: preferredAbilities.indexOf(nameWithSpaces) > -1 ? 'bold' : 'normal'}}>{nameWithSpaces} {hidden ? '(h)': null}{slash}</Text>;
    });

    return (
      <View style={{paddingTop: 10, paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
        {abilityList}
      </View>
    );
  }
}