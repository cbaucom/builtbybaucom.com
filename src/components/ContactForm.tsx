import { useState } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';

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

const Button = styled.button`
  align-items: center;
  background: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  gap: ${(props) => props.theme.space.sm};
  justify-content: center;
  padding: ${(props) => props.theme.space.sm} ${(props) => props.theme.space.md};
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.muted};
    cursor: not-allowed;
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

const Message = styled.div<{ type: 'success' | 'error' }>`
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
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
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
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
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
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </FormGroup>
        </InlineFormWrapper>
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send size={18} />
        </Button>
      </Form>
    </div>
  );
};
