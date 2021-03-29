import React, { memo, useEffect, useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { SpriteContainer, SpriteImage } from './styles';

export interface SpriteSheetProps {
  path: string;
  rows: number;
  columns: number;
  source?: ImageSourcePropType;
}

interface SpriteProps {
  x: number;
  y: number;
  height?: number;
  width?: number;
  futureX: number;
  futureY: number;
}

const Sprite: React.FC<SpriteProps> = ({ futureX, futureY, x, y }) => {
  const [data, setData] = useState<SpriteSheetProps>({
    path: '../../assets/player01.png',
    rows: 4,
    columns: 3
  });

  const [spriteProps, setSpriteProps] = useState<SpriteProps>({
    futureX,
    futureY,
    x,
    y
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
  }, [x, y]);

  return (
    <SpriteContainer {...spriteProps}>
      <SpriteImage source={data.source} />
    </SpriteContainer>
  );
};

export default memo(Sprite);
