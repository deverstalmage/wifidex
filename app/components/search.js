import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicatorIOS,
} from 'react-native';

import SearchBar from 'react-native-search-bar';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchError !== nextProps.searchError) this.setState({error: nextProps.searchError});
  }

  search() {
    this.props.onSearch(this.props.searchText);
    this.refs.searchBar.blur();
  }

  clear() {
    this.props.updateSearchText('');
    this.setState({
      error: null,
    });
  }

  render() {
    const { updateSearchText } = this.props;
    const { searchText, isFetching, style } = this.props;

    const errorText = this.state.error ? <Text style={{color: 'red'}}>{this.state.error}</Text> : null;
    const searchActivity = isFetching ? <ActivityIndicatorIOS animating={isFetching} /> : null;

    return (
      <View style={Object.assign({height: 44}, style)}>
        <SearchBar
          ref="searchBar"
          placeholder="Search"
          onChangeText={updateSearchText}
          onSearchButtonPress={this.search.bind(this)}
          onCancelButtonPress={this.clear.bind(this)}
        />
      </View>
    );
  }
}
