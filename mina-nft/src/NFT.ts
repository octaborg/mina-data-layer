import { Field, SmartContract, state, State, method, UInt64, Mina, Party, PrivateKey, PublicKey, isReady } from 'snarkyjs';

export { mint, getSnappState };

await isReady;

/**
 *
 */
export default class NFT extends SmartContract {
  @state(Field) metaDataPointer = State<Field>();

  // mint
  deploy(initialBalance: UInt64, metaDataPointer: Field = Field(1)) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    this.metaDataPointer.set(metaDataPointer);
  }

  @method async transfer() {
    // TODO
  }
}

// setup

let isDeploying = null as null | {
  //update(): Promise<void>;
  getSnappState(): Promise<{
    num: Field;
  }>;
};

async function mint(account1: PrivateKey, account2: PrivateKey, metaDataPointer: Field) {
  if (isDeploying) return isDeploying;
  const snappPrivkey = PrivateKey.random();
  let snappAddress = snappPrivkey.toPublicKey();
  let snappInterface = {
    // update() {
    //   return update(snappAddress);
    // },
    getSnappState() {
      return getSnappState(snappAddress);
    },
  };
  isDeploying = snappInterface;

  let snapp = new NFT(
    snappAddress,
  );
  let tx = Mina.transaction(account1, async () => {
    console.log('Deploying NFT...');
    const initialBalance = UInt64.fromNumber(1000000);
    const p = await Party.createSigned(account2);
    p.balance.subInPlace(initialBalance);
    snapp.deploy(initialBalance, metaDataPointer);
  });
  await tx.send().wait();

  isDeploying = null;
  return snappAddress;
}

async function getSnappState(snappAddress: PublicKey) {
  let snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  return {
    num: snappState[0]
  };
}

