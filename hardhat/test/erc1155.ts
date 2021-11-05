import { expect } from "chai";
import { ethers } from "hardhat";
import { Articles } from "../typechain";

describe("Article ERC1155", function () {
  let articles: Articles;

  it("Should deploy ERC1155", async () => {
    const Articles = await ethers.getContractFactory("Articles");
    articles = await Articles.deploy();
    await articles.deployed();
    expect(articles).to.not.be.undefined;
  });

  it("Wallet should be able to mint", async () => {
    await articles.createCollectible(
      10,
      "ipfs://bafyreicfzjkprrcv7uvogrj72tfspdeylb3axd6rxkssvbshllyc64xkni/metadata.json"
    );
  });
});
