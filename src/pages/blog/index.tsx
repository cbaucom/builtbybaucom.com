import styled from 'styled-components';
import { getPaginatedPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import type { Post } from '@/lib/mdx';

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  margin-bottom: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xs};
`;

const Grid = styled.div`
  display: grid;
  gap: ${(props) => props.theme.space.lg};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
export default function BlogIndexPage({
  posts,
  totalPages
}: {
  posts: Post[];
  totalPages: number;
}) {
  return (
    <>
      <Title>Blog Posts</Title>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} type="blog" />
        ))}
      </Grid>
      <Pagination basePath="/blog" currentPage={1} totalPages={totalPages} />
    </>
  );
}

export async function getStaticProps() {
  const { posts, totalPages } = getPaginatedPosts('blog', 1);

  return {
    props: {
      posts,
      totalPages
    }
  };
}
