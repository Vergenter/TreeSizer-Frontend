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

export function dragNode<T>(graph: Graph<T>) {
  return (fromIndex: number, toIndex: number): Graph<T> => ({
    nodes: graph.nodes.map((node, index) =>
      index === toIndex
        ? graph.nodes[fromIndex]
        : fromIndex >= index && index > toIndex
        ? graph.nodes[index - 1]
        : toIndex > index && index >= fromIndex
        ? graph.nodes[index + 1]
        : node
    ),
    edges: graph.edges.map((node, index) =>
      (index === toIndex
        ? graph.edges[fromIndex]
        : fromIndex >= index && index > toIndex
        ? graph.edges[index - 1]
        : toIndex > index && index >= fromIndex
        ? graph.edges[index + 1]
        : node
      ).map(edge =>
        edge === toIndex
          ? fromIndex
          : fromIndex >= edge && edge > toIndex
          ? edge - 1
          : toIndex > edge && edge >= fromIndex
          ? edge + 1
          : edge
      )
    )
  });
}
export function swapNode<T>(graph: Graph<T>) {
  return (fromIndex: number, toIndex: number): Graph<T> => ({
    nodes: graph.nodes.map((node, index) =>
      index === fromIndex
        ? graph.nodes[toIndex]
        : index === toIndex
        ? graph.nodes[fromIndex]
        : node
    ),
    edges: graph.edges.map((node, index) =>
      index === fromIndex
        ? graph.edges[toIndex]
        : index === toIndex
        ? graph.edges[fromIndex]
        : node.map(edge =>
            edge === fromIndex ? toIndex : edge === toIndex ? fromIndex : edge
          )
    )
  });
}
