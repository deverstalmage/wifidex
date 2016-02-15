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

const baseButton = {
  flex: 1,
  height: 30,
  backgroundColor: 'lightgray',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
}

const styles = StyleSheet.create({
  buttonSearch: baseButton,
  buttonClear: Object.assign({marginLeft: 10}, baseButton),
  input: {
    flex: 10,
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

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

    // <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
    //   <TextInput onChangeText={updateSearchText}
    //              autoCapitalize={'words'}
    //              value={searchText}
    //              placeholder={'Search Pokemon name here'}
    //              style={styles.input}
    //   />
    //   {searchActivity}
    //   <View style={{flex: 1, flexDirection: 'row' }}>
    //     <TouchableOpacity style={styles.buttonSearch} onPress={() => onSearch(searchText)}>
    //       <Text>Search</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.buttonClear} onPress={this.clear.bind(this)}>
    //       <Text>Clear</Text>
    //     </TouchableOpacity>
    //   </View>
    //   {errorText}
    // </View>

    return (
      <View style={Object.assign({}, style)}>
        <SearchBar
          ref='searchBar'
          placeholder='Search'
          onChangeText={updateSearchText}
          onSearchButtonPress={this.search.bind(this)}
          onCancelButtonPress={this.clear.bind(this)}
          text={searchText}
        />
      </View>
    );
  }
}
