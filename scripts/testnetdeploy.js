//----------file for deployment on testnet--------------------//

const hre = require("hardhat");

async function main() {
    const [owner,from1,from2,from3] = await ethers.getSigners();
    const charityContract = await hre.ethers.getContractFactory("Charity");
    const contract = await charityContract.deploy();//instance of contract
    
    //deploy our instance
    await contract.deployed();
    console.log('Address of deployed contract : ',contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });