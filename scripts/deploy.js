//---------------File for local blockchain testing-----------------//

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function getAllBalances(listOfAddresses) {
  for (const address of listOfAddresses) {
    console.log(`Address : ${address} , Balance : `, await getBalance(address));
  }
}

async function getAllDonations(listOfDonations) {
  for (const donation of listOfDonations) {
    const timestamp = donation.timestamp;
    const name = donation.senderName;
    const from = donation.from;
    const message = donation.senderMessage;
    console.log(`At ${timestamp}, address : ${from},name : ${name},message : ${message}`);
  }
}

async function main() {
  const [owner,from1,from2,from3] = await ethers.getSigners();
  const charityContract = await hre.ethers.getContractFactory("Charity");
  const contract = await charityContract.deploy();//instance of contract
  
  //deploy our instance
  await contract.deployed();
  console.log('Address of deployed contract : ',contract.address);

  const addresses = [owner.address,from1.address,from2.address,from3.address];
  console.table("Before donating");
  getAllBalances(addresses);

  const amount = {value : hre.ethers.utils.parseEther("1")};

  //connect acount from contract then call function
  await contract.connect(from1).sendDonation("from1","Holi Gift",amount);
  await contract.connect(from2).sendDonation("from2","New Year Gift",amount);
  await contract.connect(from3).sendDonation("from3","Dussehra Gift",amount);

  console.table("After donating");
  getAllBalances(addresses);

  const donations = await contract.getDonations();
  getAllDonations(donations);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
