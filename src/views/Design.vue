<template>
  <!-- <div class="black"></div> -->
  <panZoom
    :options="{ minZoom: 0.5, maxZoom: 5, initialZoom: 1 }"
    @transform="transform($event)"
    class="panzoom"
  >
    <main>
      <div v-for="row in skillsByTier" v-bind:key="row.lenght" class="row">
        <div
          v-for="skill in row"
          v-bind:key="skill.id"
          v-bind:id="skill.id"
          class="item"
          v-on:click.prevent="select(skill)"
          v-bind:class="{
            selected: skill.selected,
            ghost: skill.type === SkillType.ghost
          }"
        >
          <div class="black">{{ skill.name }}</div>
        </div>
      </div>
    </main>
  </panZoom>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Skill, SkillType } from "./Skill";
import { defaultNodes, graph as graphData } from "./exampleData";
import {
  reverse,
  snoc,
  sort,
  uniq,
  map as arrmap,
  splitAt,
  dropLeft
} from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { eqNumber } from "fp-ts/lib/Eq";
import { ordNumber } from "fp-ts/lib/Ord";
import { array } from "fp-ts/lib/Array";
import {
  Option,
  none,
  some,
  map,
  getOrElse,
  fromNullable,
  isSome,
  option
} from "fp-ts/lib/Option";
import { getTemplate } from "./skillTemplate";
import { addNode, Graph, removeNode } from "./graph";
import { createLine, getUpdatesLines, throttleFunction } from "./utils";

@Component
export default class Design extends Vue {
  SkillType = SkillType;
  graph = graphData;
  visualLines: any[][] = [] as any[][];
  updateVisualLines = (edges: number[][]) => (visualLines: any[][]) => (
    elements: HTMLElement[]
  ) => {
    visualLines.forEach(row => row.forEach(line => line.position()));
    return visualLines;
    // return edges.map((row, from) =>
    //   row.map(edge => createLine(elements[from], elements[edge]))
    // );
    // visualLines.forEach((row, from) =>
    //   row.forEach((line, edgeIndex) => {
    //     const skillIndex = edges[from][edgeIndex];
    //     line.position(elements[from], elements[skillIndex]);
    //     line.color = "coral";
    //     if (elements[skillIndex].className.includes("ghost")) {
    //       line.setOptions({ opacity: 0 });
    //       line.color = "rgba(0, 0, 0, 0.5)";
    //     }
    //   })
    // );
  };

  beforeDestroy() {
    this.visualLines.flat(1).forEach(oldLine => oldLine.remove());
  }
  @Watch("graph", { immediate: true })
  onGraphChange(graph: Graph<Skill>) {
    Vue.nextTick(() => {
      map<HTMLElement[], void>(visual => {
        this.visualLines = getUpdatesLines(this.getLineCreator(visual))(
          graph.edges,
          this.visualLines
        );
        this.visualLines = this.updateVisualLines(graph.edges)(
          this.visualLines
        )(visual);
      })(this.getVisualSkills(graph));
    });
  }
  readonly getLineCreator = (arr: HTMLElement[]) => (
    from: number,
    to: number
  ) => createLine(arr[from], arr[to]);
  getVisualSkills(graph: Graph<Skill>) {
    return array.sequence(option)(
      graph.nodes.map(skill =>
        fromNullable(document.getElementById(skill.id.toString()))
      )
    );
  }
  transform(_: any) {
    // throttleFunction(
    //   () =>
    map<HTMLElement[], void>(x => {
      this.visualLines = this.updateVisualLines(this.graph.edges)(
        this.visualLines
      )(x);
    })(this.getVisualSkills(this.graph));
    //   0.1
    // );
  }
  select(item: Skill) {
    if (item.type === SkillType.ghost) {
      this.graph.nodes = this.graph.nodes.map(skill =>
        skill === item ? { ...skill, type: SkillType.template } : skill
      );
    }
    this.graph.nodes = this.graph.nodes.map(skill =>
      skill === item ? { ...skill, selected: !skill.selected } : skill
    );

    this.graph = this.graph.nodes
      .filter(skill => skill.type === SkillType.ghost)
      .reduce((graph, skill) => removeNode<Skill>(graph)(skill), this.graph);

    this.graph = getOrElse(() => this.graph)(
      map((newSkill: [number[], Skill]) =>
        addNode<Skill>(this.graph)(newSkill[0], newSkill[1])
      )(this.getChangeFromSelection(this.graph.nodes))
    );
  }
  // need function that returns
  getChangeFromSelection(skills: Skill[]): Option<[number[], Skill]> {
    const templatesIds = skills
      .filter(skill => skill.type === SkillType.template)
      .map(skill => skill.id);
    const getGhostSkill = (tier: number) =>
      map((res: Skill): Skill => ({ ...res, type: SkillType.ghost }))(
        getTemplate(templatesIds)(tier)
      );
    const result = skills.filter(skill => skill.selected);
    if (result.length !== 2) {
      return none;
    } else {
      const [first, second] = result as [Skill, Skill];
      if (first.tier === second.tier) {
        return map(
          (skill: Skill) =>
            [[skills.indexOf(first), skills.indexOf(second)], skill] as [
              number[],
              Skill
            ]
        )(getGhostSkill(result[0].tier + 1));
      } else if (Math.abs(first.tier - second.tier) === 1) {
        return map(
          (skill: Skill) =>
            [[skills.indexOf(first), skills.indexOf(second)], skill] as [
              number[],
              Skill
            ]
        )(getGhostSkill(Math.max(result[0].tier, result[1].tier)));
      } else return none;
    }
  }
  get skillsByTier(): Skill[][] {
    return pipe(
      this.graph.nodes,
      arrmap(skill => skill.tier),
      uniq(eqNumber),
      sort(ordNumber),
      reverse,
      arrmap(tier => this.graph.nodes.filter(skill => skill.tier === tier))
    );
  }
}
</script>

<style scoped>
.panzoom {
  height: 100%;
  width: 100%;
}
.selected {
  border-style: solid;
  border-color: gray;
  border-width: 5px;
}
.ghost {
  opacity: 0.5;
}
.panzoom >>> .vue-pan-zoom-scene {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.row {
  display: flex;
  justify-content: center;
  padding: 50px;
}
.item {
  padding: 5px;
}
.black {
  display: block;
  height: 100px;
  width: 144px;
  background-color: black;
  color: white;
}
</style>
