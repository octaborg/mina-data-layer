import {deployRegistry} from "./NFTRegistry.js";
import {isReady, Mina, Field} from "snarkyjs";
import {mint} from "./NFT.js";

await isReady;

async function main() {
    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);
    const account1 = Local.testAccounts[0].privateKey;
    const account2 = Local.testAccounts[1].privateKey;
    let registry = await deployRegistry(account1, account2);

    console.log('\ninitial registry');
    let snappState = await registry.getSnappState();
    console.log(snappState);

    // Mint NFT
    let address = await mint(account1, account2, new Field(100));
    await registry.update(account1, address);
    console.log("done");
}

main();