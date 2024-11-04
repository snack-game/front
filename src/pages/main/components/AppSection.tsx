import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import LogoImage from '@assets/images/main.png';
import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';

import PATH from '@constants/path.constant';

gsap.registerPlugin(ScrollTrigger);

const AppSection = () => {
  const { t } = useTranslation(['landing']);

  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.app', {
        scrollTrigger: {
          trigger: '.app',
          toggleActions: 'restart none restart none',
        },
        y: 50,
        opacity: 0,
        duration: 0.3,
      });

      gsap.from('.logo', {
        scrollTrigger: {
          trigger: '.logo',
          toggleActions: 'restart none restart none',
        },
        y: 100,
        opacity: 0,
        duration: 0.3,
        delay: 0.3,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={'flex w-full flex-col items-center justify-center'}
    >
      <div className="app text-center font-bold">
        <p className={'text-xl text-primary lg:text-xl'}>Snack Game</p>
        <p className={'text-3xl text-primary-deep-dark lg:text-5xl'}>
          Available on App
        </p>
      </div>

      <Spacing size={3} />

      <div
        className={
          'logo opacity-1 flex flex-col items-center justify-center gap-16'
        }
      >
        <div className={'rounded-3xl bg-game p-8 shadow-md'}>
          <img
            src={LogoImage}
            alt={'blog image'}
            className={
              'h-full max-h-[150px] w-full max-w-[150px] lg:max-h-[200px] lg:max-w-[200px]'
            }
          />
        </div>
        <Link to={PATH.ONE_LINK} target="_blank">
          <Button size={'lg'}>{t('install_app')}</Button>
        </Link>
      </div>
    </section>
  );
};

export default AppSection;
