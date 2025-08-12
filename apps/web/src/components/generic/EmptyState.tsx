import { JSX, ComponentChildren } from 'preact';

interface IEmptyStateProps {
  icon: JSX.Element;
  title: string;
  description: string;
  children?: ComponentChildren;
}

export function EmptyState({ icon, title, description, children }: IEmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
}
