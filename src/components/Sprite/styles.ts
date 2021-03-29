import styled from 'styled-components/native';

interface SpriteProps {
  x: number;
  y: number;
  height?: number;
  width?: number;
}

interface SpriteImageProps {
  direction: number;
  step: number;
  height: number;
  width: number;
}

export const SpriteContainer = styled.View<SpriteProps>`
  overflow: hidden;
  position: absolute;

  height: ${props => props.height ?? 32}px;
  width: ${props => props.width ?? 32}px;

  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

export const SpriteImage = styled.Image<SpriteImageProps>`
  transform: translateX(${props => props.step * props.width * -1}px)
    translateY(${props => props.direction * props.height * -1}px);
`;
