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

interface BlogPageProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function BlogPage({
  currentPage,
  posts,
  totalPages
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
        basePath="/blog"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export async function getStaticPaths() {
  const { totalPages } = getPaginatedPosts('blog', 1);

  // Create paths for all pages except page 1
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: String(i + 2) } // Start from page 2
  }));

  return {
    fallback: false,
    paths
  };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10);

  // Redirect to /blog if someone tries to access /blog/1
  if (pageNumber === 1) {
    return {
      redirect: {
        destination: '/blog',
        permanent: true
      }
    };
  }

  const { posts, currentPage, totalPages } = getPaginatedPosts(
    'blog',
    pageNumber
  );

  // Handle invalid page numbers
  if (!posts.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      currentPage,
      posts,
      totalPages
    }
  };
}
