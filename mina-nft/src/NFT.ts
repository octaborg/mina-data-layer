import {
  Field,
  SmartContract,
  state,
  State,
  method,
  UInt64,
  Mina,
  Party,
  PrivateKey,
  PublicKey,
  isReady,
  Signature
} from 'snarkyjs';

export { mint, getSnappState, NFTMetaData };

await isReady;

/**
 *
 */
export default class NFT extends SmartContract {
  @state(Field) metaDataPointer = State<Field>();
  owner: PublicKey;

  constructor(address: PublicKey, owner: PublicKey) {
    super(address);
    // set the public key of the players
    this.owner = owner;
  }

  // mint
  deploy(initialBalance: UInt64, metaDataPointer: Field = Field(1)) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    this.metaDataPointer.set(metaDataPointer);
  }

  @method async transfer(
      owner: PublicKey,
      newOwner: PublicKey,
      signature: Signature
  ) {
    // ensure owner signed-off
    signature.verify(owner, [...owner.toFields(), ...newOwner.toFields()])
        .assertEquals(true);

    // make sure owner is calling the contract
    owner.assertEquals(this.owner);

    this.owner = newOwner;
  }
}

// setup

let isDeploying = null as null | {
  //update(): Promise<void>;
  getSnappState(): Promise<{
    num: Field;
  }>;
};

class NFTMetaData {
  image: File;
  attributes: Map<String, String>;

  constructor(image: File, attr: Map<String, String>) {
    this.image = image;
    this.attributes = attr;
  }
}

async function mint(account1: PrivateKey, account2: PrivateKey, meta: NFTMetaData) {
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

  // TODO publish NFTMetaData to FileCoin and get the pointer
  let metaDataPointer: Field = Field.zero;

  let snapp = new NFT(
    snappAddress,
      account1.toPublicKey()
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
    metaDataPointer: snappState[0]
  };
}

