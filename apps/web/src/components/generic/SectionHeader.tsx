import { JSX, ComponentChildren } from 'preact';

interface ISectionHeaderProps {
  title: string;
  description?: string;
  icon?: JSX.Element;
  action?: JSX.Element;
  children?: ComponentChildren;
}

export function SectionHeader({ title, description, icon, action, children }: ISectionHeaderProps): JSX.Element {
  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        {action && action}
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
      {children}
    </div>
  );
}
