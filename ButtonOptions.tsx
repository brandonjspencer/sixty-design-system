import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonVariant, type ButtonSize, type ButtonState } from './Button';

export type ButtonOptionsProps = {
  priority?: 'Ultimate' | 'Primary' | 'Secondary' | 'Tertiary';
  state?: 'Default' | 'Hover-Focus' | 'Pressed' | 'Disabled';
  size?: 'Small' | 'Default' | 'Large';
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIconSrc?: string;
  rightIconSrc?: string;
  children?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const variantMap: Record<NonNullable<ButtonOptionsProps['priority']>, ButtonVariant> = {
  Ultimate: 'ultimate',
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
};

const sizeMap: Record<NonNullable<ButtonOptionsProps['size']>, ButtonSize> = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
};

const stateMap: Record<NonNullable<ButtonOptionsProps['state']>, ButtonState> = {
  Default: 'default',
  'Hover-Focus': 'hoverFocus',
  Pressed: 'pressed',
  Disabled: 'disabled',
};

export function ButtonOptions({
  priority = 'Ultimate',
  state = 'Default',
  size = 'Default',
  showLeftIcon = false,
  showRightIcon = false,
  leftIconSrc,
  rightIconSrc,
  children = 'Button',
  className,
  disabled,
  ...props
}: ButtonOptionsProps) {
  return (
    <Button
      variant={variantMap[priority]}
      state={stateMap[state]}
      size={sizeMap[size]}
      showLeftIcon={showLeftIcon}
      showRightIcon={showRightIcon}
      leftIconSrc={leftIconSrc}
      rightIconSrc={rightIconSrc}
      className={className}
      disabled={state === 'Disabled' || disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
