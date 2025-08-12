import { JSX } from 'preact';

export interface ITab {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface ITabNavigationProps {
  tabs: ITab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: ITabNavigationProps): JSX.Element {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          data-testid={`tab-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-6 py-4 text-center font-medium text-sm transition-all duration-200 ${index === 0 ? 'rounded-tl-xl' : ''
            } ${index === tabs.length - 1 ? 'rounded-tr-xl' : ''
            } ${activeTab === tab.id
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:text-primary hover:bg-primary/20'
            }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
