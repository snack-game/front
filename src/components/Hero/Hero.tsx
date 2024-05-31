import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import ComingSoonImage from '@assets/images/main.png';
import Button from '@components/Button/Button';

import PATH from '@constants/path.constant';

import MovingSnack from './MovingSnack';

interface HeroProps {
  selected: number;
}

const Hero = ({ selected }: HeroProps) => {
  const { t } = useTranslation(['landing']);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  const heroContents = [
    {
      title: t('title'),
      desc: t('desc'),
      leftContent: (
        <>
          <Link to={PATH.SNACK_GAME}>
            <Button size={'lg'} className={'w-full'}>
              <Trans i18nKey={'start'}>바로가기!</Trans>
            </Button>
          </Link>
          <Link to={PATH.FEED_BACK} target={'_blank'}>
            <Button style={'border'} className={'w-full'}>
              <Trans i18nKey={'feedback'}>피드백 보내기</Trans>
            </Button>
          </Link>
        </>
      ),
      rightContent: <MovingSnack />,
    },

    {
      title: 'Coming Soon!',
      desc: t('coming_soon'),
      leftContent: (
        <Link to={PATH.FEED_BACK} target={'_blank'}>
          <Button style={'border'} className={'w-full'}>
            <Trans i18nKey={'feedback'}>피드백 보내기</Trans>
          </Button>
        </Link>
      ),
      rightContent: (
        <img
          src={ComingSoonImage}
          alt={'main image'}
          className={'rounded-full bg-primary-light'}
        />
      ),
    },
  ];
  const { title, desc, rightContent, leftContent } = heroContents[selected];

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
  }, [selected]);

  return (
    <div
      className="mx-auto mt-16 flex w-full max-w-7xl flex-col-reverse items-center justify-around p-2 lg:mt-0 lg:flex-row"
      key={selected}
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
