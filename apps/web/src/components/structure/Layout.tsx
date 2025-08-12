import { ComponentChildren, JSX } from 'preact';
import { FruitBackground } from '../FruitBackground';
import Footer from './Footer';
import { Header } from './Header';

interface ILayoutProps {
  children: ComponentChildren;
}
const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      <Header />
      <FruitBackground />
      <main className="max-w-7xl mx-auto flex-1 p-4 sm:px-6 lg:px-8 py-8 relative z-20 min-h-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;