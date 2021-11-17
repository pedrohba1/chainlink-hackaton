import useQueryMineCollectibles from '@hooks/chain/useQueryMineCollectibles';
import ImgMediaCard from '@components/Card';
import { Container, Grid } from '@material-ui/core';

export default function Home() {
  const { data, isLoading } = useQueryMineCollectibles();

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {/* {!isLoading &&
          data.nfts.map((nft, indx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={indx} item xs={4}>
              <ImgMediaCard {...nft} />
            </Grid>
          ))} */}
      </Grid>
    </Container>
  );
}
