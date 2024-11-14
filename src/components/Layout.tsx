import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';

const Main = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.xl};
  min-height: calc(100vh - 140px);
  padding: ${(props) => props.theme.space.md};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.space.lg};
  }
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
