import styled from 'styled-components';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Nav = styled.nav`
  display: flex;
  gap: ${(props) => props.theme.space.sm};
  justify-content: center;
  margin-top: ${(props) => props.theme.space.xl};
`;

const PageLink = styled.a<{ $active?: boolean }>`
  align-items: center;
  background: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.background};
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary : props.theme.colors.accent};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export const Pagination = ({
  basePath,
  currentPage,
  totalPages
}: PaginationProps) => {
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}/${page}`;
  };

  return (
    <Nav>
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)} legacyBehavior passHref>
          <PageLink>
            <ChevronLeft size={20} />
          </PageLink>
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link href={getPageUrl(page)} key={page} legacyBehavior passHref>
          <PageLink $active={page === currentPage}>{page}</PageLink>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)} legacyBehavior passHref>
          <PageLink>
            <ChevronRight size={20} />
          </PageLink>
        </Link>
      )}
    </Nav>
  );
};
