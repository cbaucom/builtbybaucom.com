import { Video } from '@/components/Video';
import styled from 'styled-components';

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: ${({ theme }) => theme.space.md} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space.lg} 0;
  }
`;

const VideoContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  grid-template-columns: 1fr;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  margin-top: 0;
  text-align: center;
`;

const videos = [
  {
    description:
      'Anna gets a face full of snow while Jerry, in the background, does cart-wheels down the mountain. The best!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817179/crbaucom-images/sprayAnna.jpg',
    title: 'Skiing Killington. Personal Favorite.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543816933/videos/sprayAnnaKillington.mp4'
  },
  {
    description:
      'Timelapse of putting new hard wood floor down. Featuring Sam the cat, and some cookies!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817180/crbaucom-images/timelapsecover.jpg',
    title: 'Working man.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543816990/videos/TimeLapse.mov'
  },
  {
    description: 'Good times with good friends!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817169/crbaucom-images/crestedbutte.jpg',
    title: 'Crested Butte 2013',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817009/videos/CrestedButte-House.appleuniversal.mp4'
  },
  {
    description: 'This cat love da bird!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817168/crbaucom-images/cbair.jpg',
    title: 'Mowgli Cat',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817017/videos/DaMowgliBird.mp4'
  },
  {
    description: 'Lambrusco & Co. take on the slopes at Breck.',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817168/crbaucom-images/cbair.jpg',
    title: 'Breckenridge Documentary Trailer. Part 1.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817022/videos/BreckDocumentaryTrailer.mp4'
  },
  {
    description: 'Lambrusco & Co. are back with more Breckenridge action.',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817168/crbaucom-images/breckmtnview.jpg',
    title: 'Breckenridge Documentary Trailer. Part 2.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817032/videos/BreckenridgeTrailer2.mp4'
  },
  {
    description: 'Legend Larry Lambrusco conquers the world.',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817168/crbaucom-images/snowkid.jpg',
    title: 'Snow Kid. Instant Classic.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817032/videos/BreckLarryDrama.mp4'
  },
  {
    description: 'The red light is blinking!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817178/crbaucom-images/redlight.jpg',
    title: 'Is the red light ON?',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817050/videos/istheredlightON.mp4'
  },
  {
    description: 'Send it!',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817178/crbaucom-images/killingtonbikepark.jpg',
    title: 'Killington Bike Park. The best.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817063/videos/KillingtonBikePark.appleuniversal.mp4'
  },
  {
    description: 'Drive to Rockwall.',
    poster_image:
      'https://res.cloudinary.com/crbaucom/image/upload/v1543817169/crbaucom-images/driverock.jpg',
    title: 'Drive to Rockwall.',
    url: 'https://res.cloudinary.com/crbaucom/video/upload/v1543817099/videos/rockwalldrive.mov'
  }
];

export default function VideosPage() {
  return (
    <PageContainer>
      <Title>My Videos</Title>
      <VideoContainer>
        {videos.map((video, index) => (
          <Video
            description={video.description}
            key={index}
            poster={video.poster_image}
            title={video.title}
            url={video.url}
          />
        ))}
      </VideoContainer>
    </PageContainer>
  );
}
