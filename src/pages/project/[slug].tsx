import styled from 'styled-components';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { getPost, getAllPosts, getAdjacentPosts, Post } from '@/lib/mdx';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { YouTube } from '@/components/YouTube';
import { PostNavigation } from '@/components/PostNavigation';
import Image from 'next/image';

const Article = styled.article`
  margin: 0 auto;
  max-width: 920px;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: ${(props) => props.theme.space.xl};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 300px;
  }
`;

const Header = styled.header`
  margin-bottom: ${(props) => props.theme.space.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  margin-bottom: ${(props) => props.theme.space.md};
`;

const Meta = styled.div`
  color: ${(props) => props.theme.colors.muted};
  display: flex;
  gap: ${(props) => props.theme.space.md};
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space.md};
`;

const MetaItem = styled.span`
  align-items: center;
  display: flex;
  gap: ${(props) => props.theme.space.xs};
`;

const Tags = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.xxs};
  justify-content: center;
`;

const TagItem = styled.span`
  background: ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.sm};
  padding: 2px 8px;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: 1.8;

  h2 {
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    margin: ${(props) => props.theme.space.xl} 0
      ${(props) => props.theme.space.md};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes['2xl']};
    margin: ${(props) => props.theme.space.lg} 0
      ${(props) => props.theme.space.md};
  }

  p {
    margin-bottom: ${(props) => props.theme.space.md};
  }

  pre {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 8px;
    margin: ${(props) => props.theme.space.md} 0;
    overflow-x: auto;
    padding: ${(props) => props.theme.space.md};
  }

  img {
    border-radius: 8px;
    height: auto;
    margin: ${(props) => props.theme.space.md} 0 2px;
    max-width: 100%;
  }

  img:not([class]) {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  }

  img + em {
    color: ${(props) => props.theme.colors.muted};
    display: block;
    font-size: ${(props) => props.theme.fontSizes.sm};
    text-align: center;
  }
`;

type ProjectPostProps = {
  mdxSource: MDXRemoteSerializeResult;
  next: Post;
  post: Post;
  previous: Post;
};

export default function ProjectPost({
  mdxSource,
  next,
  post,
  previous
}: ProjectPostProps) {
  const date = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <Article>
      {post.cover_image && (
        <HeroImage>
          <Image
            alt={post.title}
            fill
            priority
            src={post.cover_image}
            style={{ objectFit: 'cover' }}
          />
        </HeroImage>
      )}
      <Header>
        <Title>{post.title}</Title>
        <Meta>
          <MetaItem>
            <Calendar size={16} />
            {date}
          </MetaItem>
          <MetaItem>
            <Clock size={16} />
            {post.readingTime}
          </MetaItem>
        </Meta>
        <Tags>
          {post.tags.map((tag: string) => (
            <TagItem key={tag}>{tag}</TagItem>
          ))}
        </Tags>
      </Header>
      <Content>
        <MDXRemote {...mdxSource} components={{ YouTube }} />
      </Content>
      <PostNavigation next={next} previous={previous} type="project" />
    </Article>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts('project');
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));

  return {
    fallback: false,
    paths
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPost('project', params.slug);

  if (!post) {
    return {
      notFound: true
    };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [remarkGfm]
    }
  });

  const adjacentPosts = getAdjacentPosts('project', params.slug);

  return {
    props: {
      mdxSource,
      post,
      ...adjacentPosts
    }
  };
}
