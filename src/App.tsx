import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Sprite from './components/Sprite';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Sprite />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
