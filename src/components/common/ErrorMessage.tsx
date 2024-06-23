import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorMessage = ({ error }: { error: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{error}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
});

export default ErrorMessage;
