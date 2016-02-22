import React, {
  Component,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

const AnimatedView = Animated.View;
const { height: deviceHeight } = Dimensions.get('window');

export default class TypeList extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);

    this.state = {
      offset: new Animated.Value(deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 250,
      toValue: 0,
    }).start();
  }

  close() {
    Animated.timing(this.state.offset, {
      duration: 250,
      toValue: deviceHeight,
    }).start(this.props.onClose);
  }

  render() {
    const { state } = this.props;
    return (
      <AnimatedView style={[{transform: [{translateY: this.state.offset}]}, {backgroundColor: 'white', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }]}>
        <View style={{flex: 1}}>
          <NavigationBar title={{title: state.infoPanel.title}} rightButton={{title: 'Done', handler: this.close}} />
          <View style={{flex: 1, padding: 10}}>
            {state.infoPanel.content.map((line, i) => <Text key={i}>{line}</Text>)}
          </View>
        </View>
      </AnimatedView>
    );
  }
}
