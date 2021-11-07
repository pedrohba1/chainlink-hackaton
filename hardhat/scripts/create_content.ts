import { NFTStorage, File } from "nft.storage";
import * as fs from "fs/promises";
import path from "path";
const apiKey = String(process.env.NFT_STORAGE_API_KEY);
const client = new NFTStorage({ token: apiKey });

async function storeImage() {
  const content = await fs.readFile(
    path.resolve(__dirname, "../images/sample.png")
  );

  const metadata = await client.store({
    name: "Study about of genetic of colors and bread",
    description: "Abstract about what is happening in this article",
    image: new File([content], "sample.png", { type: "image/*" }),
  });
  console.log(metadata.url);
}

async function main() {
  const filename = process.argv[2];
  console.log(filename);
  await storeImage();
}

main();

// feito o deploy do URI
// ipfs://bafyreicfzjkprrcv7uvogrj72tfspdeylb3axd6rxkssvbshllyc64xkni/metadata.json
// ipfs://bafyreibw75mqtwztq52fnbvdmsf2dvpw5g2jwyg47wl3n3e6zz5nk46dkm/metadata.json
