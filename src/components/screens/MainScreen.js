import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  AppRegistry,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

export default class MainScreen extends React.Component {
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
      userInfo: null,
      currentMovie: {
        title: '',
        description: '',
        poster: '',
        popularity: '',
        release: '',
      },
    };
  }

  componentDidMount() {
    GoogleSignin.configure({});
    this._isSignedIn();
  }

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({userInfo: userInfo});
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  render() {
    // if (this.state.loading) {
    //     return (
    //         <View style={styles.loader}>
    //             <ActivityIndicator size="large" color="#0c9" />
    //         </View>
    //     );
    // }
    return (
      <View style={styles.container}>
        <Text style={styles.lightText}>Welcome {this.state.userInfo? this.state.userInfo.user.givenName : null}</Text>
        <Image
            style={styles.tinyLogo}
            source={{
              uri: this.state.userInfo? (this.state.userInfo.user.photo || "https://reactnative.dev/img/tiny_logo.png") : "https://reactnative.dev/img/tiny_logo.png"
            }}
        />
        {!this.state.userInfo &&
        <Text style={styles.lightText}>Please login to continue to the awosomeness!</Text>
        }

        {this.state.userInfo &&
        <Button
            onPress={() => this.props.navigation.navigate('Browse')}
            title="Movies List"
            accessibilityLabel="Enter popular Movies list"
        />
        }
        {!this.state.userInfo &&
        <GoogleSigninButton
            style={styles.googleSignInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
        />
        }
        {this.state.userInfo &&
        <TouchableOpacity style={styles.button} onPress={this._signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    width: 50,
    height: 50,
  },
  Image: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  googleSignInButton: {

  },
  lightText:{
    fontSize: 26,
    textAlign: 'center',
  }
});
