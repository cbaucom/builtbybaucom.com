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

interface ProjectsPageProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function ProjectsPage({
  currentPage,
  posts,
  totalPages
}: ProjectsPageProps) {
  return (
    <>
      <Title>Projects</Title>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} type="project" />
        ))}
      </Grid>
      <Pagination
        basePath="/projects"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export async function getStaticPaths() {
  const { totalPages } = getPaginatedPosts('project', 1);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) }
  }));

  return {
    fallback: false,
    paths
  };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const page = parseInt(params.page);
  const { currentPage, posts, totalPages } = getPaginatedPosts('project', page);

  return {
    props: {
      currentPage,
      posts,
      totalPages
    }
  };
}
