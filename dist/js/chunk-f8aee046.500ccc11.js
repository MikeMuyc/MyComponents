(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8aee046"],{"166d":function(t,e,a){"use strict";var n=a("b08b"),l=a.n(n);l.a},"3a8a":function(t,e,a){"use strict";var n=a("d686"),l=a.n(n);l.a},"45ce":function(t,e,a){},"56a1":function(t,e,a){},"5c40":function(t,e,a){"use strict";var n=a("56a1"),l=a.n(n);l.a},6464:function(t,e,a){},"7f7f":function(t,e,a){var n=a("86cc").f,l=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in l||a("9e1e")&&n(l,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},"8a7e":function(t,e,a){"use strict";var n=a("6464"),l=a.n(n);l.a},b08b:function(t,e,a){},b0fa:function(t,e,a){"use strict";var n=a("45ce"),l=a.n(n);l.a},ce1f:function(t,e,a){"use strict";a.r(e);var n,l,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.squareHeight},attrs:{id:"paperDetail"}},[a("div",{staticClass:"square"},[a("mixSelect",{attrs:{selectList:t.testJson,labelName:"name",valueName:"val",childrenName:"children"},on:{sentTo:t.getVal}}),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("可以无限级展开的菜单组件")])],1),a("div",{staticClass:"square"},[a("div",{staticClass:"btnLine"},[a("button",{staticClass:"start",on:{click:t.goit}},[t._v("开始")]),a("button",{staticClass:"stop",staticStyle:{"margin-right":"20px"},on:{click:t.backit}},[t._v("停止")]),a("button",{staticClass:"set",class:{active:1===t.actIndex},on:{click:function(e){return t.set("white",1)}}},[t._v("必中白球")]),a("button",{staticClass:"set",class:{active:2===t.actIndex},on:{click:function(e){return t.set("black",2)}}},[t._v("必中黑球")]),a("button",{staticClass:"set",class:{active:3===t.actIndex},on:{click:function(e){return t.set("",3)}}},[t._v("恢复概率")])]),a("randomBall",{ref:"random"}),a("p",{staticStyle:{position:"absolute",bottom:"30px"}},[t._v("白球46%，铜球24%，银球16%，金球10%，黑球4%")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("随机球组件，概率、中奖项可设置")])],1),a("div",{staticClass:"square"},[a("vue-perfect-scrollbar",{staticStyle:{height:"100%",width:"100%"}},[a("div",{staticStyle:{height:"800px",width:"800px",position:"relative"}},[a("p",[t._v("滚动条组件")]),a("p",[t._v("如果是用在body上作为全局滚动条，可以将isBodyScroll设置为true\n                ")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("这里是底部")]),a("p",{staticStyle:{position:"absolute",right:"10px",top:"0",width:"20px"}},[t._v("这里是右边")])])])],1),a("div",{staticClass:"square"},[a("myBtn",{attrs:{type:"normal",text:"下一个",handleClick:t.aaa}}),a("myBtn",{attrs:{type:"confirm",text:"确认"}}),a("myBtn",{attrs:{type:"cancel",text:"取消"}}),a("p",{staticStyle:{position:"absolute",bottom:"20px"}},[t._v("Vue中的render函数，适用于相同组件的不同状态的css样式呈现。")])],1)])},i=[],c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mixSelect"},[a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.handleClose,expression:"handleClose"}],staticClass:"singleBOX",class:{active:t.showflag}},[a("span",{staticClass:"valuebox",attrs:{title:t.labelText},on:{click:function(e){t.showflag=!t.showflag}}},[a("em",{class:{active:"请选择"!==t.labelText}},[t._v(t._s(t.labelText))]),a("i",{staticClass:"iconfont icon-daosanjiao svgse",class:{active:t.showflag}})]),a("transition",{attrs:{name:"slfade"}},[t.showflag?a("tSelect",{attrs:{arr:t.list,labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)])},o=[],r=(a("7f7f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"tSelect",staticClass:"tSelect"},t._l(t.arr,function(e,n){return a("div",{staticClass:"tLine"},[a("div",{staticClass:"tLabel",on:{mouseenter:function(e){t.hoverIndex=n},click:function(a){return t.sentVal(e[t.valueName],e[t.labelName])}}},[t._v(t._s(e[t.labelName]))]),a("transition",{attrs:{name:"tfade"}},[e[t.childrenName]&&t.hoverIndex===n?a("tSelect",{directives:[{name:"show",rawName:"v-show",value:t.hoverIndex===n,expression:"hoverIndex === index"}],style:{left:t.leftVal},attrs:{arr:e[t.childrenName],labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)}),0)}),u=[],f=a("2b0e"),h=new f["default"],m={name:"tSelect",props:["arr","labelName","valueName","childrenName"],data:function(){return{hoverIndex:-1,leftVal:""}},mounted:function(){var t=this;this.$nextTick(function(){t.leftVal=t.$refs.tSelect.clientWidth+5+"px"})},methods:{sentVal:function(t,e){t&&h.$emit("tsObj",{val:t,name:e})}}},v=m,d=(a("166d"),a("2877")),p=Object(d["a"])(v,r,u,!1,null,"037c558a",null),b=p.exports,x={name:"mixSelect",components:{tSelect:b},props:["selectList","labelName","valueName","childrenName"],data:function(){return{showflag:!1,labelText:"请选择",list:[]}},computed:{},mounted:function(){this.selectList&&(this.list=this.selectList);var t=this;h.$on("tsObj",function(e){t.labelText=e.name,t.$emit("sentTo",e.val),t.showflag=!1})},methods:{handleClose:function(){this.showflag=!1}}},g=x,w=(a("b0fa"),Object(d["a"])(g,c,o,!1,null,"b3886068",null)),y=w.exports,_=[{name:"全部",val:"0"},{name:"工程管理类",children:[{name:"全部工程管理类",val:"10"},{name:"污水处理及配套设施",val:"11",children:[{name:"1类项目",val:"962"},{name:"2类项目",val:"4186"}]},{name:"饮用水源地污染防治项目",val:"12",children:[{name:"地表水治理",val:"830"},{name:"山泉水饮用",val:"213",children:[{name:"开发",val:"213-1"},{name:"环境维护",val:"213-2"}]}]},{name:"区域水环境综合整治",val:"13"}]},{name:"管理类项目",children:[{name:"全部管理类",val:"20"},{name:"土地管理",val:"21",children:[{name:"土地面测绘",val:"21-1"},{name:"土地资源整合",val:"21-2"}]},{name:"环境管理",val:"22"},{name:"电力管理",val:"23"}]}],N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"randomBall"}},[a("i",{staticClass:"iconfont icon-jiang"}),a("ul",{staticClass:"bolist"},t._l(t.ball,function(e,n){return a("li",{class:e,style:{marginLeft:t.leftpx(n)}})}),0)])},C=[],S=a("e814"),k=a.n(S),I={name:"randomBall",data:function(){return{ball:["white","copper","white","gold","white","white","silver","white","white","copper","white","gold","white","white","silver","white"],xleft:0,setBall:"",stopFlag:!0,fn1:null,fn2:null}},mounted:function(){},methods:{leftpx:function(t){if(0===t)return this.xleft+"px"},startit:function(){var t=this;if(this.fn1);else{for(var e=[],a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}this.ball=this.ball.concat(e),this.fn2=setInterval(function(){t.xleft-=2},5),this.fn1=setInterval(function(){e=[];for(var a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}t.ball=t.ball.concat(e)},1e3)}},stopit:function(){var t=this;if(this.stopFlag){this.stopFlag=!1;var e=this.xleft,a=-this.xleft/70+15;if(a=k()(a),this.setBall&&(this.ball[a]=this.setBall),this.fn1)var n=5,l=0,s=setInterval(function(){n<20&&(l<4?l++:n+=1,clearInterval(t.fn2),t.fn2=setInterval(function(){t.xleft-=2;var a=e-910,n=e-840;t.xleft>=a&&t.xleft<=n&&t.xleft%70===0&&(clearInterval(t.fn2),clearInterval(s),clearInterval(t.fn1),t.fn1=null,t.stopFlag=!0)},n))},200)}}}},B=I,$=(a("3a8a"),Object(d["a"])(B,N,C,!1,null,"7e49a68e",null)),j=$.exports,T={name:"myBtn",props:{type:{type:String,default:"normal"},text:{type:String,default:"按钮"},handleClick:{type:Function,default:function(){}}},render:function(t){return t("div",{class:{mybtn:!0,confirm:"confirm"===this.type,cancel:"cancel"===this.type,normal:"normal"===this.type},domProps:{innerText:this.text},on:{click:this.handleClick}})},methods:{}},L=T,O=(a("8a7e"),Object(d["a"])(L,n,l,!1,null,"4ae2643d",null)),V=O.exports,q={name:"paperDetail",components:{randomBall:j,mixSelect:y,myBtn:V},data:function(){return{testJson:_,squareHeight:document.body.clientHeight-100+"px",actIndex:3}},mounted:function(){},methods:{goit:function(){this.$refs.random.startit()},backit:function(){this.$refs.random.stopit()},getVal:function(t){console.log(t)},set:function(t,e){this.$refs.random.setBall=t,this.actIndex=e},aaa:function(){console.log(112)}}},F=q,E=(a("5c40"),Object(d["a"])(F,s,i,!1,null,"27bf7db5",null));e["default"]=E.exports},d686:function(t,e,a){}}]);
//# sourceMappingURL=chunk-f8aee046.500ccc11.js.map