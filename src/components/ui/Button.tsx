import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  to?: string;
}

export default function Button({
  children,
  variant = 'filled',
  size = 'medium',
  fullWidth = false,
  className = '',
  href,
  to,
  ...props
}: ButtonProps) {
  // Classes based on variant
  const variantClasses = {
    filled: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    outlined: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    text: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
  };

  // Classes based on size
  const sizeClasses = {
    small: 'text-sm py-1.5 px-3',
    medium: 'py-2 px-4',
    large: 'text-lg py-2.5 px-6',
  };

  // Base classes - removed hover:text-white from filled variant
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg transition-colors
    focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50
    disabled:opacity-60 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Render as link if href or to is provided
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}