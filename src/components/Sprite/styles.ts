import styled from 'styled-components/native';

interface SpriteContainerProps {
  left: number;
  top: number;
  height?: number;
  width?: number;
}

export const SpriteContainer = styled.View<SpriteContainerProps>`
  overflow: hidden;
  position: absolute;
  background-color: red;

  height: ${props => props.height ?? 16}px;
  width: ${props => props.width ?? 16}px;

  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

export const SpriteImage = styled.Image`
  transform: translateX(-64px);
`;
