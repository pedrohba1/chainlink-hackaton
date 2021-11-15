import { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  Container,
  TextField,
  FormControl
} from '@material-ui/core';

export default function Mint() {
  const [image, setImage] = useState();

  const [preview, setPreview] = useState('');

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
  }, [image]);

  const selectFile = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <FormControl>
      <Typography variant="h4"> Mint a new article as a NFT</Typography>

      <TextField
        id="standard-multiline-flexible"
        label="name"
        margin="normal"
      />
      <TextField
        margin="normal"
        variant="outlined"
        rows={20}
        multiline
        id="standard-multiline-flexible"
        label="abstract"
      />

      <Button variant="contained" component="label">
        Upload File
        <input onChange={selectFile} type="file" hidden />
      </Button>
      <Paper>{preview && <img src={preview} alt="article" />}</Paper>
    </FormControl>
  );
}
