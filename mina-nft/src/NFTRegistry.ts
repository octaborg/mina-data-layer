import { Field, SmartContract, state, State, method, UInt64, Mina, Party, PrivateKey, PublicKey, isReady } from 'snarkyjs';

export { deployRegistry, getSnappState };

await isReady;

/**
 *
 */
class NFTRegistry extends SmartContract {
    @state(Field) metaDataPointer = State<Field>();

    deploy(initialBalance: UInt64, metaDataPointer: Field = Field(1)) {
        super.deploy();
        this.balance.addInPlace(initialBalance);
        this.metaDataPointer.set(metaDataPointer);
    }

    /**
     * Steps to mint a new NFT
     * 1. Store the signed NFTs data in Filecoin
     * 2. Mint the NFT with the hash/link of the data
     * 3. Retrieve the NFTRegistry data from FileCoin and update the registry and republish
     * 4. Publish the NFT address to the NFTRegistry with the owner
     */
    @method async update(data: Field) {
        this.metaDataPointer.set(data);
    }
}

// setup

let isDeploying = null as null | {
    update(account1: PrivateKey, nft: PublicKey): Promise<void>;
    getSnappState(): Promise<{
        num: Field;
    }>;
};

async function deployRegistry(account1: PrivateKey, account2: PrivateKey, metaDataPointer: Field) {
    if (isDeploying) return isDeploying;
    const snappPrivkey = PrivateKey.random();
    let snappAddress = snappPrivkey.toPublicKey();
    let snappInterface = {
        update(account1: PrivateKey, nft: PublicKey) {
          return update(account1, nft, snappAddress);
        },
        getSnappState() {
            return getSnappState(snappAddress);
        },
    };
    isDeploying = snappInterface;

    let snapp = new NFTRegistry(
        snappAddress,
    );
    let tx = Mina.transaction(account1, async () => {
        console.log('Deploying NFTRegistry...');
        const initialBalance = UInt64.fromNumber(1000000);
        const p = await Party.createSigned(account2);
        p.balance.subInPlace(initialBalance);
        snapp.deploy(initialBalance, metaDataPointer);
    });
    await tx.send().wait();

    isDeploying = null;
    return snappInterface;
}


async function update(account1: PrivateKey, nft: PublicKey, snappAddress: PublicKey) {
  let snapp = new NFTRegistry(snappAddress);

  // TODO retrieve, update and publish registry data to FileCoin here
  let tx = Mina.transaction(account1, async () => {
      // TODO Update the FileCoin Address here
    await snapp.update(new Field(10000));
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log('Update rejected!', err);
  }
}


async function getSnappState(snappAddress: PublicKey) {
    let snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
    return {
        num: snappState[0]
    };
}
