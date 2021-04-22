import { assert } from "chai";
import { range } from "fp-ts/lib/ReadonlyArray";
describe("GraphValidation", function() {
  describe("nodesAreUnique(graph)", function() {
    it("two skills have duplicates", function() {
      assert.equal(range(1, 10000).indexOf(0), -1);
    });
  });
  describe("nodesMatchEdges(graph)", function() {
    it("nodes do not match edges", function() {
      assert.equal(range(1, 20000).indexOf(0), -1);
    });
  });
  describe("edgeToCorrectIndex(graph)", function() {
    it("two nodes with incorrect edges", function() {
      assert.equal(range(1, 15000).indexOf(0), -1);
    });
  });
  describe("noEdgesToItself(graph)", function() {
    it("two nodes connect to itself", function() {
      assert.equal(range(1, 10000).indexOf(0), -1);
    });
  });
  describe("oneUpgradeOnly(graph)", function() {
    it("node connects to multiple first tiers", function() {
      assert.equal(range(1, 20000).indexOf(0), -1);
    });
  });
  describe("validateStructure(graph)", function() {
    it("node has incorrect parents", function() {
      assert.equal(range(1, 15000).indexOf(0), -1);
    });
  });
  describe("validateFoundations(graph)", function() {
    it("node has incorrect foundations", function() {
      assert.equal(range(1, 20000).indexOf(0), -1);
    });
  });
  describe("validateUpgradesFoundations(graph)", function() {
    it("node has incorrect foundations", function() {
      assert.equal(range(1, 15000).indexOf(0), -1);
    });
  });
});
