import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import useCreateCollectible from '@hooks/chain/useCreateCollectible';
import useQueryCollectibles from '@hooks/chain/useQueryCollectibles';

export default function Home() {
  const { mutate } = useCreateCollectible();
  const { data, isLoading } = useQueryCollectibles();

  return (
    <>
      {!isLoading &&
        data?.nfts.map((uri, indx) => (
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
