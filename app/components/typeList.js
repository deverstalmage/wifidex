import React, {
  Component,
  View,
  Text,
} from 'react-native';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

export default class TypeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { types } = this.props;

    const typeList = types.map(type => {
      const { type: { name } } = type;
      return (
        <View  key={`type_${name}`} style={{padding: 5, margin: 5, backgroundColor: typeColors[name], borderRadius: 5, width: 100}}>
          <Text style={{color: (name === 'electric' || name === 'grass' || name === 'ice') ? 'black' : 'white'}}>{name}</Text>
        </View>
      )
    }).reverse();

    return (
      <View style={{padding: 10, flex: 1, flexDirection: 'row'}}>
        {typeList}
      </View>
    );
  }
}