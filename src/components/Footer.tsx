import styled from 'styled-components';
import { Github, Linkedin, X } from 'lucide-react';

const FooterWrapper = styled.footer`
  background: ${(props) => props.theme.colors.background};
  border-top: 1px solid ${(props) => props.theme.colors.accent};
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
      color: ${(props) => props.theme.colors.primary};
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
          href='https://github.com/cbaucom'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Github size={20} />
        </a>
        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
          <X size={20} />
        </a>
        <a
          href='https://linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
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
