import { motion } from 'framer-motion';

import LogoImage from '@assets/images/logo.png';
import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';

const BlogSection = () => {
  return (
    <div className={'flex w-full flex-col items-center justify-center'}>
      <motion.div
        className={'text-xl font-bold text-primary lg:text-xl'}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          type: 'spring',
          stiffness: 100,
        }}
      >
        Dev Log
      </motion.div>
      <motion.div
        className={'text-3xl font-bold text-primary-deep-dark lg:text-5xl'}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      >
        BLOG!
      </motion.div>

      <Spacing size={3} />

      <motion.div
        className={'flex flex-col items-center justify-center gap-16'}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      >
        <div className={'rounded-full bg-primary p-10'}>
          <img
            src={LogoImage}
            alt={'blog image'}
            className={
              'h-full max-h-[150px] w-full max-w-[150px] lg:max-h-[200px] lg:max-w-[200px]'
            }
          />
        </div>
        <Button size={'lg'}>바로가기</Button>
      </motion.div>
    </div>
  );
};

export default BlogSection;
