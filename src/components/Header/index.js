import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá Bem Vindo</Text>
      <Text style={styles.subTitle}>Quais são as tarefas de hoje?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#620623",
    marginBottom: 20,
  },
  title: {
    paddingLeft: 20,
    fontSize: 32,
  },
  subTitle: {
    fontSize: 17,
    alignSelf: "center",
    paddingBottom: 20,
  },
});
