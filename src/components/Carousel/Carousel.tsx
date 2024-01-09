import { Dispatch, useEffect, useRef, useState } from 'react';

interface CarouselItem {
  title: string;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
}

interface CarouselProps {
  items: CarouselItem[];
  selected: number;
  setSelected: Dispatch<number>;
}

const Carousel = ({ items, selected, setSelected }: CarouselProps) => {
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
      className={'flex h-[200px] items-center justify-center overflow-hidden'}
    >
      <div className="relative w-full">
        <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 transform rounded-md border-x-8 border-t-8 border-x-transparent border-t-primary"></div>
        <div
          className={'my-6 flex gap-6 transition-transform duration-300'}
          style={{ transform: `translateX(${translateX}px)` }}
          ref={carouselRef}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              title={item.title}
              image={item.image}
              isSelected={index === selected}
              onClick={() => setSelected(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselItem = ({ title, image, isSelected, onClick }: CarouselItem) => {
  return (
    <div
      className={`h-[150px] w-[200px] cursor-pointer rounded-md bg-white p-4 shadow-lg ${
        isSelected
          ? 'scale-100 border-2 border-primary duration-300'
          : 'scale-75 border-2 border-primary-dark duration-300'
      }`}
      onClick={onClick}
    >
      <img src={image} alt={title} className={'h-full w-full object-cover'} />
    </div>
  );
};

export default Carousel;
