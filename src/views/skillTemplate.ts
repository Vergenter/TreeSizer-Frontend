const SkillPerTier = 8;
import { range, difference, head } from "fp-ts/lib/Array";
import { eqNumber } from "fp-ts/lib/Eq";
import { pipe } from "fp-ts/lib/function";
import { map, none, some, chain, Option } from "fp-ts/lib/Option";
import { Skill, SkillType } from "./Skill";
export function getTemplate(idsTaken: number[]) {
  return (tier: number): Option<Skill> =>
    pipe(
      tier,
      tier => (tier >= 0 && tier < 64 ? some(tier) : none),
      map(val => range((val - 1) * SkillPerTier, val * SkillPerTier - 1)),
      map(difference(eqNumber)(idsTaken)),
      chain(head),
      map(id => ({
        type: SkillType.template,
        selected: false,
        id,
        name: `szablon`,
        description: "generic template skill",
        tier,
        upgradedId: none
      }))
    );
}
