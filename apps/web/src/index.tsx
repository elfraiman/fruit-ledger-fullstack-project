import { hydrate, prerender as ssr } from 'preact-iso';
import Layout from './components/structure/Layout';
import { ReportsSection } from './components/reports-section/ReportsSection';
import { StockUpdateSection } from './components/stock-management/StockUpdateSection';
import { TabNavigation, ITab } from './components/generic/TabNavigation';
import { OfficeYearFilters } from './components/generic/OfficeYearFilters';
import useLocations from './hooks/useLocations';
import { BarChart3, Package } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useState } from 'preact/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Card } from './components/generic/Card';
import './style.css';



const App = () => {
	const [activeTab, setActiveTab] = useState<'reports' | 'stock'>('reports');
	const [selectedOffice, setSelectedOffice] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<string>('');

	const { data: locations } = useLocations();

	const tabs: ITab[] = [
		{
			id: 'reports',
			label: 'Analytics & Reports',
			icon: <BarChart3 className="w-5 h-5" />
		},
		{
			id: 'stock',
			label: 'Stock Management',
			icon: <Package className="w-5 h-5" />
		}
	];

	return (
		<Layout>
			<div className="space-y-2">
				<Toaster position="top-right" toastOptions={{ duration: 3000 }} containerClassName="z-50 mt-16" />
				<div className="text-center py-6">
					<h1 className="text-3xl md:text-5xl mb-3">
						Welcome to
						<span className="block text-primary font-bold text-6xl">Peel & Plan</span>
					</h1>
					<p className="text-lg max-w-3xl mx-auto">
						Your comprehensive office fruit management platform.
						Monitor consumption patterns and manage inventory efficiently.
					</p>
				</div>

				<OfficeYearFilters
					selectedOffice={selectedOffice}
					selectedYear={selectedYear}
					onOfficeChange={(value) => setSelectedOffice(String(value))}
					onYearChange={(value) => setSelectedYear(String(value))}
					showYearSelector={activeTab === 'reports'}
				/>

				<Card>
					<TabNavigation
						tabs={tabs}
						activeTab={activeTab}
						onTabChange={(tabId) => setActiveTab(tabId as 'reports' | 'stock')}
					/>

					<div className="p-6">
						{activeTab === 'reports' && (
							<ReportsSection
								selectedOffice={selectedOffice}
								selectedYear={selectedYear}
							/>
						)}
						{activeTab === 'stock' && (
							<StockUpdateSection
								selectedOffice={selectedOffice}
								locations={locations?.data || []}
							/>
						)}
					</div>
				</Card>
			</div>

		</Layout>
	);
};


const AppWithProvider = () => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
};

if (typeof window !== 'undefined') {
	hydrate(<AppWithProvider />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<AppWithProvider 	{...data} />);
}