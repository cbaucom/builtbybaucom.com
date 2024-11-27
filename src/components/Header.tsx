import styled from 'styled-components';
import Link from 'next/link';
import { Code2, PenTool, Mail, FolderGit } from 'lucide-react';
import { Lightbulb } from './Lightbulb';

const HeaderWrapper = styled.header`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space.sm};
  padding-bottom: ${(props) => props.theme.space.xs};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.space.sm}
      ${(props) => props.theme.space.sm} 0;
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
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 700;
  gap: ${(props) => props.theme.space.xs};
  height: 60px;
  padding: ${(props) => props.theme.space.xs};
  position: relative;

  .shape {
    stroke-dasharray: 115 150;
    stroke-dashoffset: 160;
    stroke-width: 8px;
    fill: transparent;
    stroke: ${(props) => props.theme.colors.primary};
    transition:
      stroke-width 1.5s,
      stroke-dashoffset 1.5s,
      stroke-dasharray 1.5s;
  }

  a {
    align-items: center;
    color: ${(props) => props.theme.colors.text};
    display: flex;
    gap: ${(props) => props.theme.space.xs};
    padding: 0 ${(props) => props.theme.space.md};
    position: relative;
    z-index: 2;
  }

  svg.logo-svg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  span {
    color: ${(props) => props.theme.colors.text};
  }

  .shape:hover {
    stroke-width: 8px;
    stroke-dashoffset: 100;
    stroke-dasharray: 980;
  }
`;

const NavLinks = styled.div`
  align-items: flex-start;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
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
    color: ${(props) => props.theme.colors.text};
    display: flex;
    flex: 1;
    font-weight: 500;
    gap: ${(props) => props.theme.space.xs};
    justify-content: center;
    padding: ${(props) => props.theme.space.xs} 0;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: ${(props) => props.theme.colors.accent};
      color: ${(props) => props.theme.colors.primary};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      color: ${(props) => props.theme.colors.text};
      flex: 0 0 auto;
      font-size: ${(props) => props.theme.fontSizes.md};
      padding: ${(props) => props.theme.space.xs}
        ${(props) => props.theme.space.sm} ${(props) => props.theme.space.xs};
    }
  }
`;

const DesktopNav = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    align-items: flex-start;
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

const ThemeToggle = styled.div`
  align-items: center;
  display: flex;
  overflow: visible;
  position: relative;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        {/* Desktop Navigation */}
        <DesktopNav>
          <Link href="/">
            <Logo>
              <svg
                className="logo-svg"
                height="60"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect className="shape" height="60" width="200" />
              </svg>
              <Code2 size={24} />
              <span>Built by Baucom</span>
            </Logo>
          </Link>
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
            <ThemeToggle>
              <Lightbulb />
            </ThemeToggle>
          </NavLinks>
        </DesktopNav>

        {/* Mobile Navigation */}
        <MobileNav>
          <TopRow>
            <Link href="/">
              <Logo>
                <svg
                  className="logo-svg"
                  height="60"
                  width="200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect className="shape" height="60" width="200" />
                </svg>
                <Code2 size={24} />
                <span>Built by Baucom</span>
              </Logo>
            </Link>
            <ThemeToggle>
              <Lightbulb />
            </ThemeToggle>
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
