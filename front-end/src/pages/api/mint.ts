import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({
  token: String(process.env.NFT_STORAGE_API_KEY)
});

export default async function mint(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      const { name, description, image } = req.body;
      const metadata = await client.store({
        name,
        description,
        image
      });
      res.status(200).json({ url: metadata.url });
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
