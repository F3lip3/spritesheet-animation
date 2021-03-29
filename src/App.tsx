import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import Sprite from './components/Sprite';
import SpriteMovement from './core/SpriteMovement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'relative'
  },
  game: {
    flex: 1,
    backgroundColor: '#303030',
    width: '100%'
  }
});

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'yellow' }} />
      <View style={styles.container}>
        <GameEngine
          style={styles.game}
          systems={[SpriteMovement]}
          entities={{
            player: {
              futureX: 0,
              futureY: 0,
              x: 0,
              y: 0,
              renderer: Sprite
            }
          }}
        >
          <StatusBar hidden />
        </GameEngine>
      </View>
    </>
  );
};

export default App;
