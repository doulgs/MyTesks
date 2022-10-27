import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

import { Octicons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";

export default function TaskList({ data, deleteItem, editItem, concItem }) {
  return (
    <Animatable.View animation="zoomIn" style={styles.container}>
      <View style={styles.containerDesc}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={{ color: "#FFF" }}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity onPress={() => deleteItem(data.key)}>
        <Octicons name="trash" size={20} color="#FFF" />
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#404554",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  containerDesc: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
