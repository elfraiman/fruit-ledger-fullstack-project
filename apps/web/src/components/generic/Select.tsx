import { JSX } from 'preact';

interface ISelectOption {
  value: string | number;
  label: string;
}

interface ISelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: ISelectOption[];
  placeholder?: string;
  className?: string;
  label?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  label,
}: ISelectProps): JSX.Element {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium mb-2">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        className="px-2 py-3 border border-gray-300 rounded-tl-md rounded-tr-md rounded-br-md outline-none focus:ring-2 focus:ring-primary bg-white"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value} className="hover:bg-secondary">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}