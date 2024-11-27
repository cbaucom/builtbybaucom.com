import styled from 'styled-components';
import { Github, Instagram, Linkedin } from 'lucide-react';

const FooterWrapper = styled.footer`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space.md};
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.md};
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space.sm};

  a {
    color: ${(props) => props.theme.colors.muted};
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const Copyright = styled.p`
  color: ${(props) => props.theme.colors.muted};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <SocialLinks>
        <a
          href="https://github.com/cbaucom"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Github size={20} />
        </a>
        <a
          href="https://instagram.com/chrisbaucom"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/chrisbaucom"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin size={20} />
        </a>
      </SocialLinks>
      <Copyright>
        © {new Date().getFullYear()} Built by Baucom. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};
