import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useQueryCollectibles() {
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  const query = async () => {
    const options = {
      contractAddress: process.env.CONTRACT_ADDRESS,
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
      return r
        .replace('ipfs', 'https')
        .replace('/metadata.json', '.ipfs.dweb.link/metadata.json');
    });

    const arrayOfData = await Promise.all(
      urls.map(async (url) => {
        const resp = await (await fetch(url)).json();
        return resp;
      })
    );

    return { uris: arrayOfData };
  };

  return useQuery(['get/collectibles'], () => query());
}
