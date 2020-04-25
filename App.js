// import 'react-native-gesture-handler';
// import * as React from 'react';
// import {
//   TextInput,
//   View,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
//
// export default class App extends React.Component {
//   state = {
//     inputValue: '',
//     todos: [],
//   };
//
//   changeText = value => {
//     this.setState({
//       inputValue: value,
//     });
//   };
//
//   addItem = () => {
//     if (this.state.inputValue !== '') {
//       this.setState(prevState => {
//         const newToDo = {
//           title: this.state.inputValue,
//           createdAt: Date.now(),
//         };
//
//         var todos = this.state.todos.concat(newToDo);
//
//         this.setState({
//           todos: todos,
//         });
//       });
//     }
//   };
//
//   // render() {
//   //   const todos = this.state.todos.reverse().map((todo, key) => (
//   //     <View style={{flexDirection: 'row', marginTop: 20}}>
//   //       <TouchableOpacity
//   //         style={{
//   //           width: 20,
//   //           height: 20,
//   //           borderRadius: 15,
//   //           borderWidth: 3,
//   //           borderColor: 'black',
//   //           margin: 15,
//   //         }}
//   //       />
//   //       <Text
//   //         style={{paddingLeft: 5, marginTop: 10, fontSize: 28, color: 'black'}}>
//   //         {todo.title}
//   //       </Text>
//   //     </View>
//   //   ));
//   //   return (
//   //     <View style={{flex: 1}}>
//   //       <StatusBar barStyle="light-content" />
//   //       <View>
//   //         <TextInput
//   //           style={styles.input}
//   //           value={this.state.inputValue}
//   //           onSubmitEditing={this.addItem}
//   //           onChangeText={this.changeText}
//   //           placeholder="Type here to add a to do."
//   //           placeholderTextColor={'#000'}
//   //           multiline={true}
//   //           autoCapitalize="sentences"
//   //           underlineColorAndroid="transparent"
//   //           selectionColor={'white'}
//   //           maxLength={30}
//   //           returnKeyType="done"
//   //           autoCorrect={false}
//   //           blurOnSubmit={true}
//   //         />
//   //       </View>
//   //       <View>
//   //         {todos}
//   //       </View>
//   //     </View>
//   //   );
//   // }
// }
//
// const styles = {
//   input: {
//     marginTop: 30,
//     paddingTop: 10,
//     paddingRight: 15,
//     paddingLeft: 15,
//     fontSize: 34,
//     color: 'black',
//     fontWeight: '500',
//   },
// };
import React from 'react';
import {Component} from 'react';

import MainStackNavigator from './src/components/navigation/MainStackNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: {...this.props},
    };
  }

  render() {
    return <MainStackNavigator />;
  }
}

// import React from 'react';
//
// import MainStackNavigator from './src/navigation/MainStackNavigator';
//
// export default function App() {
//   return <MainStackNavigator />;
// }
