import { convertBase, getHash, maxBase } from "@/views/coder";
import { assert, expect } from "chai";
import { isNone, isSome } from "fp-ts/lib/Option";
describe("Coder", function() {
  describe("#convertBase(value,maxBase,10)", function() {
    it("encode decode same value", function() {
      const value = "2CZR+J";
      const decoded = convertBase(value, maxBase, 10);
      const result = convertBase(decoded, 10, maxBase);
      assert.equal(result, value);
    });
  });
  describe("#convertBase(value,10,maxBase)", function() {
    it("same as expected", function() {
      const value = "2CZR+J";
      const result = convertBase(value, maxBase, 10);
      const expected = (4294967295).toString();
      assert.equal(result, expected);
    });
  });
  describe("#convertBase(value,10,maxBase)", function() {
    it("invalid character", function() {
      const value = "/";
      expect(() => convertBase(value, maxBase, 10)).to.throw();
    });
  });
  describe("#getHash(coded)", function() {
    it("right on good coded hash", function() {
      const value = "aaa";
      assert.isTrue(isSome(getHash(value)));
    });
  });
  describe("#getHash(coded)", function() {
    it("left on wrong coded hash", function() {
      const value = "   ";
      assert.isTrue(isNone(getHash(value)));
    });
  });
});
