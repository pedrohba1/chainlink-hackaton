import { NFTStorage, File } from "nft.storage";
import * as fs from "fs/promises";

const apiKey = String(process.env.NFT_STORAGE_API_KEY);
const client = new NFTStorage({ token: apiKey });

async function storeImage() {
  const content = await fs.readFile("/home/bufulin/Pictures/download.jpeg");

  const metadata = await client.store({
    name: "Increasing seaweed growth with goat cheese farming",
    description: "Abstract about what is happening in this article",
    image: new File([content], "download.jpeg", { type: "image/*" }),
    references: ["referece1", "referece2"],
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
