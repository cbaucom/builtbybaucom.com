import styled from 'styled-components';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import type { Post } from '@/lib/mdx';

const Card = styled.article`
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

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  background: ${(props) => props.theme.colors.accent};
  cursor: pointer;
  height: 200px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CoverImage = styled.img`
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  width: 100%;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${(props) => props.theme.space.md};
`;

const Title = styled.h2`
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  margin: 0 0 ${(props) => props.theme.space.sm} 0;

  a {
    color: ${(props) => props.theme.colors.text};

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.muted};
  flex-grow: 1;
  margin: 0;
`;

const Meta = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.muted};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.sm};
  gap: ${(props) => props.theme.space.md};
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space.md};
  padding-top: ${(props) => props.theme.space.md};
`;

const MetaItem = styled.span`
  align-items: center;
  display: flex;
  gap: ${(props) => props.theme.space.xs};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space.xxs};
  margin-bottom: ${(props) => props.theme.space.md};
`;

const Tag = styled.span`
  background: ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSizes.xs};
  padding: 2px 8px;
`;

interface PostCardProps {
  post: Post;
  type: 'blog' | 'project';
}

export const PostCard = ({ post, type }: PostCardProps) => {
  const { cover_image, date, readingTime, slug } = post;

  const href =
    type === 'blog'
      ? `/blog/${format(new Date(post.date), 'yyyy')}/${slug}`
      : `/project/${slug}`;

  return (
    <Card>
      {cover_image && (
        <Link href={href}>
          <ImageContainer>
            <CoverImage src={cover_image} alt={post.title} loading="lazy" />
          </ImageContainer>
        </Link>
      )}
      <Content>
        <Title>
          <Link href={href}>{post.title}</Link>
        </Title>
        <Tags>
          {post.tags && post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </Tags>
        <Description>{post.description}</Description>
        <Meta>
          <MetaItem>
            <Calendar size={16} />
            {format(new Date(date), 'MMMM dd, yyyy')}
          </MetaItem>
          <MetaItem>
            <Clock size={16} />
            {readingTime}
          </MetaItem>
        </Meta>
      </Content>
    </Card>
  );
};
