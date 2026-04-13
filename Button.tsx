import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

const DEFAULT_LEFT_ICON = 'https://www.figma.com/api/mcp/asset/7cee918b-1507-4e27-967b-6fbce1c8a716';
const DEFAULT_RIGHT_ICON = 'https://www.figma.com/api/mcp/asset/bfcdf6a3-5252-4649-9c58-d7a138970e96';

export type ButtonVariant = 'ultimate' | 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonState = 'default' | 'hoverFocus' | 'pressed' | 'disabled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  leftIconSrc?: string;
  rightIconSrc?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'ultimate',
  size = 'default',
  state = 'default',
  leftIconSrc,
  rightIconSrc,
  showLeftIcon = false,
  showRightIcon = false,
  children = 'Button',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = state === 'disabled' || disabled;
  const buttonClasses = [
    'sixty-button',
    `sixty-button--${variant}`,
    `sixty-button--${state}`,
    `sixty-button--${size}`,
    isDisabled ? 'sixty-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderLeftIcon = showLeftIcon && (leftIconSrc ?? DEFAULT_LEFT_ICON);
  const renderRightIcon = showRightIcon && (rightIconSrc ?? DEFAULT_RIGHT_ICON);

  return (
    <button type="button" className={buttonClasses} disabled={isDisabled} {...props}>
      <span className="sixty-button__content">
        {renderLeftIcon && (
          <span className="sixty-button__icon sixty-button__icon--left">
            <img src={renderLeftIcon} alt="" aria-hidden="true" />
          </span>
        )}
        <span className="sixty-button__label">{children}</span>
        {renderRightIcon && (
          <span className="sixty-button__icon sixty-button__icon--right">
            <img src={renderRightIcon} alt="" aria-hidden="true" />
          </span>
        )}
      </span>
    </button>
  );
}
