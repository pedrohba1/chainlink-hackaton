import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useQueryCollectibles() {
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  const query = async () => {
    console.log('aqui');
    const options = {
      contractAddress: '0x415C1b8122E913958003E6ab1A1c4b7A22472f9F',
      functionName: 'balanceOf',
      abi,
      params: {
        account: '0xc6Ff58B90319685cc77B698Afde9Ee2ef3389c95',
        id: '0'
      }
    };
    const balance = await Moralis.Web3.executeFunction(options);
    const uri = await Moralis.Web3.executeFunction({
      ...options,
      functionName: 'uri',
      params: {
        tokenId: '2'
      }
    });

    console.log(balance);
    console.log(uri);

    return { balance, uri };
  };

  return useQuery(['get/collectibles'], () => query());
}
