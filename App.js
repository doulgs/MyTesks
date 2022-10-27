import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";

import * as Animatable from "react-native-animatable";

import firebase from "./src/services/firebaseConection";

import TaskList from "./src/components/TaskList";
import Login from "./src/components/Login";
import { Octicons } from "@expo/vector-icons";
import Header from "./src/components/Header";

export default function App() {
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [state, setState] = useState("open");
  const [key, setKey] = useState("");

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .once("value", (snapshot) => {
          setTasks([]);

          snapshot?.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              estado: childItem.val().estado,
            };
            setTasks((oldTasks) => [...oldTasks, data]);
          });
        });
    }

    getUser();
  }, [user, state]);

  function handleAdd() {
    if (newTask === "") {
      return;
    }

    if (key !== "") {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key === key);
          let taskClone = tasks;
          taskClone[taskIndex].nome = newTask;

          setTasks([...taskClone]);
        });
      Keyboard.dismiss();
      setNewTask("");
      setKey("");
      return;
    }

    let tarefas = firebase.database().ref("tarefas").child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
        estado: state,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
          estado: state,
        };
        setTasks((oldTasks) => [...oldTasks, data]);

        Keyboard.dismiss();
      });
    setNewTask("");
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTask = tasks.filter((item) => item.key !== key);
        setTasks(findTask);
      });
  }

  function handleEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  function cancelEdit(data) {
    setKey("");
    setNewTask("");
    Keyboard.dismiss();
  }

  if (!user) {
    return <Login chanceStatus={(user) => setUser(user)} />;
  }

  return (
    <>
      <StatusBar translucent={false} backgroundColor="#f2f6fc" />
      <SafeAreaView style={styles.container}>
        <Header />
        <FlatList
          style={styles.listStyle}
          data={tasks}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TaskList
              data={item}
              deleteItem={handleDelete}
              editItem={handleEdit}
            />
          )}
        />

        {key.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={cancelEdit}>
              <Octicons name="x-circle" size={20} color="#FF0000" />
            </TouchableOpacity>
            <Text style={{ color: "#FF0000", marginLeft: 7 }}>
              Você esta editando uma Tarefa.
            </Text>
          </View>
        )}

        <View style={styles.containerTask}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui a tarefa que deseja adicionar..."
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
            ref={inputRef}
          />

          <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
  containerTask: {
    flexDirection: "row",
    marginBottom: 20,
  },
  listStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#620623",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
    marginVertical: 20,
  },
  buttonAdd: {
    backgroundColor: "#620623",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 22,
  },
});
