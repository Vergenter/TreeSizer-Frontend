import { Graph } from "./graph";
import { Skill, SkillType } from "./Skill";

export interface Arrow {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  //   opacity:number;
  class: string;
}
const mask = {
  bottom: [1, 0.5] as [number, number],
  top: [0, 0.5] as [number, number],
  left: [0.5, 0] as [number, number],
  right: [0.5, 1] as [number, number]
}; // offset for [y,x]
export const createArrows = (graph: Graph<Skill>) => (
  elements: HTMLElement[]
): Arrow[] =>
  graph.edges
    .map((node, from) =>
      node.map(edge => {
        const currMask: [[number, number], [number, number]] =
          graph.nodes[from].tier < graph.nodes[edge].tier
            ? [mask.top, mask.bottom]
            : from > edge
            ? [mask.left, mask.right]
            : [mask.right, mask.left];
        const x1 =
          elements[from].offsetLeft +
          currMask[0][1] * elements[from].offsetWidth;
        const y1 =
          elements[from].offsetTop +
          currMask[0][0] * elements[from].offsetHeight;
        const x2 =
          elements[edge].offsetLeft +
          currMask[1][1] * elements[edge].offsetWidth;
        const y2 =
          elements[edge].offsetTop +
          currMask[1][0] * elements[edge].offsetHeight;
        return {
          id: [x1, y1, x2, y2].map(num => num.toString()).join(""),
          x1,
          y1,
          x2,
          y2,
          color: graph.nodes[edge].type === SkillType.ghost ? "black" : "coral",
          class: graph.nodes[edge].type === SkillType.ghost ? "ghost" : ""
        };
      })
    )
    .flat(1);
// create arrows:
// <graph.edges
// <graph.nodes for skill tier
// <htmlElem for coordinates

// function plan
// edges div->div
// nodes tier to decide if it's top down or left right (same tier left right)
// when is it left or right simple order :)
// html for coordinates
