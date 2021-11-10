import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useQueryCollectibles() {
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  const query = async () => {
    console.log('aqui');
    const options = {
      contractAddress: process.env.CONTRACT_ADDRESS,
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
        tokenId: '0'
      }
    });

    const lastId = await Moralis.Web3.executeFunction({
      ...options,
      functionName: 'lastId'
    });
    console.log(lastId);

    console.log(balance);
    console.log(uri);
    const ipfsData = await fetch(
      'https://bafyreicfzjkprrcv7uvogrj72tfspdeylb3axd6rxkssvbshllyc64xkni.ipfs.dweb.link/metadata.json'
    );
    console.log(await ipfsData.json());

    return { balance, uri };
  };

  return useQuery(['get/collectibles'], () => query());
}
