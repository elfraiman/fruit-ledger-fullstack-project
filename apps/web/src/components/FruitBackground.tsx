import { JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Import all fruit SVGs
import strawberrySvg from '/assets/fruits/strawberry.svg';
import cherrySvg from '/assets/fruits/cherry.svg';
import grapesSvg from '/assets/fruits/grapes.svg';
import pearSvg from '/assets/fruits/pear.svg';
import watermelonSvg from '/assets/fruits/watermelon.svg';
import garbageSvg from '/assets/garbage.svg';

interface IFruitDefinition {
  src: string;
  alt: string;
  minSize: number;
  maxSize: number;
}

interface IFruitPosition {
  id: string;
  src: string;
  alt: string;
  basePosition: { top: number; left: number };
  currentOffset: { x: number; y: number };
  size: number;
  rotation: number;
  isDisappearing?: boolean;
}

const fruitTypes: IFruitDefinition[] = [
  { src: strawberrySvg, alt: 'Strawberry', minSize: 8, maxSize: 14 },
  { src: cherrySvg, alt: 'Cherry', minSize: 10, maxSize: 14 },
  { src: grapesSvg, alt: 'Grapes', minSize: 10, maxSize: 14 },
  { src: pearSvg, alt: 'Pear', minSize: 12, maxSize: 14 },
  { src: watermelonSvg, alt: 'Watermelon', minSize: 8, maxSize: 14 },
];

function generateRandomFruits(count: number): IFruitPosition[] {
  return Array.from({ length: count }, (_, index) => {
    const fruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    const size = Math.floor(Math.random() * (fruit.maxSize - fruit.minSize + 1)) + fruit.minSize;

    // Random positioning
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const rotation = Math.floor(Math.random() * 360);

    return {
      id: `fruit-${index}`,
      src: fruit.src,
      alt: fruit.alt,
      basePosition: { top, left },
      currentOffset: { x: 0, y: 0 },
      size,
      rotation
    };
  });
}

export function FruitBackground(): JSX.Element {
  const [fruits, setFruits] = useState(() => generateRandomFruits(12));
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isGarbageAnimating, setIsGarbageAnimating] = useState(false);

  // Check for collision with garbage can
  useEffect(() => {
    const checkGarbageCollision = () => {
      const garbageElement = document.getElementById('garbage-can');
      if (!garbageElement) return;

      const garbageRect = garbageElement.getBoundingClientRect();

      const garbageCenter = {
        x: garbageRect.left + garbageRect.width / 2,
        y: garbageRect.top + garbageRect.height / 2,
      };

      fruits.forEach(fruit => {
        if (fruit.isDisappearing) return;

        const fruitElement = document.getElementById(`fruit-${fruit.id}`);
        if (!fruitElement) return;

        const fruitRect = fruitElement.getBoundingClientRect();
        const fruitCenter = {
          x: fruitRect.left + fruitRect.width / 2,
          y: fruitRect.top + fruitRect.height / 2,
        };

        const distance = Math.sqrt(
          Math.pow(fruitCenter.x - garbageCenter.x, 2) +
          Math.pow(fruitCenter.y - garbageCenter.y, 2)
        );

        if (distance < (garbageRect.width + fruitRect.width) / 2) {
          // Collision detected!
          //
          setIsGarbageAnimating(true);

          setFruits(prev =>
            prev.map(f =>
              f.id === fruit.id
                ? { ...f, isDisappearing: true }
                : f
            )
          );

          // Remove the fruit after animation
          //
          setTimeout(() => {
            setFruits(prev => prev.filter(f => f.id !== fruit.id));
            setIsGarbageAnimating(false);
          }, 500);
        }
      });
    };

    const intervalId = setInterval(checkGarbageCollision, 100);
    return () => clearInterval(intervalId);
  }, [fruits]);

  const handleMouseMove = (e: MouseEvent, fruitId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate direction vector from mouse to center
    const dirX = centerX - mouseX;
    const dirY = centerY - mouseY;

    // Normalize and scale the movement
    const length = Math.sqrt(dirX * dirX + dirY * dirY);

    const moveDistance = 20;

    setFruits(prevFruits =>
      prevFruits.map(fruit => {
        if (fruit.id === fruitId) {
          // Calculate new offsets
          const newOffsetX = fruit.currentOffset.x + (dirX / length) * moveDistance;
          const newOffsetY = fruit.currentOffset.y + (dirY / length) * moveDistance;

          // Calculate absolute position in pixels
          const baseLeft = (fruit.basePosition.left / 100) * viewportWidth;
          const baseTop = (fruit.basePosition.top / 100) * viewportHeight;

          // Calculate boundaries (accounting for fruit size)
          const fruitWidth = fruit.size * 16; // convert rem to px (assuming 1rem = 16px)
          const fruitHeight = fruitWidth;
          const minX = 0;
          const maxX = viewportWidth - fruitWidth;
          const minY = 0;
          const maxY = viewportHeight - fruitHeight;

          // Constrain the movement within boundaries
          const constrainedX = Math.max(minX - baseLeft, Math.min(maxX - baseLeft, newOffsetX));
          const constrainedY = Math.max(minY - baseTop, Math.min(maxY - baseTop, newOffsetY));

          return {
            ...fruit,
            currentOffset: {
              x: constrainedX,
              y: constrainedY
            }
          };
        }
        return fruit;
      })
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Fruits */}
      {fruits.map((fruit) => (
        <img
          id={`fruit-${fruit.id}`}
          key={fruit.id}
          src={fruit.src}
          alt={fruit.alt}
          onMouseMove={(e) => handleMouseMove(e, fruit.id)}
          onMouseEnter={() => setHoveredId(fruit.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            position: 'absolute',
            width: `${fruit.size}rem`,
            height: `${fruit.size}rem`,
            top: `${fruit.basePosition.top + 20}%`,
            left: `${fruit.basePosition.left}%`,
            transform: `
              translate(${fruit.currentOffset.x}px, ${fruit.currentOffset.y}px)
              rotate(${fruit.rotation}deg)
              scale(${fruit.isDisappearing ? 0 : 1})
            `,
            cursor: 'pointer',
            zIndex: hoveredId === fruit.id ? 9999 : 10,
            pointerEvents: 'auto',
            opacity: fruit.isDisappearing ? 0 : 1
          }}
          className="transition-all duration-300 ease-out"
        />
      ))}

      {/* Garbage Can */}
      <div
        id="garbage-can"
        className={`
          fixed bottom-12 left-16 -translate-x-1/2 pointer-events-auto
          transition-transform duration-300 ease-out
          ${isGarbageAnimating ? 'scale-125' : 'scale-100'}
        `}
      >
        <img
          src={garbageSvg}
          alt="Garbage Can"
          className="w-32 h-32"
        />
      </div>
    </div>
  );
}
