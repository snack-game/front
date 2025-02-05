import { useSuspenseQuery } from '@tanstack/react-query';

import { getNoticeXML } from '@api/notice.api';

const parseXML = (xmlText: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  return xmlDoc.getElementsByTagName('title');
};

export const useGetNotices = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const data = await getNoticeXML();
      return parseXML(data);
    },
  });
  return data;
};
