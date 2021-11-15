import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import useCreateCollectible from '@hooks/chain/useCreateCollectible';
import useQueryCollectibles from '@hooks/chain/useQueryCollectibles';

export default function Home() {
  const { mutate } = useCreateCollectible();
  const { data, isLoading } = useQueryCollectibles();

  return (
    <>
      <p> front basicão</p>

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
