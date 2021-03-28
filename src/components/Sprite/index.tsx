import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { SpriteContainer, SpriteImage } from './styles';

export interface SpriteSheetProps {
  path: string;
  rows: number;
  columns: number;
  source?: ImageSourcePropType;
}

interface SpritePosition {
  left?: number;
  top?: number;
}

interface SpriteProps {
  left: number;
  top: number;
  height?: number;
  width?: number;
}

const Sprite: React.FC<SpritePosition> = ({ left = 0, top = 0 }) => {
  const [data, setData] = useState<SpriteSheetProps>({
    path: '../../assets/player01.png',
    rows: 4,
    columns: 3
  });

  const [spriteProps, setSpriteProps] = useState<SpriteProps>({
    left,
    top
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
    setSpriteProps(currentProps => ({ ...currentProps, left, top }));
  }, [left, top]);

  useEffect(() => {
    console.info('sprite props:', spriteProps);
  }, [spriteProps]);

  return (
    <SpriteContainer {...spriteProps}>
      <SpriteImage source={data.source} />
    </SpriteContainer>
  );
};

export default Sprite;
