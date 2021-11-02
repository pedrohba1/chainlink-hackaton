import { expect } from "chai";
import { ethers } from "hardhat";

describe("Collectible", function () {
  it("Should deploy ERC721", async function () {
    const Article = await ethers.getContractFactory("Article");
    const article = await Article.deploy();
    await article.deployed();

    expect(article).to.not.be.undefined;
  });
});
