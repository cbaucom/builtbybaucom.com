import { useRef } from 'react';
import styled from 'styled-components';

type VideoProps = {
  description: string;
  poster: string;
  title: string;
  url: string;
};

const VideoWrapper = styled.article`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    transform: translateY(-2px);
  }
`;

const VideoContent = styled.div`
  aspect-ratio: 16 / 9;
  background: ${(props) => props.theme.colors.accent};
  position: relative;
  width: 100%;
`;

const VideoPlayer = styled.video`
  border-radius: 0;
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${(props) => props.theme.space.md};
`;

const VideoTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes['xl']};
  margin: 0 0 ${(props) => props.theme.space.sm} 0;
`;

const VideoDescription = styled.p`
  color: ${(props) => props.theme.colors.muted};
  margin: 0;
`;

export const Video = ({ description, poster, title, url }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <VideoWrapper>
      <VideoContent>
        <VideoPlayer controls poster={poster} ref={videoRef}>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoPlayer>
      </VideoContent>
      <Content>
        <VideoTitle>{title}</VideoTitle>
        <VideoDescription>{description}</VideoDescription>
      </Content>
    </VideoWrapper>
  );
};
