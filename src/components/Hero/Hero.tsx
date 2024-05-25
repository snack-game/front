import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { motion, Variants } from 'framer-motion';

import ComingSoonImage from '@assets/images/main.png';
import Button from '@components/Button/Button';
import Lottie from '@components/Lottie/Lottie';
import { lottieOptions } from '@utils/commonFuc';

import PATH from '@constants/path.constant';

interface HeroProps {
  selected: number;
}

const variants: Variants = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Hero = ({ selected }: HeroProps) => {
  const { t } = useTranslation();

  const heroContents = [
    {
      title: t('main_title'),
      desc: t('main_desc'),
      leftContent: (
        <>
          <Link to={PATH.SNACK_GAME}>
            <Button size={'lg'} className={'w-full'}>
              <Trans i18nKey={'main_start'}>바로가기!</Trans>
            </Button>
          </Link>
          <Link to={PATH.FEED_BACK} target={'_blank'}>
            <Button style={'border'} className={'w-full'}>
              <Trans i18nKey={'main_feedback'}>피드백 보내기</Trans>
            </Button>
          </Link>
        </>
      ),
      rightContent: <Lottie lottieOptions={lottieOptions} />,
    },

    {
      title: 'Coming Soon!',
      desc: t('main_coming_soon'),
      leftContent: (
        <Link to={PATH.FEED_BACK} target={'_blank'}>
          <Button style={'border'} className={'w-full'}>
            <Trans i18nKey={'main_feedback'}>피드백 보내기</Trans>
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

  return (
    <motion.div
      className="mx-auto mt-16 flex w-full max-w-7xl flex-col-reverse items-center justify-around p-2 lg:mt-0 lg:flex-row"
      key={selected}
    >
      <motion.div
        className={'flex flex-col gap-4 text-center lg:text-start'}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="h-14 text-3xl font-bold text-primary-deep-dark lg:text-5xl"
          variants={variants}
        >
          {title}
        </motion.div>
        <motion.div
          className="max-w-md whitespace-pre text-sm text-primary-dark lg:text-lg"
          variants={variants}
        >
          {desc}
        </motion.div>

        <motion.div variants={variants} className={'mt-2 flex flex-col gap-4'}>
          {leftContent}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={
          'max-h-[250px] max-w-[250px] lg:max-h-[400px] lg:max-w-[400px]'
        }
      >
        {rightContent}
      </motion.div>
    </motion.div>
  );
};

export default Hero;
