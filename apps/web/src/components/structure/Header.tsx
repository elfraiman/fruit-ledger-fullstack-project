import { JSX } from 'preact';

export function Header(): JSX.Element {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ">
            <div className="flex-shrink-0 flex flex-col items-start">
              <h1 className="text-3xl font-wonderbar text-amber-800 tracking-wide">
                Chocolate Inc.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}