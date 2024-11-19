import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

type ButtonVariant = 'accent' | 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
}

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  transition: transform 0.75s ease;
`;

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
      : props.theme.colors.text};
  cursor: pointer;
  display: inline-flex;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  gap: ${(props) => props.theme.space.sm};
  justify-content: center;
  line-height: 1.5;
  min-height: 2.5rem;
  overflow: hidden;
  padding: ${(props) => props.theme.space.sm} ${(props) => props.theme.space.md};
  position: relative;
  transition: all 0.75s ease;
  width: ${(props) => (props.$fullWidth ? '100%' : 'fit-content')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
  }

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
    color: ${(props) => props.theme.colors.text};

    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${(props) => `${props.theme.colors[props.$variant]}40`};

    &::before {
      left: 125%;
    }

    ${IconWrapper} {
      transform: translateX(2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:active::after {
    animation: ripple 0.6s ease-out;
  }

  &:disabled {
    background: ${(props) => props.theme.colors.muted};
    color: ${(props) => props.theme.colors.text};
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    box-shadow: none;

    &::before,
    &::after {
      display: none;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      &:hover {
        background: ${props.theme.colors.muted};
        transform: none;
        box-shadow: none;
      }
    `}

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes.sm};
    padding: ${(props) => props.theme.space.xs}
      ${(props) => props.theme.space.sm};
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
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
      leftIcon,
      isLoading = false,
      rightIcon,
      variant = 'primary',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        $fullWidth={fullWidth}
        $variant={variant}
        disabled={disabled || isLoading}
        ref={ref}
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
