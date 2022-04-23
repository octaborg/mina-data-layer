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
  Signature, Bool
} from 'snarkyjs';
import {store} from "./filecoin.js";
import {CID} from "multiformats";

export { mint, getSnappState, NFTMetaData };

await isReady;



/**
 *
 */
export default class NFT extends SmartContract {
  @state(Field) metaDataPointer = State<Field>();
  @state(Field) metaDataPointer2 = State<Field>();
  owner: PublicKey;

  constructor(address: PublicKey, owner: PublicKey) {
    super(address);
    // set the public key of the players
    this.owner = owner;
  }

  // mint
  deploy(initialBalance: UInt64, metaDataPointer: Field, metaDataPointer2: Field) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    this.metaDataPointer.set(metaDataPointer);
    this.metaDataPointer2.set(metaDataPointer2);
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
    metaDataPointer: Field;
    metaDataPointer1: Field;
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

async function mint(account1: PrivateKey, account2: PrivateKey, meta: NFTMetaData) : Promise<PublicKey>{
  //if (isDeploying) return isDeploying;
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
  //isDeploying = snappInterface;

  // TODO publish NFTMetaData to FileCoin and get the pointer
  // const fileInput = document.querySelector('input[type="file"]')
  // fileInput.
  let cidStr = await store(null, meta);//.catch(e => console.log(e));
  let cid = CID.parse(cidStr);
  let metaDataPointers: Field[] = convertCIDtoFields(cid);
  let metaDataPointer: Field = metaDataPointers[0];
  let metaDataPointer1: Field = metaDataPointers[1];
  let snapp = new NFT(
    snappAddress,
      account1.toPublicKey()
  );
  let tx = Mina.transaction(account1, async () => {
    console.log('Deploying NFT...');
    const initialBalance = UInt64.fromNumber(1000000);
    const p = await Party.createSigned(account2);
    p.balance.subInPlace(initialBalance);
    //console.log(metaDataPointer, metaDataPointer1)
    snapp.deploy(initialBalance, metaDataPointer, metaDataPointer1);
  });
  await tx.send().wait().catch(e => console.log(e));

  console.log(await getSnappState(snappAddress));
  isDeploying = null;
  return snappAddress;
}

async function getSnappState(snappAddress: PublicKey) {
  let snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  return {
    metaDataPointer: snappState[0],
    metaDataPointer1: snappState[1]
  };
}

function convertCIDtoFields(cid: CID): Field[] {
  let fields = new Array<Field>();
  let bit = 0;
  let bools = new Array<Bool>();
  for (let i = 0; i < cid.bytes.length; i++) {
    let b = cid.bytes[i].toString(2).padStart(8, '0');
    for (let j = 0; j < b.length; j++) {
      let c = new Bool(b.at(j) == '1');
      bools.push(c);
      bit += 1;
      if (bools.length == 255 || bit == (cid.bytes.length * 8) - 1) {
        console.log(bools.length);
        fields.push(Field.ofBits(bools));
        bools = new Array<Bool>();
      }
    }
  }
  if (fields.length > 8) {
    throw new Error('Mina does not allow more than 8 field elements in a contract');
  }
  return fields;
}

