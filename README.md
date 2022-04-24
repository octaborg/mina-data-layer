# mina-data-layer

## What is it?
Project: Creates a Data Acess Layer for expanding the off chain storage for Mina using IPFS with FileCoin.


## Dependencies
Please ensure you have node v16 and npm installed.

## How to setup the zkApp
1. Clone the following repo and build.
```
cd ../../
git clone git@github.com:octaborg/mina-data-layer.git
npm install
npm run build
```

2. Now back inside the mina-nft, run the UI server.
```
npm install && npm run build
npm run serve
```

## How to use the zkApp
1. Create an account at https://web3.storage/ and copy your API token. If you don't have one, create one and copy it.
2. Run in the mina-NFT directory the following commands
```
npm run build
npm run serve
```
4. This will launch the app locally where it can be accessed at http://localhost:3000/
5. Paste the FileCoin API Token into the Login field and press Submit.
6. Click upload and select the image file that you would like to Mint as an NFT with and click mint.
7. Your NFT will be minted + Stored in IPFS using FileCoin and it will also be shown on the website UI. 
