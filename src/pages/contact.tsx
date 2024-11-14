import styled from 'styled-components';
import { ContactForm } from '@/components/ContactForm';

const Container = styled.div`
  margin: 0 auto;
  max-width: 768px;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes['4xl']};
  margin-bottom: ${(props) => props.theme.space.xl};
  text-align: center;
`;

export default function Contact() {
  return (
    <Container>
      <Title>Get in Touch</Title>
      <ContactForm />
    </Container>
  );
}
