import React, {
  Component,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
} from 'react-native';

import { bindActionCreators } from 'redux';
import * as pokemonActions from '../actions/pokemonActions';
import * as searchActions from '../actions/searchActions';
import { connect } from 'react-redux';

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

    this.launchInfoPanel = this.launchInfoPanel.bind(this);
    this.closeInfoPanel = this.closeInfoPanel.bind(this);

    this.state = {
      currentRoute: {
        name: 'wifidex',
        title: 'Wifidex',
        index: 0,
      },
      modal: {
        title: '',
        content: '',
        open: false,
      },
    };
  }

  launchInfoPanel(title, content) {
    this.setState({
      modal: {
        title,
        content,
        open: true,
      },
    })
  }

  closeInfoPanel() {
    StatusBarIOS.setStyle('light-content');
    this.setState({
      modal: {
        ...this.state.modal,
        open: false,
      },
    });
  }

  render() {
    const modal = this.state.modal.open ? <InfoPanel onClose={this.closeInfoPanel} {...this.state.modal} /> : null;

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
                return <Wifidex {...this.props} launchInfoPanel={this.launchInfoPanel} />;
                break;
              default:
                break;
            }
          }}
        />
        {modal}
      </View>
    );
  }
}

export default connect(state => ({state}),
  (dispatch) => ({
    actions: {
      pokemon: bindActionCreators(pokemonActions, dispatch),
      search: bindActionCreators(searchActions, dispatch),
    },
  })
)(Nav);
