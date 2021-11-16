import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';
import axiosInstance from '@api/axios';

interface NftType {
  name: string;
  description: string;
  image: string;
}

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

export default function useQueryCollectibles() {
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  const query = async () => {
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi
    };

    const lastId = await Moralis.Web3.executeFunction({
      ...options,
      functionName: 'lastId'
    });

    const uris = [];
    for (let i = 0; i < lastId; i += 1) {
      const uri = Moralis.Web3.executeFunction({
        ...options,
        functionName: 'uri',
        params: {
          tokenId: String(i)
        }
      });
      uris.push(uri);
    }

    let urls = await Promise.all(uris);
    urls = urls.map((r: string) => {
      const ipfsHash = r.replace('ipfs://', '').replace('/metadata.json', '');
      return `https://gateway.ipfs.io/ipfs/${ipfsHash}`;
    });
    console.log(urls[4]);

    const resolvedPromises = await Promise.allSettled<Promise<any>[]>(
      urls.map(async (url) => {
        const resp = await axiosInstance.get(url);
        return resp.data;
      })
    );

    const nfts = resolvedPromises
      .filter(({ status }) => status === 'fulfilled')
      .map((p) => (p as PromiseFulfilledResult<NftType>).value as NftType);

    console.log(nfts);

    return { nfts };
  };

  return useQuery(['get/collectibles'], () => query());
}
