import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import LogoImage from '@assets/images/logo.png';
import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';

import PATH from '@constants/path.constant';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const { t } = useTranslation(['landing']);

  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        toggleActions: 'restart none restart none',
      },
      y: 50,
      opacity: 0,
      duration: 0.3,
    });

    gsap.from(logoRef.current, {
      scrollTrigger: {
        trigger: logoRef.current,
        toggleActions: 'restart none restart none',
      },
      y: 100,
      opacity: 0,
      duration: 0.3,
      delay: 0.3,
    });
  });

  return (
    <section className={'flex w-full flex-col items-center justify-center'}>
      <div ref={textRef} className="opacity-1 text-center font-bold">
        <p className={'text-xl text-primary lg:text-xl'}>Dev Log</p>
        <p className={'text-3xl text-primary-deep-dark lg:text-5xl'}>BLOG!</p>
      </div>

      <Spacing size={3} />

      <div
        ref={logoRef}
        className={'opacity-1 flex flex-col items-center justify-center gap-16'}
      >
        <div className={'rounded-full bg-primary p-10 shadow-md'}>
          <img
            src={LogoImage}
            alt={'blog image'}
            className={
              'h-full max-h-[150px] w-full max-w-[150px] lg:max-h-[200px] lg:max-w-[200px]'
            }
          />
        </div>
        <Link to={PATH.BLOG} target="_blank">
          <Button size={'lg'}>{t('blog_button')}</Button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
