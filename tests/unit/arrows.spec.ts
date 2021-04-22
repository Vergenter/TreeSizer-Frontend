import { assert } from "chai";
import { range } from "fp-ts/lib/Array";

describe("Arrows", function() {
  describe("#createArrows(graph)(elements)", function() {
    it("connection from bottom to up", function() {
      assert.equal(range(1, 10000).indexOf(0), -1);
    });
  });
  describe("#createArrows(graph)(elements)", function() {
    it("connection from left to right", function() {
      assert.equal(range(1, 17000).indexOf(0), -1);
    });
  });
  describe("#createArrows(graph)(elements)", function() {
    it("connection from right to left", function() {
      assert.equal(range(1, 15000).indexOf(0), -1);
    });
  });
});
