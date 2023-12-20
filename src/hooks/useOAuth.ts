import { useEffect } from 'react';

const useOAuth = () => {
  const handleOAuthLogin = async () => {
    try {
      if (window.opener) {
        window.opener.postMessage(
          { type: 'oAuthSuccess' },
          window.location.origin,
        );
        window.close();
      }
    } catch (e) {
      window.opener.postMessage({ type: 'oAuthError' }, window.location.origin);
      window.close();
    }
  };

  useEffect(() => {
    handleOAuthLogin();
  }, []);
};

export default useOAuth;
