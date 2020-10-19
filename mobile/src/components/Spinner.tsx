import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface SpinnerProps {
  color: string;
}

const Spinner = ({color}: SpinnerProps) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Spinner;
