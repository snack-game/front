import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import ChilImage from '@assets/images/0chil.jpg';
import DongSuImage from '@assets/images/dongsu.webp';
import HwanImage from '@assets/images/hwan.jpg';
import YujinImage from '@assets/images/nijuy.jpg';
import Spacing from '@components/Spacing/Spacing';

const teamInfoList = [
  {
    imgSrc: DongSuImage,
    name: 'dev-dong-su',
    position: 'Front-End, Game Developer',
    intro: 'team_dongsu',
    githubUrl: 'https://github.com/dev-dong-su',
  },
  {
    imgSrc: ChilImage,
    name: '0chil',
    position: 'Back-End Developer',
    intro: 'team_0chil',
    githubUrl: 'https://github.com/0chil',
  },
  {
    imgSrc: HwanImage,
    name: 'Hwanvely',
    position: 'Back-End Developer',
    intro: 'team_hwanvely',
    githubUrl: 'https://github.com/Hwanvely',
  },
  {
    imgSrc: YujinImage,
    name: 'nijuy',
    position: 'Front-End Developer',
    intro: 'team_nijuy',
    githubUrl: 'https://github.com/nijuy',
  },
];

const TeamSection = () => {
  return (
    <section className={'flex w-full flex-col items-center justify-center'}>
      <motion.div
        className={'text-xl font-bold text-primary lg:text-xl'}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.3,
          type: 'spring',
          stiffness: 50,
        }}
      >
        Snack Game
      </motion.div>
      <motion.div
        className={'text-3xl font-bold text-primary-deep-dark lg:text-5xl'}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      >
        Team Member
      </motion.div>

      <Spacing size={4} />

      <motion.div
        className={
          'container flex w-full flex-wrap items-center justify-center'
        }
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      >
        {teamInfoList.map((teamInfo) => (
          <TeamCard key={teamInfo.name} {...teamInfo} />
        ))}
      </motion.div>
    </section>
  );
};

interface TeamCardProps {
  name: string;
  imgSrc: string;
  position: string;
  intro: string;
  githubUrl: string;
}

const TeamCard = ({
  name,
  imgSrc,
  position,
  intro,
  githubUrl,
}: TeamCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:w-1/2 lg:min-h-[350px] lg:w-1/4">
      <div className="flex h-full flex-col items-center text-center">
        <div className={'px-20'}>
          <img
            alt="team"
            className="object-start mb-4 w-full flex-shrink-0 rounded-full object-cover shadow-md"
            src={imgSrc}
          />
        </div>

        <div className="w-full">
          <h2 className="title-font text-lg font-medium text-gray-900">
            {name}
          </h2>
          <h3 className="mb-3 text-gray-500">{position}</h3>
          <p className="mb-4 whitespace-pre-wrap">{t(intro)}</p>
          <Link to={githubUrl} target="_blank">
            <span className="inline-flex h-6 w-6">
              <svg viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
