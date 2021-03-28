import { GameEngineSystem } from 'react-native-game-engine';

const SpriteMovement: GameEngineSystem = (entities, { touches }) => {
  const touch = touches.find(_touch => _touch.type === 'end');
  if (touch) {
    console.info('touch: ', touch);
    console.info('player: ', entities.player);
  }

  return entities;
};

export default SpriteMovement;
