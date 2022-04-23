import {Bool, Field, isReady, shutdown, UInt64} from 'snarkyjs';
import {CID} from "multiformats";
import {convertCIDtoFields, convertFieldstoCID} from "./NFT";

describe('index.ts', () => {
  describe('foo()', () => {
    beforeAll(async () => {
      //await isReady;
    });
    afterAll(async () => {
      //await shutdown();
    });
    it('should convert cid to field and back', async () => {
      let cid = CID.parse('bafybeie2cnli2vrkyzdnuv6ed7cn7ugiowd76kignndhffin23unkwxwgu');
      let ff = convertCIDtoFields(cid);
      let cc = convertFieldstoCID(ff);
      console.log(cc.toString());
      //expect(Field(1).add(1)).toEqual(Field(2));
    });
  });
});
