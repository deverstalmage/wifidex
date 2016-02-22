import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
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

export default class Type extends Component {
  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.name);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{padding: 5, marginRight: 5, backgroundColor: typeColors[this.props.name], borderRadius: 5, width: 100, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: (this.props.name === 'electric' || this.props.name === 'grass' || this.props.name === 'ice') ? 'black' : 'white'}}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
