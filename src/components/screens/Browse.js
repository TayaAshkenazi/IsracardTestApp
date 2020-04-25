import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {changeMovie} from '../../actions/movieActions';
import {bindActionCreators} from 'redux';
class Browse extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Source Listing',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {textAlign: 'center', flex: 1},
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      currentMovie: {
        title: '',
        description: '',
        poster: '',
        popularity: '',
        release: '',
      }
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
          dataSource: responseJson.results,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };

  openMovie(item){
    const {changeMovie} = this.props;
    let currentMovie = {movie: {
        title: item.title,
        description: item.overview,
        poster: item.poster_path,
        popularity: item.popularity,
        release: item.release_date,
      }
    }
    changeMovie(currentMovie);
    this.props.navigation.navigate('Movie');
  };

  renderItem = data => (
    <TouchableOpacity style={styles.list} onPress={() => this.openMovie(data.item)}>
      <View style={styles.Image}>
        <View>
      <Text style={styles.lightText}>{data.item.title}</Text>
      <Text style={styles.lightText}>{data.item.release_date}</Text>
      <Text style={styles.lightText}>{data.item.popularity}</Text>
      </View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri:
              'http://image.tmdb.org/t/p/w185/' + data.item.poster_path,
          }}
        />
      </View>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
  tinyLogo: {
    alignItems: 'flex-end',
    width: 50,
    height: 50,
  },
  Image: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({
  movie: state.movie,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {
        changeMovie,
      },
      dispatch,
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Browse);

