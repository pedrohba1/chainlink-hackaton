import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useIpfs() {
  const { enqueueSnackbar } = useSnackbar();
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  return useMutation(
    async () => {
      console.log('in mutation');
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
