import { snoc, mapWithIndex } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
export interface Graph<T> {
  nodes: T[];
  edges: number[][];
  //colorsNode:ids[] //group 1 is zero index
}
export function addNode<T>(graph: Graph<T>) {
  return (parents: number[], t: T) => ({
    nodes: snoc(graph.nodes, t),
    edges: pipe(
      graph.edges,
      mapWithIndex((index, node) =>
        parents.some(parentIndex => parentIndex === index)
          ? snoc(node, graph.edges.length)
          : node
      ),
      arr => snoc(arr, [] as number[])
    )
  });
}
export function removeNode<T>(graph: Graph<T>) {
  return (nodeToDelete: T): Graph<T> => {
    const indexOfNodeToDelete = graph.nodes.indexOf(nodeToDelete);
    return indexOfNodeToDelete === -1 || indexOfNodeToDelete === undefined
      ? graph
      : {
          nodes: graph.nodes.filter(node => node !== nodeToDelete),
          edges: graph.edges
            .filter(
              (node, index) => index !== graph.nodes.indexOf(nodeToDelete)
            )
            .map(node =>
              node
                .filter(edge => edge !== indexOfNodeToDelete)
                .map(edge => (edge > indexOfNodeToDelete ? edge - 1 : edge))
            )
        };
  };
}
