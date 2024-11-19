import styled from 'styled-components';

const VideoContainer = styled.div`
  margin: ${(props) => props.theme.space.md} 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  width: 100%;
`;

const IFrame = styled.iframe`
  border: 0;
  border-radius: 8px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

interface YouTubeProps {
  id: string;
}

export const YouTube = ({ id }: YouTubeProps) => {
  return (
    <VideoContainer>
      <IFrame
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
      />
    </VideoContainer>
  );
};
