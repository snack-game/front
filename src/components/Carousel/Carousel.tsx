import { useEffect, useRef, useState } from 'react';

interface CarouselItem {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  const [selected, setSelected] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      const childrenArray = Array.from(container.children);
      const selectedElement = childrenArray[selected] as HTMLDivElement;

      if (selectedElement) {
        const selectedElementOffset =
          selectedElement.offsetLeft + selectedElement.offsetWidth / 2;
        const centerOfContainer = container.offsetWidth / 2;
        const newTranslateX = centerOfContainer - selectedElementOffset;
        setTranslateX(newTranslateX);
      }
    }
  }, [selected, items.length]);

  return (
    <div
      className={'min-w-7xl flex items-center justify-center overflow-hidden'}
    >
      <div className="relative w-full">
        <div className="border-t-primary absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 transform rounded-md border-x-8 border-t-8 border-x-transparent"></div>
        <div
          className={'flex gap-6 transition-transform duration-300'}
          style={{ transform: `translateX(${translateX}px)` }}
          ref={carouselRef}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              title={item.title}
              isSelected={index === selected}
              onClick={() => setSelected(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselItem = ({ title, isSelected, onClick }: CarouselItem) => {
  return (
    <div
      className={`rounded-md p-10 shadow-lg ${
        isSelected
          ? 'border-primary scale-100 border-2 duration-300'
          : 'scale-75 duration-300'
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Carousel;
