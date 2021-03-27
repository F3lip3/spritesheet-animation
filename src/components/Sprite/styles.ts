import styled from 'styled-components/native';

interface SpriteContainerProps {
  height?: number;
  width?: number;
}

export const SpriteContainer = styled.View<SpriteContainerProps>`
  overflow: hidden;
  height: ${props => props.height ?? 16}px;
  width: ${props => props.width ?? 16}px;
`;

export const SpriteImage = styled.Image`
  transform: translateX(-64px);
`;
