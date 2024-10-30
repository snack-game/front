import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TopBar from '@components/TopBar/TopBar';

import { NOTICES } from '@constants/notice.constant';
import PATH from '@constants/path.constant';

const NoticePage = () => {
  const { t } = useTranslation('setting');

  return (
    <>
      <TopBar title={t('notice')} backUrl={PATH.SETTING} />
      <ul>
        {NOTICES.map(({ id, title, description, date }) => (
          <NoticeItem
            key={id}
            title={title}
            description={description}
            date={date}
          />
        ))}
      </ul>
    </>
  );
};

export default NoticePage;

const NoticeItem = ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex flex-col justify-center border-b border-gray-200 px-4 py-3 text-sm">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between"
      >
        <div>
          <p className={open ? 'font-semibold' : ''}>{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
        <span className="text-xl">{open ? '-' : '+'}</span>
      </div>
      {open && <div className="whitespace-pre-line pt-4">{description}</div>}
    </li>
  );
};
