import type { ReactNode } from 'react';
import './ButtonOptions.css';

const imgLeftIcon = 'https://www.figma.com/api/mcp/asset/14a92b30-4a18-4618-8e1d-877358d4d922';

type ButtonPriority = 'Ultimate' | 'Primary' | 'Secondary' | 'Tertiary';
type ButtonState = 'Default' | 'Hover-Focus' | 'Pressed' | 'Disabled';

export interface ButtonOptionsProps {
  priority?: ButtonPriority;
  state?: ButtonState;
  children?: ReactNode;
  className?: string;
}

export function ButtonOptions({
  priority = 'Ultimate',
  state = 'Default',
  children = 'Button',
  className = '',
}: ButtonOptionsProps) {
  const wrapperClasses = [
    'sixty-button-options',
    `sixty-button-options--${priority.toLowerCase()}`,
    `sixty-button-options--${state.toLowerCase()}`,
    state === 'Disabled' ? 'sixty-button-options--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonClasses = [
    'sixty-button-options__button',
    `sixty-button-options__button--${priority.toLowerCase()}`,
    `sixty-button-options__button--${state.toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'sixty-button-options__label',
    `sixty-button-options__label--${priority.toLowerCase()}`,
    `sixty-button-options__label--${state.toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(' ');

  const showSecondaryIcon = priority === 'Secondary' && state === 'Default';

  return (
    <div className={wrapperClasses}>
      <button type="button" className={buttonClasses} disabled={state === 'Disabled'}>
        <div className="sixty-button-options__content">
          {showSecondaryIcon && (
            <img
              className="sixty-button-options__icon"
              src={imgLeftIcon}
              alt=""
              aria-hidden="true"
            />
          )}
          <span className={textClasses}>{children}</span>
        </div>
      </button>
    </div>
  );
}
