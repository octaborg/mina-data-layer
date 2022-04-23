import {deployWallet} from "./wallet.js";
import {isReady, Mina, Field} from "snarkyjs";
import {mint, NFTMetaData} from "./NFT.js";

await isReady;

async function main() {
    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);
    const account1 = Local.testAccounts[0].privateKey;
    const account2 = Local.testAccounts[1].privateKey;
    let wallet = await deployWallet(account1, account2);

    console.log('\ninitial wallet');
    let snappState = await wallet.getSnappState();
    console.log(snappState);

    // Mint NFT
    let address = await mint(account1, account2, new NFTMetaData());
    await wallet.update(account1, address);
    console.log("done");
    snappState = await wallet.getSnappState();
    console.log(snappState);
}

main();