import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import axiosInstance from '@api/axios';

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

export default function useQueryCollectibles(queryPage) {
  const { Moralis } = useMoralis();
  (Moralis as any).enableWeb3();

  const query = async (page) => {
    const art = Moralis.Object.extend('ArticlesMinted');
    const aQuery = new Moralis.Query(art);
    const results = await aQuery.limit(9).skip(page).find();

    const parsedResults = await Promise.allSettled<Promise<any>[]>(
      results.map(async (result) => {
        const uri = `https://gateway.ipfs.io/ipfs/${result.attributes.uri.replace(
          'ipfs://',
          ''
        )}`;
        const resp = await axiosInstance.get(uri);
        return {
          ...result.attributes,
          ...resp.data,
          image: `https://gateway.ipfs.io/ipfs/${resp.data.image.replace(
            'ipfs://',
            ''
          )}`
        };
      })
    );

    const nfts = parsedResults
      .filter(({ status }) => status === 'fulfilled')
      .map((p) => {
        const rp = p as PromiseFulfilledResult<any>;
        if (rp.value !== undefined) {
          return rp.value;
        }
        return rp.value;
      });

    return { nfts };
  };

  return useQuery(['get/collectibles', queryPage], () => query(queryPage));
}
