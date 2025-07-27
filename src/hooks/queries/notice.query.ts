import { useSuspenseQuery } from '@tanstack/react-query';

import { getNoticeXML } from '@api/notice.api';

const parseXML = (xmlText: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  const items = xmlDoc.getElementsByTagName('item');

  const notices = Array.from(items).map((item) => {
    const title = item.getElementsByTagName('title')[0]?.textContent ?? '';
    const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent ?? '';
    return { title, pubDate };
  });

  notices.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateA - dateB;
  });

  return notices.map((n) => n.title);
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
