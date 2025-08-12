import { JSX } from "preact";
import CherrySvg from '/assets/fruits/cherry.svg';

interface ICherrySpinnerProps {
  size?: number;
}

export function CherrySpinner({size = 10}: ICherrySpinnerProps): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin`}>
        <img src={CherrySvg} alt="Loading..." className={`w-${size} h-${size}`} />
      </div>
    </div>
  );
}