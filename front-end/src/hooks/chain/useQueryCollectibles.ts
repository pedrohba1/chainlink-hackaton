import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';
import axiosInstance from '@api/axios';
import axios from 'axios';

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
    console.log(urls);
    urls = urls.map((r: string) => {
      const ipfsHash = r.replace('ipfs://', '').replace('/metadata.json', '');
      console.log('hashes', ipfsHash);
      return `https://gateway.ipfs.io/ipfs/${ipfsHash}/metadata.json`;
    });

    console.log(urls);
    const arrayOfData = await Promise.allSettled(
      urls.map(async (url) => {
        console.log(url);
        const resp = await axiosInstance.get(url);
        console.log(resp);
        return resp;
      })
    );
    console.log(arrayOfData);

    return { uris: arrayOfData };
  };

  return useQuery(['get/collectibles'], () => query());
}
