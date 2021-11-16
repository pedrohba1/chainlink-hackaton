import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';
import axiosInstance from '@api/axios';

export default function useCreateCollectible() {
  const { enqueueSnackbar } = useSnackbar();
  const { Moralis } = useMoralis();
  const { abi } = Articles;
  const options = {
    contractAddress: '0x415C1b8122E913958003E6ab1A1c4b7A22472f9F',
    functionName: 'lastId',
    abi
  };

  return useMutation(
    async (data: any) => {
      const res = await Moralis.Web3.executeFunction(options);
      console.log(data);
      const result = await axiosInstance.post('api/mint', { ...data });
      console.log('result do ', result);
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
