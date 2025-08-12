import { JSX } from "preact";


export function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl border border-gray-200">
      {children}
    </div>
  );
}