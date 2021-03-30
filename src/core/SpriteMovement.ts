import { GameEngineSystem } from 'react-native-game-engine';

interface SpriteMovementProps {
  buffer: {
    x: number;
    y: number;
  };
  step: {
    x: number;
    y: number;
  };
  speed: number;
}

const movementData: SpriteMovementProps = {
  buffer: {
    x: 0,
    y: 0
  },
  step: {
    x: 32,
    y: 32
  },
  speed: 2
};

const SpriteMovement: GameEngineSystem = (entities, { touches }) => {
  const { player } = entities;
  if (player) {
    const touch = touches.find(_touch => _touch.type === 'end');

    if (touch?.event) {
      const futureX = Math.round(touch.event.pageX);
      const futureY = Math.round(touch.event.pageY);
      const remainderX = futureX % movementData.step.x;
      const remainderY = futureY % movementData.step.y;

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
      stepX = movementData.speed * (player.x > player.futureX ? -1 : 1);
    }

    let stepY = 0;
    if (player.y !== player.futureY) {
      stepY = movementData.speed * (player.y > player.futureY ? -1 : 1);
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

      if (
        distanceX > distanceY &&
        movementData.buffer.x >= 0 &&
        movementData.buffer.y === 0
      ) {
        movementData.buffer.x += movementData.speed;
        if (movementData.buffer.x === movementData.step.x) {
          movementData.buffer.x = 0;
        }

        return {
          ...entities,
          player: {
            ...player,
            x: player.x + stepX,
            direction: stepX > 0 ? 'right' : 'left'
          }
        };
      }

      movementData.buffer.y += movementData.speed;
      if (movementData.buffer.y === movementData.step.y) {
        movementData.buffer.y = 0;
      }

      return {
        ...entities,
        player: {
          ...player,
          y: player.y + stepY,
          direction: stepY > 0 ? 'down' : 'up'
        }
      };
    }
  }

  return entities;
};

export default SpriteMovement;
