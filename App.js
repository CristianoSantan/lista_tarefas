import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Platform,
  Button,
  Keyboard,
} from "react-native";

const isAndroid = Platform.OS === 'android';

export default class App extends Component  {

  constructor() {
    super();
    this.state = {
      tasks: [{ key: 0, text: "First task" }],
      viewPadding: 0,
    };
  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keybordDidShow" : "keyboardWillShow", 
      (e) => this.setState({viewPadding: e.endCoordinates.height + 10})
    );

    Keyboard.addListener(
      isAndroid ? "keybordDidShow" : "keyboardWillShow", 
      (e) => this.setState({viewPadding: 10})
    );
  }

  deleteTask = (index) => {
    this.setState((prevState) => {
      let tasks = prevState.tasks.slice();
      tasks.splice(index, 1);
      return { tasks: tasks };
    });
  };

  listItem = (props) => {
    return (
      <View> 
        <View style={styles.listItemCont}>
          <Text style={styles.listItem}>{props.item.text}</Text>
          <Button title="X" onPress={() => this.deleteTask(props.index)} />
        </View>
        <View style={styles.hr}></View>
      </View>
    );
  }

  changeTextHandler = (text) => {
    this.setState({text: text});
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.concat({
            key: prevState.tasks.length,
            text: prevState.text,
          }),
          text: "",
        }
      })
    }
  };

  render() {
    return (
      <View style={[styles.container, { paddingBottom: this.state.viewPadding}]}>
        <FlatList 
        style={styles.list} 
        data={this.state.tasks}
        renderItem={this.listItem}
        />
        <TextInput 
        style={styles.textInput} 
        onChangeText={this.changeTextHandler}
        onSubmitEditing={this.addTask}
        value={this.state.text}
        placeholder="Adicionar tarefa"
        returnKeyType="done"
        returnKeyLabel="done"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 30,
  },

  list: {
    width: "100%",
  },

  listItem: {
    padding: 2,
    paddingBottom: 2,
    fontSize: 18,
  },

  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  hr: {
    height: 1,
    backgroundColor: "gray",
  },

  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%",
  },
});
