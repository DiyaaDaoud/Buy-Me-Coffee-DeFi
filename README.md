# Buy Me Coffee

This repo represents a simle DeFi app for "Buy Me Coffee" website. it gives users the ability to tip the owner and send him a message through a simple UI. the owner can see the list of messages alongside the sender and the amount of ETH sent. the owner can withdraw the amoint of tips any time he wants.

you can check a live demo at (As a user) [here](http://buydiyaacoffee.surge.sh/)

# 🏄‍♂️ Quick Start

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone

```bash
git clone https://github.com/DiyaaDaoud/Buy-Me-Coffee-DeFi.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd Buy-Me-Coffee-DeFi
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd Buy-Me-Coffee-DeFi
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd Buy-Me-Coffee-DeFi
yarn deploy --network localhost
```

Now it will originaly be deployed with the first hardhat net account (0xf39..). So, you either choose the deployer by changing `packages/hardhat/hardht.config.json`, or you can deploy with the default deployer then transfer the ownership of the contract to your favourite account in `packages/hardhat/deploy/00_deploy_your_contract.js` (just uncomment the lines related to tranferring ownership, and put your front-end account as the new owner)

🔏 Edit your smart contract `BuyMeCoffee.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src` and check if this file refers to localhost in targetNetwork.

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app


# Deploy your own BuyMeCoffee app

whenever you are ready, make a .env file that contains your goerli (or any other testnet you like) deployer private key, and change the account of the chhosen testnet deployer in your `packages/hardhat/hardhat.config.js`. your account should contain have ETH.

then:


```bash
cd Buy-Me-Coffee-DeFi
yarn deploy --network goerli
```

Now, change the trget netwok in `App.jsx` to be the network you selected. check the front-end UI to see your app on that testnet.
