const SkillPerTier = 8;
import { range, difference, head } from "fp-ts/lib/Array";
import { eqNumber } from "fp-ts/lib/Eq";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Option";
import { SkillType } from "./Skill";
export function getTemplate(idsTaken: number[]) {
  return (tier: number) =>
    pipe(
      tier,
      val => range((val - 1) * SkillPerTier, val * SkillPerTier - 1),
      difference(eqNumber)(idsTaken),
      head,
      map(id => ({
        type: SkillType.template,
        selected: false,
        id,
        name: `template ${id}`,
        description: "generic template skill",
        tier,
        colorGroup: 0
      }))
    );
}
