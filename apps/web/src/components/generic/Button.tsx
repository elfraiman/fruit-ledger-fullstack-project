import { JSX, ComponentChildren } from 'preact';

interface ButtonProps {
  children: ComponentChildren;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'primaryAction' | 'outlineAction';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = ''
}: ButtonProps): JSX.Element {
  const baseClasses = 'px-6 py-3 rounded-tr-md rounded-tl-md rounded-br-md font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/70 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary hover:bg-secondary/70 text-secondary',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary/70 hover:text-white',
    primaryAction: 'bg-primaryAction hover:bg-primaryAction/80 text-white shadow-lg hover:shadow-xl',
    outlineAction: 'border-2 border-primaryAction text-primaryAction hover:bg-primaryAction/70 hover:text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}