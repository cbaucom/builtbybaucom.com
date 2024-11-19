import styled from 'styled-components';
import Link from 'next/link';
import { Code2, PenTool, Mail, FolderGit } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const HeaderWrapper = styled.header`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space.sm};
  padding-bottom: ${(props) => props.theme.space.xs};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    border-bottom: 1px solid ${(props) => props.theme.colors.muted};
    padding: ${(props) => props.theme.space.md};
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  padding: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    margin: 0 auto;
    max-width: ${(props) => props.theme.breakpoints.xl};
    padding: 0 ${(props) => props.theme.space.lg};
  }
`;

const TopRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 700;
  gap: ${(props) => props.theme.space.xs};

  a {
    align-items: center;
    color: ${(props) => props.theme.colors.text};
    display: flex;
    gap: ${(props) => props.theme.space.xs};
  }
`;

const NavLinks = styled.div`
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  display: flex;
  gap: ${(props) => props.theme.space.md};
  justify-content: space-between;
  margin-left: 50%;
  padding: 0 1rem;
  transform: translateX(-50%);
  width: 100vw;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    background: ${(props) => props.theme.colors.background};
    margin-left: auto;
    padding-top: ${(props) => props.theme.space.xs};
    transform: initial;
    width: auto;
  }

  a {
    align-items: center;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.background};
    display: flex;
    font-weight: 500;
    gap: ${(props) => props.theme.space.xs};
    padding: ${(props) => props.theme.space.xs} 0;
    transition: all 0.2s ease;

    &:hover {
      background: ${(props) => props.theme.colors.accent};
      color: ${(props) => props.theme.colors.primary};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      color: ${(props) => props.theme.colors.text};
      font-size: ${(props) => props.theme.fontSizes.md};
      padding: ${(props) => props.theme.space.xs}
        ${(props) => props.theme.space.sm} ${(props) => props.theme.space.xs};
    }
  }
`;

const DesktopNav = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xs};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        {/* Desktop Navigation */}
        <DesktopNav>
          <Logo>
            <Link href="/">
              <Code2 size={24} />
              <span>Built by Baucom</span>
            </Link>
          </Logo>
          <NavLinks>
            <Link href="/projects/1">
              <FolderGit size={18} />
              <span>Projects</span>
            </Link>
            <Link href="/blog">
              <PenTool size={18} />
              <span>Blog</span>
            </Link>
            <Link href="/contact">
              <Mail size={18} />
              <span>Contact</span>
            </Link>
            <ThemeToggle />
          </NavLinks>
        </DesktopNav>

        {/* Mobile Navigation */}
        <MobileNav>
          <TopRow>
            <Logo>
              <Link href="/">
                <Code2 size={24} />
                <span>Built by Baucom</span>
              </Link>
            </Logo>
            <ThemeToggle />
          </TopRow>
          <NavLinks>
            <Link href="/projects/1">
              <FolderGit size={18} />
              <span>Projects</span>
            </Link>
            <Link href="/blog">
              <PenTool size={18} />
              <span>Blog</span>
            </Link>
            <Link href="/contact">
              <Mail size={18} />
              <span>Contact</span>
            </Link>
          </NavLinks>
        </MobileNav>
      </Nav>
    </HeaderWrapper>
  );
};
