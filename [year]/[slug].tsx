import styled from 'styled-components';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import {
  getAllPosts,
  getBlogPostByYearAndSlug,
  Post,
  getAdjacentPosts
} from '@/lib/mdx';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import { PostNavigation } from '@/components/PostNavigation';
import { YouTube } from '@/components/YouTube';
import { remarkYoutube } from '@/lib/remarkYoutube';

const Article = styled.article`
  margin: 0 auto;
  max-width: 800px;
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
  gap: ${(props) => props.theme.space.xs};
  justify-content: center;
`;

const TagItem = styled.span`
  background: ${(props) => props.theme.colors.accent};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.primary};
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
    background: ${(props) => props.theme.colors.accent};
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

interface BlogPostProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  previous: {
    title: string;
    slug: string;
    date: string;
  } | null;
  next: {
    title: string;
    slug: string;
    date: string;
  } | null;
}

export default function BlogPost({
  mdxSource,
  next,
  post,
  previous
}: BlogPostProps) {
  const date = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <Article>
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
          {post.tags.map((tag) => (
            <TagItem key={tag}>{tag}</TagItem>
          ))}
        </Tags>
      </Header>
      <Content>
        <MDXRemote {...mdxSource} components={{ YouTube }} />
      </Content>
      <PostNavigation next={next} previous={previous} type="blog" />
    </Article>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts('blog');
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
      year: format(new Date(post.date), 'yyyy')
    }
  }));

  return {
    fallback: false,
    paths
  };
}

export async function getStaticProps({
  params
}: {
  params: { year: string; slug: string };
}) {
  const post = getBlogPostByYearAndSlug(params.year, params.slug);

  if (!post) {
    return {
      notFound: true
    };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        rehypeHighlight
      ],
      remarkPlugins: [remarkGfm, remarkYoutube]
    },
    parseFrontmatter: false
  });

  const adjacentPosts = getAdjacentPosts('blog', params.slug);

  return {
    props: {
      mdxSource,
      post,
      ...adjacentPosts
    }
  };
}
