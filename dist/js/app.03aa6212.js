(function(e){function t(t){for(var n,i,a=t[0],c=t[1],l=t[2],d=0,u=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&u.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(u.length)u.shift()();return s.push.apply(s,l||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,a=1;a<r.length;a++){var c=r[a];0!==o[c]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/TreeSizer-Frontend/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var p=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"034f":function(e,t,r){"use strict";r("85ec")},"04b1":function(e,t,r){"use strict";r("cc57")},"85ec":function(e,t,r){},cc57:function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);var n,o=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),r("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),r("router-view")],1)},i=[],a=(r("034f"),r("2877")),c={},l=Object(a["a"])(c,s,i,!1,null,null,null),p=l.exports,d=r("8c4f"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("panZoom",{ref:"panzoom",staticClass:"panzoom",attrs:{options:{minZoom:.5,maxZoom:5,initialZoom:1},selector:"main"}},[r("main",[e._l(e.skillsByTier,(function(t,n){return r("div",{key:t.lenght},[r("draggable",{staticClass:"row",attrs:{direction:"vertical"},on:{start:function(t){e.drag=!0},end:function(t){e.drag=!1},update:function(t){e.indexChange(n)(t)}}},e._l(e.skillsByTier[n],(function(t){return r("div",{key:t.id,staticClass:"item",class:{selected:t.selected,ghost:t.type===e.SkillType.ghost},attrs:{id:t.id},on:{click:function(r){return r.preventDefault(),e.select(t)},dblclick:function(e){e.stopPropagation()},mousedown:e.stopPanZoom,mouseout:e.resumePanZoom,mouseup:e.resumePanZoom}},[r("div",{staticClass:"black"},[e._v(e._s(t.name))])])})),0)],1)})),r("svg",{staticStyle:{position:"absolute"},attrs:{width:"100%",height:"100%"}},[r("defs",[r("marker",{attrs:{id:"arrowhead",markerWidth:"10",markerHeight:"7",refX:"9",refY:"3.5",orient:"auto"}},[r("polygon",{attrs:{points:"0 0, 10 3.5, 0 7",fill:"rgb(255,0,0)"}})])]),e._l(e.arrows,(function(e){return r("line",{key:e.id,class:e.class,staticStyle:{stroke:"rgb(255,0,0)","stroke-width":"2"},attrs:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,"marker-end":"url(#arrowhead)"}})}))],2)],2)])},h=[],f=r("9ab4"),g=r("60a3");(function(e){e[e["normal"]=0]="normal",e[e["ghost"]=1]="ghost",e[e["template"]=2]="template",e[e["error"]=3]="error"})(n||(n={}));const m={equals:(e,t)=>e.id===t.id};m.equals;var b=r("e41f"),O=r("427d"),y=r("3af4"),v=r("906c");const j=8;function x(e){return t=>Object(y["pipe"])(t,e=>Object(b["range"])((e-1)*j,e*j-1),Object(b["difference"])(O["eqNumber"])(e),b["head"],Object(v["map"])(e=>({type:n.template,selected:!1,id:e,name:"template "+e,description:"generic template skill",tier:t,colorGroup:0})))}const k=[1,1,2].reduce((e,t)=>Object(y["pipe"])(x(e.map(e=>e.id))(t),Object(v["map"])(t=>e.concat(t)),Object(v["getOrElse"])(()=>e)),[]),w={nodes:k,edges:[[2],[2],[]]};var _=r("5b90");function S(e){return(t,r)=>({nodes:Object(b["snoc"])(e.nodes,r),edges:Object(y["pipe"])(e.edges,Object(b["mapWithIndex"])((r,n)=>t.some(e=>e===r)?Object(b["snoc"])(n,e.edges.length):n),e=>Object(b["snoc"])(e,[]))})}function T(e){return t=>{const r=e.nodes.indexOf(t);return-1===r||void 0===r?e:{nodes:e.nodes.filter(e=>e!==t),edges:e.edges.filter((r,n)=>n!==e.nodes.indexOf(t)).map(e=>e.filter(e=>e!==r).map(e=>e>r?e-1:e))}}}function P(e){return(t,r)=>({nodes:e.nodes.map((n,o)=>o===r?e.nodes[t]:t>=o&&o>r?e.nodes[o-1]:r>o&&o>=t?e.nodes[o+1]:n),edges:e.edges.map((n,o)=>(o===r?e.edges[t]:t>=o&&o>r?e.edges[o-1]:r>o&&o>=t?e.edges[o+1]:n).map(e=>e===r?t:t>=e&&e>r?e-1:r>e&&e>=t?e+1:e))})}const z={bottom:[1,.5],top:[0,.5],left:[.5,0],right:[.5,1]},C=e=>t=>e.edges.map((r,o)=>r.map(r=>{const s=e.nodes[o].tier<e.nodes[r].tier?[z.top,z.bottom]:o>r?[z.left,z.right]:[z.right,z.left],i=t[o].offsetLeft+s[0][1]*t[o].offsetWidth,a=t[o].offsetTop+s[0][0]*t[o].offsetHeight,c=t[r].offsetLeft+s[1][1]*t[r].offsetWidth,l=t[r].offsetTop+s[1][0]*t[r].offsetHeight;return{id:[i,a,c,l].map(e=>e.toString()).join(""),x1:i,y1:a,x2:c,y2:l,color:e.nodes[r].type===n.ghost?"black":"coral",class:e.nodes[r].type===n.ghost?"ghost":""}})).flat(1);var Z=r("b76a"),E=r.n(Z);let L=class extends g["b"]{constructor(){super(...arguments),this.SkillType=n,this.graph=w,this.arrows=[]}stopPanZoom(){this.$refs.panzoom.pause()}resumePanZoom(){this.$refs.panzoom.resume()}resizeListener(){this.onGraphChange(this.graph)}mounted(){window.addEventListener("resize",this.resizeListener)}beforeDestroy(){window.removeEventListener("resize",this.resizeListener)}indexChange(e){return t=>{const r=this.graph.nodes.indexOf(this.skillsByTier[e][t.oldIndex]),n=this.graph.nodes.indexOf(this.skillsByTier[e][t.newIndex]);r>=0&&n>=0&&(this.graph=P(this.graph)(r,n))}}onGraphChange(e){g["b"].nextTick(()=>Object(v["map"])(t=>{this.arrows=C(e)(t)})(this.getVisualSkills(e)))}getVisualSkills(e){return b["array"].sequence(v["option"])(e.nodes.map(e=>Object(v["fromNullable"])(document.getElementById(e.id.toString()))))}select(e){e.type===n.ghost&&(this.graph.nodes=this.graph.nodes.map(t=>t===e?{...t,type:n.template}:t)),this.graph.nodes=this.graph.nodes.map(t=>t===e?{...t,selected:!t.selected}:t),this.graph=this.graph.nodes.filter(e=>e.type===n.ghost).reduce((e,t)=>T(e)(t),this.graph),this.graph=Object(v["getOrElse"])(()=>this.graph)(Object(v["map"])(e=>S(this.graph)(e[0],e[1]))(this.getChangeFromSelection(this.graph.nodes)))}getChangeFromSelection(e){const t=e.filter(e=>e.type===n.template).map(e=>e.id),r=e=>Object(v["map"])(e=>({...e,type:n.ghost}))(x(t)(e)),o=e.filter(e=>e.selected);if(2!==o.length)return v["none"];{const[t,n]=o;return t.tier===n.tier?Object(v["map"])(r=>[[e.indexOf(t),e.indexOf(n)],r])(r(o[0].tier+1)):1===Math.abs(t.tier-n.tier)?Object(v["map"])(r=>[[e.indexOf(t),e.indexOf(n)],r])(r(Math.max(o[0].tier,o[1].tier))):v["none"]}}get skillsByTier(){return Object(y["pipe"])(this.graph.nodes,Object(b["map"])(e=>e.tier),Object(b["uniq"])(O["eqNumber"]),Object(b["sort"])(_["ordNumber"]),b["reverse"],Object(b["map"])(e=>this.graph.nodes.filter(t=>t.tier===e)))}};Object(f["a"])([Object(g["c"])("graph",{immediate:!0})],L.prototype,"onGraphChange",null),L=Object(f["a"])([Object(g["a"])({components:{draggable:E.a}})],L);var q=L,B=q,M=(r("04b1"),Object(a["a"])(B,u,h,!1,null,"67b7941b",null)),$=M.exports;o["a"].use(d["a"]);const F=[{path:"",name:"Design",component:$}],G=new d["a"]({mode:"history",base:"/TreeSizer-Frontend/",routes:F});var H=G,I=r("2d7e");o["a"].use(I["a"]),o["a"].config.productionTip=!1,new o["a"]({router:H,render:e=>e(p)}).$mount("#app")}});
//# sourceMappingURL=app.03aa6212.js.map