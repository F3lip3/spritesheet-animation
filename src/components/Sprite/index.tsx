import React, { memo, useEffect, useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { SpriteContainer, SpriteImage } from './styles';

export type Direction = 'up' | 'down' | 'left' | 'right';
export type SpriteDirection = { [key in Direction]: number };

interface SpriteSheetProps {
  path: string;
  rows: number;
  columns: number;
  source?: ImageSourcePropType;
}

export interface SpriteProps {
  x: number;
  y: number;
  height?: number;
  width?: number;
  futureX: number;
  futureY: number;
  direction?: Direction;
}

interface SpriteImageProps {
  source?: ImageSourcePropType;
  direction: number;
  step: number;
  height: number;
  width: number;
}

const directions: SpriteDirection = {
  down: 0,
  left: 1,
  right: 2,
  up: 3
};

const Sprite: React.FC<SpriteProps> = ({
  futureX,
  futureY,
  x,
  y,
  direction = 'down'
}) => {
  const [data, setData] = useState<SpriteSheetProps>({
    path: '../../assets/player01.png',
    rows: 4,
    columns: 3
  });

  const [spriteProps, setSpriteProps] = useState<SpriteProps>({
    futureX,
    futureY,
    x,
    y,
    direction
  });

  const [imageProps, setImageProps] = useState<SpriteImageProps>({
    direction: directions[direction],
    step: 1,
    height: 0,
    width: 0
  });

  useEffect(() => {
    if (!data.source) {
      const source = require('../../assets/player01.png');
      const asset = Image.resolveAssetSource(source);
      if (asset) {
        setData(currentData => ({ ...currentData, source }));
        setSpriteProps(currentProps => ({
          ...currentProps,
          height: asset.height / data.rows,
          width: asset.width / data.columns
        }));
        setImageProps(currentProps => ({
          ...currentProps,
          source,
          height: asset.height / data.rows,
          width: asset.width / data.columns
        }));
      }
    }
  }, [data]);

  useEffect(() => {
    setSpriteProps(currentProps => {
      return {
        ...currentProps,
        futureX,
        futureY
      };
    });
  }, [futureX, futureY]);

  useEffect(() => {
    setSpriteProps(currentProps => ({
      ...currentProps,
      x,
      y
    }));
    setImageProps(currentProps => {
      let { step } = currentProps;
      const finished = x === spriteProps.futureX && y === spriteProps.futureY;
      if (finished) {
        step = 1;
      } else {
        const stepSize =
          currentProps.direction !== directions[direction] ||
          ((direction === 'left' || direction === 'right') &&
            x % Math.floor(currentProps.width / data.columns) === 0) ||
          ((direction === 'down' || direction === 'up') &&
            y % Math.floor(currentProps.height / data.columns) === 0)
            ? 1
            : 0;

        if (step + stepSize >= data.columns) {
          step = 0;
        } else {
          step += stepSize;
        }
      }

      return {
        ...currentProps,
        direction: directions[direction],
        step
      };
    });
  }, [x, y, direction, data.columns, spriteProps.futureX, spriteProps.futureY]);

  return (
    <SpriteContainer {...spriteProps}>
      <SpriteImage {...imageProps} />
    </SpriteContainer>
  );
};

export default memo(Sprite);
