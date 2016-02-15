import React, {
  Component,
  View,
  Text,
  WebView,
} from 'react-native';

export default class StrategyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { strategy: { strategies } } = this.props;

    const strategyList = strategies.map((strategy, i) => {
      const { format, comments, overview, movesets } = strategy;
      return <WebView key={`strat_${i}`} style={{height: 500}} html={overview} />;
    }).reverse();

    return (
      <View style={{padding: 10}}>
        {strategyList}
      </View>
    );
  }
}