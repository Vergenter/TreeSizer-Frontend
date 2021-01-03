<template>
  <!-- <div class="black"></div> -->
  <panZoom
    :options="{ minZoom: 0.5, maxZoom: 5, initialZoom: 1 }"
    class="panzoom"
    selector="main"
    ref="panzoom"
  >
    <main>
      <div v-for="row in skillsByTier" v-bind:key="row.lenght" class="row">
        <div
          v-for="skill in row"
          v-bind:key="skill.id"
          v-bind:id="skill.id"
          class="item"
          v-on:click="select(skill)"
          @dblclick.stop
          @mousedown="stopPanZoom"
          @mouseout="resumePanZoom"
          @mouseup="resumePanZoom"
          v-bind:class="{
            selected: skill.selected,
            ghost: skill.type === SkillType.ghost
          }"
        >
          <div class="black">{{ skill.name }}</div>
        </div>
      </div>
      <svg width="100%" height="100%" style="position:absolute">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgb(255,0,0)" />
          </marker>
        </defs>
        <line
          v-for="arrow in arrows"
          v-bind:key="arrow.id"
          :x1="arrow.x1"
          :y1="arrow.y1"
          :x2="arrow.x2"
          :y2="arrow.y2"
          :class="arrow.class"
          style="stroke:rgb(255,0,0);stroke-width:2"
          marker-end="url(#arrowhead)"
        />
      </svg>
    </main>
  </panZoom>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Skill, SkillType } from "./Skill";
import { graph as graphData } from "./exampleData";
import { pipe } from "fp-ts/lib/function";
import { eqNumber } from "fp-ts/lib/Eq";
import { ordNumber } from "fp-ts/lib/Ord";
import { array, uniq, sort, reverse, map as arrmap } from "fp-ts/lib/Array";
import {
  Option,
  none,
  map,
  getOrElse,
  fromNullable,
  option
} from "fp-ts/lib/Option";
import { getTemplate } from "./skillTemplate";
import { addNode, Graph, removeNode } from "./graph";
import { Arrow, createArrows } from "./arrow";
@Component
export default class Design extends Vue {
  SkillType = SkillType;
  graph = graphData;
  arrows: Arrow[] = [] as Arrow[];

  stopPanZoom() {
    (this.$refs.panzoom as any).pause();
  }
  resumePanZoom() {
    (this.$refs.panzoom as any).resume();
  }
  resizeListener() {
    this.onGraphChange(this.graph);
  }
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.resizeListener);
  }

  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.resizeListener);
  }
  @Watch("graph", { immediate: true })
  onGraphChange(graph: Graph<Skill>) {
    Vue.nextTick(() =>
      map<HTMLElement[], void>(visual => {
        this.arrows = createArrows(graph)(visual);
      })(this.getVisualSkills(graph))
    );
  }
  getVisualSkills(graph: Graph<Skill>) {
    return array.sequence(option)(
      graph.nodes.map(skill =>
        fromNullable(document.getElementById(skill.id.toString()))
      )
    );
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
main {
  position: relative;
}
svg {
  z-index: -1;
  top: 0;
  left: 0;
  position: absolute;
}
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
  margin: 5px 40px;
}
.black {
  display: block;
  height: 100px;
  width: 144px;
  background-color: black;
  color: white;
  opacity: 90%;
}
</style>
