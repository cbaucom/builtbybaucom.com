import styled from 'styled-components';
import { getPaginatedPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import type { Post } from '@/lib/mdx';

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  margin-bottom: ${(props) => props.theme.space.xl};
`;

const Grid = styled.div`
  display: grid;
  gap: ${(props) => props.theme.space.lg};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

interface BlogPageProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function BlogPage({
  currentPage,
  posts,
  totalPages,
}: BlogPageProps) {
  return (
    <>
      <Title>Blog Posts</Title>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} type="blog" />
        ))}
      </Grid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog/page"
      />
    </>
  );
}

export async function getStaticPaths() {
  const { totalPages } = getPaginatedPosts('blog', 1);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const page = parseInt(params.page);
  const { currentPage, posts, totalPages } = getPaginatedPosts('blog', page);

  return {
    props: {
      posts,
      currentPage,
      totalPages,
    },
  };
}
