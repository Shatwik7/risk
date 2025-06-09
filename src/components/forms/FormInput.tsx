import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  className?: string;
}

export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder = '',
  register,
  rules,
  error,
  className = '',
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          {...register(id, rules)}
          className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
            ${error
              ? 'border-error-500 focus:ring-error-200'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'}
          `}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500">{error.message}</p>
      )}
    </div>
  );
}