import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Sprite from './components/Sprite';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'yellow' }} />
      <View style={styles.container}>
        <Sprite />
        <StatusBar hidden />
      </View>
    </>
  );
};

export default App;
