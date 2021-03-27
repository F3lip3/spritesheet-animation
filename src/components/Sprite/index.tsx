import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { SpriteContainer, SpriteImage } from './styles';

export interface SpriteProps {
  source: ImageSourcePropType;
  rows: number;
  columns: number;
  width?: number;
  height?: number;
}

const Sprite: React.FC = () => {
  const [sprite, setSprite] = useState<SpriteProps>({
    source: require('../../assets/player01.png'),
    rows: 4,
    columns: 3
  });

  useEffect(() => {
    if (!sprite.width && !sprite.height) {
      const spritesheet = Image.resolveAssetSource(sprite.source);
      if (spritesheet) {
        setSprite(curr => ({
          ...curr,
          width: spritesheet.width / curr.columns,
          height: spritesheet.height / curr.rows
        }));
      }
    }
  }, [sprite]);

  return (
    <SpriteContainer height={sprite.height} width={sprite.width}>
      <SpriteImage source={sprite.source} />
    </SpriteContainer>
  );
};

export default Sprite;
