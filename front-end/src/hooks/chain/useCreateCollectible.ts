import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useCreateCollectible() {
  const { enqueueSnackbar } = useSnackbar();
  const { Moralis } = useMoralis();
  const { abi } = Articles;
  const options = {
    contractAddress: '0x415C1b8122E913958003E6ab1A1c4b7A22472f9F',
    functionName: 'createCollectible',
    abi,
    params: {
      amount: 30,
      _uri: ' ipfs://bafyreicfzjkprrcv7uvogrj72tfspdeylb3axd6rxkssvbshllyc64xkni/metadata.json'
    }
  };

  return useMutation(
    async () => {
      const res = await Moralis.executeFunction(options);
    },

    {
      onSuccess: () => {
        enqueueSnackbar('article created', {
          variant: 'success'
        });
      },
      onError: (response) => {
        console.log(response);
      }
    }
  );
}
