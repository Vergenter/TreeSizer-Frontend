import { Eq } from "fp-ts/lib/Eq";
import { Ord } from "fp-ts/lib/Ord";
import { Option } from "fp-ts/lib/Option";
export enum SkillType {
  normal,
  ghost,
  template,
  error
}
// export clicked=(graph:Graph)=>(skill:Skill):{
//   //select unselect
// }
export interface Skill {
  type: SkillType;
  selected: boolean;
  id: number;
  name: string;
  description: string;
  tier: number;
  colorGroup: Option<number>;
}
export const skillEq: Eq<Skill> = {
  equals: (s1: Skill, s2: Skill) => s1.id === s2.id
};
export const ordSkill: Ord<Skill> = {
  compare: (a, b) => (a.tier > b.tier ? 1 : a.tier < b.tier ? -1 : 0),
  equals: skillEq.equals
};
