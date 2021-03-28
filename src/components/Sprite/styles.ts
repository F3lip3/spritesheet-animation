import styled from 'styled-components/native';

interface SpriteProps {
  left: number;
  top: number;
  height?: number;
  width?: number;
}

export const SpriteContainer = styled.View<SpriteProps>`
  overflow: hidden;
  position: absolute;
  background-color: red;

  height: ${props => props.height ?? 16}px;
  width: ${props => props.width ?? 16}px;

  left: ${props => props.left};
  top: ${props => props.top};
`;

export const SpriteImage = styled.Image`
  transform: translateX(-64px);
`;
