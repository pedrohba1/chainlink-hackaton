import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import useCreateCollectible from '@hooks/chain/useCreateCollectible';
import useQueryCollectibles from '@hooks/chain/useQueryCollectibles';

export default function Home() {
  const {
    enableWeb3,
    isWeb3Enabled,
    authenticate,
    isAuthenticated,
    logout,
    isAuthenticating
  } = useMoralis();

  const { mutate } = useCreateCollectible();
  const { data, isLoading } = useQueryCollectibles();

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
      <button onClick={() => mutate()} type="button">
        create collectible
      </button>

      {!isLoading &&
        data?.uris.map((uri, indx) => (
          <p key={indx}>
            {uri?.name}
            <br />
            {uri?.description}
            <br />
            {uri?.image}
          </p>
        ))}
    </>
  );
}
