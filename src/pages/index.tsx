import styled from 'styled-components';
import { FolderGit, PenTool, Mail } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { ContactForm } from '@/components/ContactForm';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/lib/mdx';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import { ButtonContainer } from '@/styles/common';

const Hero = styled.section`
  margin-bottom: ${(props) => props.theme.space['2xl']};
  padding: ${(props) => props.theme.space['sm']};
  text-align: center;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: ${(props) => props.theme.space['xs']};
    padding: ${(props) => props.theme.space['xl']};
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  margin-bottom: ${(props) => props.theme.space.md};
  margin-top: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSizes['5xl']};
  }
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.muted};
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin: 0 auto;
  max-width: 768px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xl};
  margin-bottom: ${(props) => props.theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  gap: ${(props) => props.theme.space.sm};
`;

const Grid = styled.div`
  display: grid;
  gap: ${(props) => props.theme.space.lg};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const ContactSection = styled.section`
  margin: ${(props) => props.theme.space['2xl']} auto 0;
  margin-top: ${(props) => props.theme.space['2xl']};
`;

const ContactTitle = styled(SectionTitle)`
  text-align: center;
`;

interface HomeProps {
  latestProjects: Post[];
  latestPosts: Post[];
}

export default function Home({ latestPosts, latestProjects }: HomeProps) {
  const router = useRouter();

  return (
    <>
      <Hero>
        <Title>Freelance Software Engineer</Title>
        <Subtitle>
          Building progressive, responsive, mobile and web apps with the best
          technologies.
        </Subtitle>
      </Hero>

      <Section>
        <SectionTitle>
          <FolderGit />
          Latest Projects
        </SectionTitle>
        <Grid>
          {latestProjects.map((project) => (
            <PostCard key={project.slug} post={project} type="project" />
          ))}
        </Grid>
        <ButtonContainer>
          <Button onClick={() => router.push('/projects/1')}>
            See more projects
          </Button>
        </ButtonContainer>
      </Section>

      <Section>
        <SectionTitle>
          <PenTool />
          Latest Posts
        </SectionTitle>
        <Grid>
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} type="blog" />
          ))}
        </Grid>
        <ButtonContainer>
          <Button onClick={() => router.push('/blog')}>
            Check out other blog posts
          </Button>
        </ButtonContainer>
      </Section>

      <ContactSection>
        <ContactTitle>
          <Mail />
          Get in Touch
        </ContactTitle>
        <ContactForm />
      </ContactSection>
    </>
  );
}

export async function getStaticProps() {
  const latestProjects = getAllPosts('project').slice(0, 3);
  const latestPosts = getAllPosts('blog').slice(0, 3);

  return {
    props: {
      latestPosts,
      latestProjects
    }
  };
}
