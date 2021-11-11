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
    for (let i = 0; i <= lastId; i += 1) {
      const uri = Moralis.Web3.executeFunction({
        ...options,
        functionName: 'uri',
        params: {
          tokenId: String(i)
        }
      });
      uris.push(uri);
    }
    let results = await Promise.all(uris);
    results = results.map((r: string) => {
      return r
        .replace('ipfs', 'https')
        .replace('/metadata.json', '.ipfs.dweb.link/metadata.json');
    });

    let fetches = [];
    for (let i = 0; i <= lastId; i += 1) {
      const toFetch = fetch(results[i]);
      fetches.push(toFetch);
    }

    fetches = await Promise.all(fetches);

    const arrayOfData = [];
    for (let i = 0; i <= lastId; i += 1) {
      arrayOfData.push(fetches[i].json());
    }

    const finalResults = await Promise.all(arrayOfData);
    console.log('final results', await finalResults);
    return { uris: results };
  };

  return useQuery(['get/collectibles'], () => query());
}
