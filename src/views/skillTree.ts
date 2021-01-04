import { Skill } from "./Skill";
import { Graph } from "./graph";
import { none, some, Option, getEq } from "fp-ts/lib/Option";
import { eqNumber } from "fp-ts/lib/Eq";
export interface Error {
  errorMessage: string[];
}
export const invalidInput: Error = { errorMessage: ["invalid input"] };
//can advance (graph)=>([Skill,Skill]):Option<Error>
//  errors:
// invalid input -> String/Code
// not enought foundations -> list of tiers and counts where there is too little of them
// requirements not satisfied -> lacking requierments
// no templates -> simple message
export const canAdvance = (graph: Graph<Skill>) => ([s1, s2]: [
  Skill,
  Skill
]): Option<Error> => {
  return s1.tier === s2.tier ? none : some(invalidInput);
};
//can extend (graph)=>([Skill,Skill]):Option<Error>
// errors:
// invalid input
// not enought foundations -> information in which tier lacks foundations
// skill don't have variation
// no templates
export const canExtend = (graph: Graph<Skill>) => ([s1, s2]: [
  Skill,
  Skill
]): Option<Error> => {
  return s1.tier === s2.tier + 1 || s1.tier === s2.tier - 1
    ? none
    : some(invalidInput);
};
//can upgrade (graph)=>([Skill,Skill,Skill]):Option<Error>
//  errors:
// invalid input
// not enought foundations -> information in which tier lacks foundations
// requirements not satisfied => information about problem
// cannot upgrade itself
// cannot upgrade template
export const canUpgrade = (graph: Graph<Skill>) => ([s1, s2, s3]: [
  Skill,
  Skill,
  Skill
]): Option<Error> => {
  return s1.tier === s2.tier && s3.tier === 1 ? none : some(invalidInput);
};

const optionNumberEq = getEq(eqNumber);
export const updateUpgrade = (graph: Graph<Skill>) => ([s1, s2, s3]: [
  Skill,
  Skill,
  Skill
]): Graph<Skill> => {
  const isPair = (skill: Skill) =>
    (skill.tier === s1.tier &&
      optionNumberEq.equals(skill.upgradedId, s1.upgradedId)) ||
    (skill.tier === s2.tier &&
      optionNumberEq.equals(skill.upgradedId, s2.upgradedId));
  const isS1orS2 = (skill: Skill) => skill.id === s1.id || skill.id === s2.id;
  return {
    nodes: graph.nodes.map(skill =>
      isS1orS2(skill)
        ? { ...skill, upgradedId: some(s3.id) }
        : isPair(skill)
        ? { ...skill, upgradedId: none }
        : skill
    ),
    edges: graph.edges
  };
};
