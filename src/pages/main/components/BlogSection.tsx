import { motion } from 'framer-motion';

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
        NEW!
      </motion.div>
      <motion.div
        className={'text-3xl font-bold text-primary-deep-dark lg:text-5xl'}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      >
        BLOG POST
      </motion.div>

      <Spacing size={3} />

      <motion.div className={'flex w-full items-center justify-center'}>
        <div className={'h-[400px] w-[300px] bg-primary'}></div>
        <div className={'h-[400px] w-[300px] bg-primary'}></div>
      </motion.div>
    </div>
  );
};

export default BlogSection;
