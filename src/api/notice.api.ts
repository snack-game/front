import axios from 'axios';

import PATH from '@constants/path.constant';

export const getNoticeXML = async () => {
  const { data } = await axios.get(PATH.NOTICE_RSS, {
    headers: { Accept: 'application/xml' },
  });
  return data;
};
