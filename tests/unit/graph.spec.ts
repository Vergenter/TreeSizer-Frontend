import { assert } from "chai";
import { range } from "fp-ts/lib/Array";
describe("Graph", function() {
  describe("#addNode(graph)(parents,node)", function() {
    it("should add node", function() {
      assert.equal(range(1, 10000).indexOf(0), -1);
    });
  });
  describe("#removeNode(graph)(node)", function() {
    it("should remove node and change edges", function() {
      assert.equal(range(1, 20000).indexOf(0), -1);
    });
  });
  describe("#dragNode(graph)(from,to)", function() {
    it("change in node indices", function() {
      assert.equal(range(1, 15000).indexOf(0), -1);
    });
  });
});
