import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
}

const StyledButton = styled.button<{
  $fullWidth?: boolean;
  $variant: ButtonVariant;
}>`
  align-items: center;
  background: ${(props) => props.theme.colors[props.$variant]};
  border-radius: 8px;
  border: none;
  color: ${(props) =>
    props.$variant === 'accent'
      ? props.theme.colors.primary
      : props.theme.colors.background};
  cursor: pointer;
  display: inline-flex;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  gap: ${(props) => props.theme.space.sm};
  justify-content: center;
  line-height: 1.5;
  min-height: 2.5rem;
  padding: ${(props) => props.theme.space.sm} ${(props) => props.theme.space.md};
  position: relative;
  transition: all 0.2s ease;
  width: ${(props) => (props.$fullWidth ? '100%' : 'fit-content')};

  &:hover {
    background: ${(props) => {
      switch (props.$variant) {
        case 'primary':
          return props.theme.colors.secondary;
        case 'secondary':
          return props.theme.colors.primary;
        case 'accent':
          return props.theme.colors.muted;
        default:
          return props.theme.colors.secondary;
      }
    }};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: ${(props) => props.theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }

  ${(props) =>
    props.disabled &&
    css`
      &:hover {
        background: ${props.theme.colors.muted};
        transform: none;
      }
    `}

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.sm};
    padding: ${(props) => props.theme.space.xs}
      ${(props) => props.theme.space.sm};
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;
  border: 2px solid ${(props) => props.theme.colors.background};
  border-radius: 50%;
  border-top-color: transparent;
  height: 1em;
  width: 1em;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      variant = 'primary',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        $fullWidth={fullWidth}
        $variant={variant}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner aria-hidden="true" />
        ) : (
          <>
            {leftIcon && (
              <IconWrapper aria-hidden="true">{leftIcon}</IconWrapper>
            )}
            {children}
            {rightIcon && (
              <IconWrapper aria-hidden="true">{rightIcon}</IconWrapper>
            )}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
