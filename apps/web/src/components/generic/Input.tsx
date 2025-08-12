import { JSX } from 'preact';

interface IInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  error?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  label,
  error
}: IInputProps): JSX.Element {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        placeholder={placeholder}
        className={`px-4 py-3 border rounded-tr-md rounded-tl-md rounded-br-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'
          }`}
      />
      {error && (
        <span className="text-sm text-red-600 mt-1">{error}</span>
      )}
    </div>
  );
}