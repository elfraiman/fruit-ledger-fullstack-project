import lepayaLogo from '../../assets/lepaya-logo.svg';

const Footer = () => {
  return (
    <footer className="z-20 mt-24 py-10 border-t border-gray-200 bg-slate-800 w-full group overflow-hidden cursor-pointer transition-all duration-300 hover:bg-slate-750">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-gray-200 text-base font-semibold tracking-wide group-hover:text-white transition-colors duration-300">
              Interview project created for
            </p>
            <img
              onClick={() => window.open('https://www.lepaya.com', '_blank')}
              src={lepayaLogo}
              alt="Lepaya Logo"
              className="h-8 transition-all duration-300 hover:opacity-80 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent animate-pulse group-hover:animate-none opacity-50" />
        <div className="h-full w-0 bg-gradient-to-r from-primary via-primary/40 to-primary-70 transition-all duration-1000 ease-out group-hover:w-full shadow-lg group-hover:shadow-indigo-500/50" />
      </div>
    </footer>
  )
}

export default Footer;