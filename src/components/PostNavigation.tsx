import styled from 'styled-components';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const Nav = styled.nav`
  border-top: 1px solid ${(props) => props.theme.colors.accent};
  display: grid;
  gap: ${(props) => props.theme.space.md};
  grid-template-columns: 1fr 1fr;
  margin-top: ${(props) => props.theme.space.xl};
  padding-top: ${(props) => props.theme.space.lg};
  width: 100%;
`;

const NavLink = styled.a`
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  display: flex;
  gap: ${(props) => props.theme.space.sm};
  padding: ${(props) => props.theme.space.md};
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
    border-color: ${(props) => props.theme.colors.primary};

    /* target the label and title */
    span {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  &.previous {
    justify-self: start;
  }

  &.next {
    justify-self: end;
    text-align: right;
  }
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xs};
  width: 100%;
`;

const Label = styled.span`
  color: ${(props) => props.theme.colors.muted};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
`;

interface AdjacentPost {
  title: string;
  slug: string;
  date: string;
}

interface PostNavigationProps {
  previous: AdjacentPost | null;
  next: AdjacentPost | null;
  type: 'blog' | 'project';
}

export const PostNavigation = ({
  next,
  previous,
  type
}: PostNavigationProps) => {
  return (
    <Nav>
      {next && (
        <Link
          href={
            type === 'blog'
              ? `/blog/${format(new Date(next.date), 'yyyy')}/${next.slug}`
              : `/project/${next.slug}`
          }
          legacyBehavior
          passHref
        >
          <NavLink className="next">
            <ChevronLeft size={20} />
            <LinkContent>
              <Label>Next {type}</Label>
              <Title>{next.title}</Title>
            </LinkContent>
          </NavLink>
        </Link>
      )}
      {previous && (
        <Link
          href={
            type === 'blog'
              ? `/blog/${format(new Date(previous.date), 'yyyy')}/${previous.slug}`
              : `/project/${previous.slug}`
          }
          legacyBehavior
          passHref
        >
          <NavLink className="previous">
            <LinkContent>
              <Label>Previous {type}</Label>
              <Title>{previous.title}</Title>
            </LinkContent>
            <ChevronRight size={20} />
          </NavLink>
        </Link>
      )}
    </Nav>
  );
};
