import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe('knft Contract', async () => {
  let nft: any;
  let nftContractAddress: string;
  let tokenId: number;

  let name = "K-NFT";
  let symbol = "KN";

  beforeEach('Setup Contract', async () => {
    const knft = await ethers.getContractFactory('KNft');
    nft = await knft.deploy(name, symbol);
    await nft.deployed();
    nftContractAddress = nft.address;
  })

  it('Should have an address', async () => {
    assert.notEqual(nftContractAddress, '0x0');
    assert.notEqual(nftContractAddress, '');
    assert.notEqual(nftContractAddress, null);
    assert.notEqual(nftContractAddress, undefined);
  })

  it('Should be able to mint NFT', async () => {
    let txn = await nft.createNft();
    let tx = await txn.wait();

    let event = tx.events[0];
    let value = event.args[2];
    console.log("1", event, value);
    tokenId = value.toNumber();

    assert.equal(tokenId, 1);

    txn = await nft.createNft();
    tx = await txn.wait();

    event = tx.events[0];
    value = event.args[2];
    console.log("2", event, value);
    tokenId = value.toNumber();

    assert.equal(tokenId, 2);
  })
})