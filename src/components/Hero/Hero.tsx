import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface HeroProps {
  title: string;
  desc: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const Hero = ({ title, desc, leftContent, rightContent }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'elastic.out(0.2,0.1)', duration: 0.3 },
    });
    tl.from(containerRef.current, { y: -30, opacity: 0 });
    tl.from(containerRef.current.children, {
      y: -30,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from(imgRef.current, { x: 150, opacity: 0, duration: 0.3 });
  }, [title]);

  return (
    <div
      className="mx-auto mt-16 flex w-full max-w-7xl flex-col-reverse items-center justify-around p-2 lg:mt-0 lg:flex-row"
      key={title}
    >
      <div
        ref={containerRef}
        className={'flex flex-col gap-4 text-center lg:text-start'}
      >
        <div className="h-14 text-3xl font-bold text-primary-deep-dark lg:text-5xl">
          {title}
        </div>
        <div className="max-w-md whitespace-pre text-sm text-primary-dark lg:text-lg">
          {desc}
        </div>
        <div className={'mt-2 flex flex-col gap-4'}>{leftContent}</div>
      </div>
      <div
        ref={imgRef}
        className={
          'max-h-[250px] max-w-[250px] lg:max-h-[400px] lg:max-w-[400px]'
        }
      >
        {rightContent}
      </div>
    </div>
  );
};

export default Hero;
