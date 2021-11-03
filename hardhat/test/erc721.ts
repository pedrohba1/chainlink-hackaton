import { expect } from "chai";
import { ethers } from "hardhat";
import { Article } from "../types";

describe("Collectible", function () {
  let article;

  it("Should deploy ERC721", async function () {
    const Article = await ethers.getContractFactory("Article");
    article = await Article.deploy();
    // const article = await Article.deploy();

    await article.deployed();

    expect(article).to.not.be.undefined;
  });

  it("Should mint", async function () {

  });
});
