import React, {
  Component,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  ActivityIndicatorIOS,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as pokemonActions from '../actions/pokemonActions';
import * as searchActions from '../actions/searchActions';
import * as typeActions from '../actions/typeActions';
import * as infoPanelActions from '../actions/infoPanelActions';

import Wifidex from '../components/wifidex';
import InfoPanel from '../components/infoPanel';

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#BD1550',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
});

const NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {},

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

class Nav extends Component {
  constructor(props) {
    super(props);

    this.closeInfoPanel = this.closeInfoPanel.bind(this);

    this.state = {
      currentRoute: {
        name: 'wifidex',
        title: 'Wifidex',
        index: 0,
      },
    };
  }

  closeInfoPanel() {
    StatusBarIOS.setStyle('light-content');
    this.props.actions.infoPanel.closeInfoPanel();
  }

  render() {
    const modal = this.props.state.infoPanel.open ? <InfoPanel onClose={this.closeInfoPanel} {...this.props} /> : null;
    const loader = (
      this.props.state.pokemon.isFetching ||
      this.props.state.type.isFetching
    ) ? (
      <View style={{position: 'absolute', right: 0, left: 0, bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 100, width: 100, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicatorIOS size={'large'} animating={true} />
          </View>
        </View>
      </View>
    ) : null;

    return (
      <View style={{flex: 1}}>
        <Navigator
          style={{flex: 1}}
          initialRoute={this.state.currentRoute}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper}
              style={styles.navBar}
            />
          }
          renderScene={(route, navigator) => {
            switch (route.name) {
              case 'wifidex':
                return <Wifidex {...this.props} />;
                break;
              default:
                break;
            }
          }}
        />
        {loader}
        {modal}
      </View>
    );
  }
}

export default connect(state => ({state}),
  (dispatch) => ({
    actions: {
      pokemon: bindActionCreators(pokemonActions, dispatch),
      type: bindActionCreators(typeActions, dispatch),
      search: bindActionCreators(searchActions, dispatch),
      infoPanel: bindActionCreators(infoPanelActions, dispatch),
    },
  })
)(Nav);
