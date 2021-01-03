import { Skill, SkillType } from "./Skill";
import { getTemplate } from "./skillTemplate";
import { map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { Graph } from "./graph";
export const defaultNodes = [1, 1, 2].reduce(
  (prev, curr) =>
    pipe(
      getTemplate(prev.map((skill: Skill) => skill.id))(curr),
      map<Skill, Skill[]>(skill => prev.concat(skill)),
      getOrElse(() => prev)
    ),
  [] as Skill[]
);
export const graph: Graph<Skill> = {
  nodes: defaultNodes,
  edges: [[2], [2], []]
};
