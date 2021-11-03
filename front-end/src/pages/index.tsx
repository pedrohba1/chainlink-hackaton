import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function Home() {
  const {
    enableWeb3,
    isWeb3Enabled,
    authenticate,
    isAuthenticated,
    logout,
    isAuthenticating
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) enableWeb3();
  }, [isAuthenticated]);

  async function handleAuth() {
    if (!isWeb3Enabled || !isAuthenticated) {
      enableWeb3();
      await authenticate();
    } else {
      logout();
    }
  }

  return (
    <>
      <p> front basicão</p>
      <button onClick={handleAuth} type="button" disabled={isAuthenticating}>
        {!isWeb3Enabled || !isAuthenticated ? 'logar com metamask' : 'logout'}
      </button>
    </>
  );
}
