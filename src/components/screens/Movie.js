import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert,
    Modal, Button
} from 'react-native';
import {bindActionCreators} from "redux";
import {addMovieToFavorites, removeMovieFromFavorites} from "../../actions/movieActions";

class Movie extends React.Component {
    constructor() {
        super();
        this.state={
            modalVisible: false,
        }
    }

    addMovieToList(favorites,item){
        const {addMovieToFavorites, removeMovieToFavorites} = this.props;
        if (this.checkIfMovieExistInFavorites(favorites, item))
            removeMovieToFavorites(item);
        else {
            addMovieToFavorites(item);
            this.setState({modalVisible: true})

        }

    };

    checkIfMovieExistInFavorites (favorites, movie){
        if (favorites && favorites.some(m => m.title === movie.title))
            return true;
        return false;
    };

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

    renderItem = data => (
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
                            'http://image.tmdb.org/t/p/w185/' + data.item.poster,
                    }}
                />
            </View>
    );

    render() {
        const {movie} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.list} onPress={() => this.addMovieToList(movie.favorites,movie.movie)}>
                    {!this.checkIfMovieExistInFavorites(movie.favorites, movie.movie) &&
                        <Image style={styles.tinyLogo} source={require('../../utils/resources/unnamed.png')}/>
                    }
                    {this.checkIfMovieExistInFavorites(movie.favorites, movie.movie) &&
                        <Image style={styles.tinyLogo} source={require('../../utils/resources/Places-favorites-icon.png')}/>
                    }
                </TouchableOpacity>
                <Modal
                    presentationStyle='fullScreen'
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}

                >
                    <View style={styles.centeredView}>
                        <FlatList
                            data={movie.favorites}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={item => this.renderItem(item)}
                        />
                        <Button
                             onPress={() => {
                                this.setState({modalVisible: false});
                            }}
                            title="close"
                        />
                    </View>
                </Modal>
                <Text style={styles.text}>{movie.movie.title}</Text>
                <Text style={styles.lightText}>{movie.movie.description}</Text>
                <Text style={styles.lightText}>{movie.movie.popularity}</Text>
                <Image
                    style={styles.poster}
                    source={{
                        uri: 'http://image.tmdb.org/t/p/w185/' + movie.movie.poster,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tinyLogo: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },

    poster: {
        alignItems: 'center',
        width: 150,
        height: 150,
    },

    centeredView: {
      flex: 1,
    },
});

const mapStateToProps = (state) => {
    const {
       movie,
        favorites,
    } = state;

    return {
        movie,
        favorites,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            removeMovieToFavorites: removeMovieFromFavorites,
            addMovieToFavorites,
        },
        dispatch,
    );
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Movie);
