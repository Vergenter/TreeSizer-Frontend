<template>
  <!-- <div class="black"></div> -->
  <panZoom
    :options="{ minZoom: 0.5, maxZoom: 5, initialZoom: 1 }"
    class="panzoom backgroundGrid"
    selector="main"
    ref="panzoom"
  >
    <main>
      <div v-for="(row, rowIndex) in skillsByTier" v-bind:key="row.lenght">
        <draggable
          direction="vertical"
          draggable=".item"
          @start="drag = true"
          @end="drag = false"
          @update="indexChange(rowIndex)($event)"
          class="row"
        >
          <div
            v-for="(skill, skillIndex) in skillsByTier[rowIndex]"
            :key="skill.id"
            :id="skill.id"
            class="item"
            @dblclick.stop
            @mousedown="stopPanZoom"
            @mouseout="resumePanZoom"
            @mouseup="resumePanZoom"
            v-bind:class="{
              selected: skill.selected,
              ghost: skill.type === SkillType.ghost
            }"
          >
            <div
              class="black"
              v-on:click.prevent="select(skill)"
              :style="{ backgroundColor: getColor(skill.upgradedId) }"
            >
              {{ skill.name }}
            </div>
            <div
              v-if="skill.tier === 1"
              class="diamond-shape upgrade"
              v-on:click.prevent="upgrade(skill)"
              :style="{ backgroundColor: colors[skillIndex] }"
            >
              <div class="upgrade-count">
                {{ firstTierCounter[skillIndex] }}
              </div>
            </div>
          </div>
          <div v-if="rowIndex === lastRowIndex" class="add-wrapper">
            <md-button
              slot="footer"
              @click="addFirstTier"
              class="md-icon-button md-primary add"
            >
              <md-icon class="md-size-5x">add</md-icon></md-button
            >
            <div class="add add-diamond">
              <div class="diamond-shape">
                <md-icon class="md-size-2x remove-plus" style="color:red"
                  >add</md-icon
                >
              </div>
            </div>
          </div>
        </draggable>
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
import {
  array,
  uniq,
  sort,
  reverse,
  map as arrmap,
  filter,
  findIndex,
  filterMap
} from "fp-ts/lib/Array";
import {
  Option,
  none,
  map,
  getOrElse,
  fromNullable,
  option,
  isSome,
  fromPredicate,
  chain,
  fold,
  some
} from "fp-ts/lib/Option";
import { getTemplate } from "./skillTemplate";
import { addNode, Graph, removeNode, dragNode, updateNode } from "./graph";
import { Arrow, createArrows } from "./arrow";
import draggable from "vuedraggable";
import { canUpgrade, updateUpgrade } from "./skillTree";
@Component({
  components: {
    draggable
  }
})
export default class Design extends Vue {
  SkillType = SkillType;
  graph = graphData;
  arrows: Arrow[] = [] as Arrow[];
  get lastRowIndex() {
    return this.skillsByTier.length - 1;
  }
  addFirstTier() {
    const templatesIds = this.graph.nodes
      .filter(skill => skill.type === SkillType.template)
      .map(skill => skill.id);
    map<Skill, void>(skill => {
      this.graph = addNode<Skill>(this.graph)([], skill);
    })(getTemplate(templatesIds)(1));
  }
  get firstTiers() {
    return this.graph.nodes.filter(skill => skill.tier === 1);
  }
  getColor(group: Option<number>): string {
    return pipe(
      group,
      chain(id => findIndex<Skill>(x => x.id === id)(this.firstTiers)),
      fold(
        () => "#000000",
        index => this.colors[index]
      )
    );
  }
  upgrade(skill: Skill) {
    const selected = this.graph.nodes.filter(skill => skill.selected);
    if (selected.length !== 2) {
      return;
    }
    pipe(
      this.graph.nodes,
      filter((skill: Skill) => skill.selected),
      fromPredicate(selected => selected.length === 2),
      map(
        selected => [selected[0], selected[1], skill] as [Skill, Skill, Skill]
      ),
      map(selected =>
        fold(
          () => {
            this.graph = updateUpgrade(this.graph)(selected);
          },
          x => x
        )(canUpgrade(this.graph)(selected))
      )

      // visualize error like some or other thing ;)
    );
  }
  readonly colors = [
    "#0B6623",
    "#9DC184",
    "#708238",
    "#c7ea46",
    "#3f704d",
    "#00A86B",
    "#8f9779",
    "#4f7942",
    "#29AB87",
    "#AABA9F",
    "#8A9A5B",
    "#99FA99",
    "#01796F",
    "#D0F0C1",
    "#01A573",
    "#4B5320",
    "#51C878",
    "#4CBB17",
    "#39FF14",
    "#434C37",
    "#043927",
    "#679267",
    "#2F8B58",
    "#51C878"
  ];
  stopPanZoom() {
    ((this.$refs.panzoom as unknown) as { pause: () => void }).pause();
  }
  resumePanZoom() {
    ((this.$refs.panzoom as unknown) as { resume: () => void }).resume();
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
  indexChange(index: number) {
    return (event: { oldIndex: number; newIndex: number }) => {
      const oldMappedIndex = this.graph.nodes.indexOf(
        this.skillsByTier[index][event.oldIndex]
      );
      const newMappedIndex = this.graph.nodes.indexOf(
        this.skillsByTier[index][event.newIndex]
      );
      if (oldMappedIndex >= 0 && newMappedIndex >= 0) {
        this.graph = dragNode<Skill>(this.graph)(
          oldMappedIndex,
          newMappedIndex
        );
      }
    };
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
  get firstTierCounter(): number[] {
    const data = filterMap<Skill, number>(node => node.upgradedId)(
      this.graph.nodes
    );
    return this.firstTiers.map(
      skill => data.filter(data => data === skill.id).length / 2
    );
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
  width: 100%;
  height: 100%;
}
svg {
  z-index: -1;
  top: 0;
  left: 0;
  position: absolute;
  overflow: visible;
}
.add-diamond {
  top: 105px;
  left: -53px;
}
.add-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.remove-plus {
  padding-right: 0.15em;
  padding-bottom: 0.15em;
}
.backgroundGrid {
  background-color: rgb(255, 255, 255);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  background-image: -webkit-linear-gradient(
      rgba(0, 0, 0, 0.3) 2px,
      transparent 2px
    ),
    -webkit-linear-gradient(0, rgba(0, 0, 0, 0.3) 2px, transparent 2px),
    -webkit-linear-gradient(rgba(0, 0, 0, 0.11) 1px, transparent 1px),
    -webkit-linear-gradient(0, rgba(0, 0, 0, 0.11) 1px, transparent 1px);
  background-image: -moz-linear-gradient(
      rgba(0, 0, 0, 0.3) 2px,
      transparent 2px
    ),
    -moz-linear-gradient(0, rgba(0, 0, 0, 0.3) 2px, transparent 2px),
    -moz-linear-gradient(rgba(0, 0, 0, 0.11) 1px, transparent 1px),
    -moz-linear-gradient(0, rgba(0, 0, 0, 0.11) 1px, transparent 1px);
  background-image: linear-gradient(rgba(0, 0, 0, 0.3) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 2px, transparent 2px),
    linear-gradient(rgba(0, 0, 0, 0.11) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.11) 1px, transparent 1px);
  -pie-background: linear-gradient(rgba(0, 0, 0, 0.3) 2px, transparent 2px) -2px -2px /
      100px,
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 2px, transparent 2px) -2px -2px /
      100px,
    linear-gradient(rgba(0, 0, 0, 0.11) 1px, transparent 1px) -1px -1px / 20px,
    linear-gradient(90deg, rgba(0, 0, 0, 0.11) 1px, transparent 1px) -1px -1px /
      20px,
    #269;
  behavior: url(/pie/PIE.htc);
}
.add {
  margin-left: 100px;
  position: absolute;
}
.panzoom {
  height: 100%;
  width: 100%;
}
.selected {
  -webkit-box-shadow: 0px 0px 11px 10px rgb(128, 191, 129);
  box-shadow: 0px 0px 11px 10px rgb(128, 191, 129);
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
  position: relative;
}
.black {
  display: block;
  height: 100px;
  width: 144px;
  background-color: black;
  color: white;
  opacity: 0.9;
}
.upgrade {
  position: absolute;
}
.upgrade-count {
  color: #333;
  display: table-cell;
  height: 40px;
  transform: rotate(-45deg);
  vertical-align: middle;
  width: 40px;
  opacity: 0.9;
}
.diamond-shape {
  margin-top: 1em;
  background: #000000;
  height: 40px;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0) rotate(45deg);
  width: 40px;
}
</style>
