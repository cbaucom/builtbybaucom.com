import { useState } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import { Button } from './Button';
import { ButtonContainer } from '@/styles/common';
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xs};
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.md};
  padding: ${(props) => props.theme.space.sm};

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.md};
  min-height: 150px;
  padding: ${(props) => props.theme.space.sm};
  resize: vertical;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const InlineFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};

  ${FormGroup} {
    flex: 1;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const Message = styled.div<{ type: 'error' | 'success' }>`
  background: ${(props) =>
    props.type === 'success' ? props.theme.colors.accent : '#fee2e2'};
  border-radius: 4px;
  color: ${(props) =>
    props.type === 'success' ? props.theme.colors.primary : '#dc2626'};
  padding: ${(props) => props.theme.space.sm};
  text-align: center;
`;

interface ContactFormProps {
  className?: string; // Allow styling from parent
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    subject: ''
  });
  const [status, setStatus] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        message: "Message sent successfully! I'll get back to you soon.",
        type: 'success'
      });
      setFormData({ email: '', message: '', name: '', subject: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        message: 'Failed to send message. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {status && <Message type={status.type}>{status.message}</Message>}
      <Form onSubmit={handleSubmit}>
        <InlineFormWrapper>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              required
              type="text"
              value={formData.name}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Your email"
              required
              type="email"
              value={formData.email}
            />
          </FormGroup>
        </InlineFormWrapper>
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            placeholder="Subject"
            required
            type="text"
            value={formData.subject}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Your message..."
            required
            value={formData.message}
          />
        </FormGroup>
        <ButtonContainer>
          <Button
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.subject ||
              !formData.message
            }
            type="submit"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send size={18} />
          </Button>
        </ButtonContainer>
      </Form>
    </div>
  );
};
