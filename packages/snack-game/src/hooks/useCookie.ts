import Cookies from 'js-cookie';

function useCookie() {
  const getCookie = (name: string) => {
    return Cookies.get(name);
  };

  const removeCookie = (name: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(name, options);
  };

  return { getCookie, removeCookie };
}

export default useCookie;
