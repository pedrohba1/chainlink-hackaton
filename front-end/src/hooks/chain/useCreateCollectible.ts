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
      const { name, description, image } = data;
      const res = await Moralis.Web3.executeFunction(options);

      // upload image first:
      const imageFile = new Moralis.File(image.name, image);
      await imageFile.saveIPFS();
      const imageURL = imageFile.ipfs();

      // then upĺoad uri metadata

      const jsonFile = new Moralis.File('file.json', {
        base64: btoa(JSON.stringify({ name, description, image: imageURL }))
      });

      const ipfsJsonLink = await jsonFile.saveIPFS();
      console.log('json link', ipfsJsonLink);
      console.log('result do ', jsonFile);
      console.log(jsonFile.url);
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
