// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("BuyMeCoffee", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
  });

  // Getting a previously deployed contract
  const buyMeCoffee = await ethers.getContract("BuyMeCoffee", deployer);
  // let currentOwner = await buyMeCoffee.owner();
  // console.log(`current Owner is: ${currentOwner}`);
  // const tx = await buyMeCoffee.transferOwnership(
  //   "0x418668c2DC80d4Bfd2089f89CE3eF75e0CE37620",
  //   {
  //     gasLimit: 1000000,
  //   }
  // );
  // await tx.wait(1);
  // console.log("Ownership transferred!");
  let newOwner = await buyMeCoffee.owner();
  console.log(`new owner is: ${newOwner}`);
  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify your contracts with Etherscan
  // You don't want to verify on localhost
  try {
    if (chainId !== localChainId) {
      await verify(buyMeCoffee.address, []);
    }
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
};
module.exports.tags = ["BuyMeCoffee"];
