import {Bool, Field, isReady, shutdown, UInt64} from 'snarkyjs';
import {CID} from "multiformats";

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
      //console.log(cid.bytes);
      for (let i = 0; i < cid.bytes.length; i++) {
        //let b = cid.bytes[i];
        let b = cid.bytes[i].toString(2).padStart(8, '0');
        let fields = new Array<Field>(8);
        let bools = new Array<Bool>(255);
        for (let j = 0; j < b.length; j++) {
          let c = new Bool(b.at(j) == '1');
          bools.push(c);
          if (j % 255 == 0 || j == b.length - 1) {
            fields.push(Field.ofBits(bools));
            bools = new Array<Bool>(255);
          }
        }
        //console.log(b.toFixed());
      }
      //expect(Field(1).add(1)).toEqual(Field(2));
    });
  });
});
