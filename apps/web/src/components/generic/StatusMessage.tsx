import { JSX } from 'preact';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface IStatusMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  className?: string;
}

const statusConfig = {
  success: {
    bgColor: 'bg-primaryAction/5',
    borderColor: 'border-primaryAction/20',
    iconBg: 'bg-primaryAction/10',
    iconColor: 'text-primaryAction',
    titleColor: 'text-primaryAction',
    messageColor: 'text-primaryAction',
    icon: <CheckCircle className="w-6 h-6" strokeWidth={2} />,
  },
  error: {
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary/20',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
    messageColor: 'text-primary',
    icon: <XCircle className="w-6 h-6" strokeWidth={2} />,
  },
  warning: {
    bgColor: 'bg-white',
    borderColor: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-700',
    messageColor: 'text-yellow-600',
    icon: <AlertTriangle className="w-6 h-6" strokeWidth={2} />,
  },
  info: {
    bgColor: 'bg-white',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-700',
    messageColor: 'text-blue-600',
    icon: <Info className="w-6 h-6" strokeWidth={2} />,
  },
};

export function StatusMessage({ type, title, message, className }: IStatusMessageProps): JSX.Element {
  const config = statusConfig[type];

  return (
    <div className={`${config.bgColor} rounded-tr-xl rounded-br-xl rounded-tl-xl border ${config.borderColor} ${className}`}>
      <div className="p-6">
        <div className="flex items-center">
          <div className={`${config.iconBg} rounded-full p-2 mr-4`}>
            <div className={config.iconColor}>
              {config.icon}
            </div>
          </div>
          <div>
            <h4 className={`text-lg font-semibold ${config.titleColor} mb-1`}>{title}</h4>
            <p className={config.messageColor}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
