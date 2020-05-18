(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15ec8f58"],{"22d16":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"simple"}},[a("div",{staticStyle:{display:"inline-block",width:"620px","max-width":"100%","margin-bottom":"30px"}},[t._m(0),t._m(1),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("基础伤害数值：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.damage,expression:"damage"}],attrs:{type:"text"},domProps:{value:t.damage},on:{input:function(e){e.target.composing||(t.damage=e.target.value)}}})])]),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("基础破甲数值：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sunder,expression:"sunder"}],attrs:{type:"text"},domProps:{value:t.sunder},on:{input:function(e){e.target.composing||(t.sunder=e.target.value)}}})])]),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("技能伤害倍率：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.times,expression:"times"}],attrs:{type:"text"},domProps:{value:t.times},on:{input:function(e){e.target.composing||(t.times=e.target.value)}}})])]),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("技能伤害加成：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.bonus,expression:"bonus"}],attrs:{type:"text"},domProps:{value:t.bonus},on:{input:function(e){e.target.composing||(t.bonus=e.target.value)}}})])]),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("轻甲防御：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.defense1,expression:"defense1"}],attrs:{type:"text"},domProps:{value:t.defense1},on:{input:function(e){e.target.composing||(t.defense1=e.target.value)}}})])]),a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("中甲防御：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.defense2,expression:"defense2"}],attrs:{type:"text"},domProps:{value:t.defense2},on:{input:function(e){e.target.composing||(t.defense2=e.target.value)}}})])]),a("div",{staticClass:"eqLine",staticStyle:{"margin-bottom":"30px"}},[a("div",{staticClass:"label"},[t._v("重甲防御：")]),a("div",{staticClass:"text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.defense3,expression:"defense3"}],attrs:{type:"text"},domProps:{value:t.defense3},on:{input:function(e){e.target.composing||(t.defense3=e.target.value)}}})])]),t._m(2),t._m(3),t._m(4)]),a("v-chart",{staticStyle:{width:"600px",height:"400px","max-width":"100%"},attrs:{options:t.monthActive,autoResize:!0}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("当前默认属性为：")]),a("div",{staticClass:"text"},[t._v("\n                全身绿装战矛；图表为独龙钻的伤害结算\n            ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("人物属性：")]),a("div",{staticClass:"text"},[t._v("\n                72点；技巧属性 = 72 - 力量属性\n            ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("计算公式：")]),a("div",{staticClass:"text"},[t._v("\n                最终伤害 = ((基础伤害 × 技能倍率) + 技能伤害加成) × (1 - 敌人护甲/伤害破甲)\n            ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("例如：")]),a("div",{staticClass:"text"},[t._v("\n                独龙钻技能描述：367%的基础伤害 + 4765穿刺伤害。\n            ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eqLine"},[a("div",{staticClass:"label"},[t._v("最终伤害：")]),a("div",{staticClass:"text"},[t._v("\n                ((1135 × 3.67) + 4765) × (1 - 敌人护甲/1567)\n            ")])])}],n=(a("c5f6"),a("d225")),l=a("b0b4"),o=a("308d"),c=a("6bb5"),d=a("4e2b"),r=a("9ab4"),v=a("60a3"),u=a("e069"),m=function(t){function e(){var t;return Object(n["a"])(this,e),t=Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.xAxisData=[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72],t.sunder=1567,t.damage=1135,t.times=3.67,t.bonus=4765,t.defense1=350,t.defense2=490,t.defense3=850,t}return Object(d["a"])(e,t),Object(l["a"])(e,[{key:"calcData",value:function(t){var e=0,a=[];1==t?e=this.defense1:2==t?e=this.defense2:3==t&&(e=this.defense3);for(var s=0;s<this.xAxisData.length;s++){var i=((this.damage+6*(72-this.xAxisData[s]))*this.times+this.bonus)*(1-e/(this.sunder+6*this.xAxisData[s]));a.push(Number(i.toFixed(2)))}return a}},{key:"mounted",value:function(){var t=72,e=850;this.damage,this.sunder;console.log(1-e/(this.sunder+6*t),3.67*(this.damage+6*(72-t))+4765)}},{key:"monthActive",get:function(){return{title:{text:"基础伤害与破甲的伤害结算",textStyle:{color:"#000",fontSize:16},left:"center",top:0},textStyle:{color:"#999999"},tooltip:{trigger:"axis"},color:["#40E137","#0095ff","#E139FF"],calculable:!0,grid:{left:"24",right:"36",top:"60",bottom:"10",containLabel:!0},legend:{data:["轻甲","中甲","重甲"],top:"30",right:"2",itemGap:15,textStyle:{color:"#000",fontSize:12}},xAxis:[{type:"category",data:this.xAxisData,name:"力量",boundaryGap:!1,nameLocation:"end",nameTextStyle:{color:"#000",padding:[25,0,0,-5]},axisLabel:{fontSize:10,textStyle:{color:"#000"}},axisLine:{lineStyle:{color:"#000"}},axisTick:{show:!1}}],yAxis:[{name:"最终伤害",axisLabel:{fontSize:10,textStyle:{color:"#000"}},nameLocation:"end",axisTick:{show:!1},min:4e3,nameTextStyle:{color:"#000",padding:[0,0,0,0]},splitLine:{show:!1},axisLine:{lineStyle:{color:"#000"}}}],series:[{name:"轻甲",type:"line",smooth:!0,data:this.calcData(1)},{name:"中甲",type:"line",smooth:!0,data:this.calcData(2)},{name:"重甲",type:"line",smooth:!0,data:this.calcData(3)}]}}}]),e}(v["b"]);m=Object(r["a"])([Object(v["a"])({components:{Button:u["Button"]}})],m);var p=m,x=p,f=(a("adec"),a("2877")),h=Object(f["a"])(x,s,i,!1,null,"2c0b8581",null);e["default"]=h.exports},"713f":function(t,e,a){},adec:function(t,e,a){"use strict";var s=a("713f"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-15ec8f58.757dafef.js.map