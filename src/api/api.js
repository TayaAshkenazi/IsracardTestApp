export const api_key = 'b3f2d6fc40ead4333827e39262ac4e2d';
export const base_api =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b3f2d6fc40ead4333827e39262ac4e2d';

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  BackHandler,
} from 'react-native';

class api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b3f2d6fc40ead4333827e39262ac4e2d',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
}
