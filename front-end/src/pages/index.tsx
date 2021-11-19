import useQueryCollectibles from '@hooks/chain/useQueryCollectibles';
import ImgMediaCard from '@components/Card';
import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function Home() {
  const { data, isLoading } = useQueryCollectibles();
  const { Moralis } = useMoralis();

  const checkChain = async () => {
    const web3 = await (Moralis as any).enableWeb3();
    console.log((web3 as any).currentProvider.chainId);
    // 0x2a chainId of Kovan
    // 0x13881 chainId of Mumbai testnet
  };

  useEffect(() => {
    checkChain();
  });

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {!isLoading &&
          data.nfts.map((nft, indx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={indx} item xs={4}>
              <ImgMediaCard {...nft} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
