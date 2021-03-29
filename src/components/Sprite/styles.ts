import styled from 'styled-components/native';

interface SpriteProps {
  x: number;
  y: number;
  height?: number;
  width?: number;
}

export const SpriteContainer = styled.View<SpriteProps>`
  overflow: hidden;
  position: absolute;
  background-color: red;

  height: ${props => props.height ?? 32}px;
  width: ${props => props.width ?? 32}px;

  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

export const SpriteImage = styled.Image`
  transform: translateX(-64px);
`;
