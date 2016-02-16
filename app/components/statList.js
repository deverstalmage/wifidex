import React, {
  Component,
  View,
  Text,
} from 'react-native';

const statNames = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'Spe',
};

// http://stackoverflow.com/questions/4161369/html-color-codes-red-to-yellow-to-green
/**
 * Converts integer to a hexidecimal code, prepad's single
 * digit hex codes with 0 to always return a two digit code.
 *
 * @param {Integer} i Integer to convert
 * @returns {String} The hexidecimal code
 */
function intToHex(i) {
  var hex = parseInt(i).toString(16);
  return (hex.length < 2) ? '0' + hex : hex;
}

/**
 * Return hex color from scalar *value*.
 *
 * @param {float} value Scalar value between 0 and 1
 * @return {String} color
 */
function makeColor(value) {
  // value must be between [0, 510]
  value = Math.min(Math.max(0,value), 1) * 510;

  var redValue;
  var greenValue;
  if (value < 255) {
    redValue = 255;
    greenValue = Math.sqrt(value) * 16;
    greenValue = Math.round(greenValue);
  } else {
    greenValue = 255;
    value = value - 255;
    redValue = 255 - (value * value / 255)
    redValue = Math.round(redValue);
  }

  return '#' + intToHex(redValue) + intToHex(greenValue) + '00';
}

export default class StatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stats, style } = this.props;

    const statList = stats.map(stat => {
      const { base_stat: base, stat: { name } } = stat;
      return (
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 5, alignItems: 'center'}} key={`stat_${name}`}>
          <View style={{width: 50}}>
            <Text>{statNames[name]}:</Text>
          </View>
          <View style={{backgroundColor: makeColor(base / 180), width: base, height: 15, marginRight: 5}}></View>
          <Text>{base}</Text>
        </View>
      )
    }).reverse();

    return (
      <View style={Object.assign({}, style)}>
        {statList}
      </View>
    );
  }
}
