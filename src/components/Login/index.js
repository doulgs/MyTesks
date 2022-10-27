import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import firebase from "../../services/firebaseConection";

export default function Login({ chanceStatus }) {
  const [type, setType] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (type === "login") {
      // logar
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          chanceStatus(user.user.uid);
        })
        .catch((error) => {
          console.log(error);
          alert("Ops parece que deu algum erro");
        });
    } else {
      // register
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          chanceStatus(user.user.uid);
        })
        .catch((error) => {
          console.log(error);
          alert("Ops parece que algo deu algum erro");
        });
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/wallaper.png")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/loginOnlineOrganizer.png")}
          style={{ width: 250, height: 250 }}
        />
        <TextInput
          placeholder="Seu email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Seu Senha"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={[
            styles.handleLogin,
            { backgroundColor: type === "login" ? "#620623" : "#141414" },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>
            {type === "login" ? "Acessar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setType((type) => (type === "login" ? "cadastrar" : "login"))
          }
        >
          <Text style={{ textAlign: "center" }}>
            {type === "login" ? "Criar um conta" : "Já tenho uma conta."}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 7,
    height: 45,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
  },
  handleLogin: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "90%",
    marginBottom: 10,
    borderRadius: 7,
  },
  loginText: {
    color: "#fff",
  },
});
