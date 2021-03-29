import { GameEngineSystem } from 'react-native-game-engine';

const STEP_X = 32;
const STEP_Y = 32;

const SpriteMovement: GameEngineSystem = (entities, { touches }) => {
  const { player } = entities;
  if (player) {
    const touch = touches.find(_touch => _touch.type === 'end');

    if (touch?.event) {
      const futureX = Math.round(touch.event.pageX);
      const futureY = Math.round(touch.event.pageY);
      const remainderX = futureX % STEP_X;
      const remainderY = futureY % STEP_Y;

      return {
        ...entities,
        player: {
          ...player,
          futureX: remainderX === 0 ? futureX : futureX - remainderX,
          futureY: remainderY === 0 ? futureY : futureY - remainderY
        }
      };
    }

    let stepX = 0;
    if (player.x !== player.futureX) {
      stepX = STEP_X * (player.x > player.futureX ? -1 : 1);
    }

    let stepY = 0;
    if (player.y !== player.futureY) {
      stepY = STEP_Y * (player.y > player.futureY ? -1 : 1);
    }

    if (stepX !== 0 || stepY !== 0) {
      let distanceX = 0;
      if (stepX !== 0) {
        distanceX =
          stepX > 0 ? player.futureX - player.x : player.x - player.futureX;
      }

      let distanceY = 0;
      if (stepY !== 0) {
        distanceY =
          stepY > 0 ? player.futureY - player.y : player.y - player.futureY;
      }

      if (distanceX > distanceY) {
        return {
          ...entities,
          player: {
            ...player,
            x: player.x + stepX
          }
        };
      }

      return {
        ...entities,
        player: {
          ...player,
          y: player.y + stepY
        }
      };
    }
  }

  return entities;
};

export default SpriteMovement;
