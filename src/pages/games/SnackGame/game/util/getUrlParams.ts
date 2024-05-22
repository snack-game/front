/** 이름으로 url 파라미터를 검색합니다. */
export function getUrlParam(param: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/** url 파라미터 세팅 */
export function setUrlParam(param: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  history.pushState({}, '', url.toString());
}
