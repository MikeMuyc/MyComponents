(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43f81abb"],{"0d9e":function(t,e,a){"use strict";var n=a("48f3"),i=a.n(n);i.a},"166d":function(t,e,a){"use strict";var n=a("b08b"),i=a.n(n);i.a},"48f3":function(t,e,a){},6464:function(t,e,a){},"7b83":function(t,e,a){"use strict";var n=a("e935"),i=a.n(n);i.a},"7f7f":function(t,e,a){var n=a("86cc").f,i=Function.prototype,l=/^\s*function ([^ (]*)/,s="name";s in i||a("9e1e")&&n(i,s,{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(t){return""}}})},"8a7e":function(t,e,a){"use strict";var n=a("6464"),i=a.n(n);i.a},b08b:function(t,e,a){},bc12:function(t,e,a){},bdb1:function(t,e,a){"use strict";var n=a("bc12"),i=a.n(n);i.a},ce1f:function(t,e,a){"use strict";a.r(e);var n,i,l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.squareHeight},attrs:{id:"paperDetail"}},[a("div",{staticClass:"square"},[a("mixSelect",{attrs:{selectList:t.testJson,labelName:"name",valueName:"val",childrenName:"children"},on:{sentTo:t.getVal}}),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("可以无限级展开的菜单组件，因为是向右展开，请注意控制组件与浏览器右边界的距离")])],1),a("div",{staticClass:"square"},[a("div",{staticClass:"btnLine"},[a("button",{staticClass:"start",on:{click:t.goit}},[t._v("开始")]),a("button",{staticClass:"stop",staticStyle:{"margin-right":"20px"},on:{click:t.backit}},[t._v("停止")]),a("button",{staticClass:"set",class:{active:1===t.actIndex},on:{click:function(e){return t.set("white",1)}}},[t._v("必中白球")]),a("button",{staticClass:"set",class:{active:2===t.actIndex},on:{click:function(e){return t.set("black",2)}}},[t._v("必中黑球")]),a("button",{staticClass:"set",class:{active:3===t.actIndex},on:{click:function(e){return t.set("",3)}}},[t._v("恢复概率")])]),a("randomBall",{ref:"random"}),a("p",{staticStyle:{position:"absolute",bottom:"30px"}},[t._v("白球46%，铜球24%，银球16%，金球10%，黑球4%")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("随机球组件，概率、中奖项可设置")])],1),a("div",{staticClass:"square"},[a("vue-perfect-scrollbar",{staticStyle:{height:"100%",width:"100%"}},[a("div",{staticStyle:{height:"800px",width:"800px",position:"relative"}},[a("p",[t._v("滚动条组件")]),a("p",[t._v("如果是用在body上作为全局滚动条，可以将isBodyScroll设置为true\n                ")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("这里是底部")]),a("p",{staticStyle:{position:"absolute",right:"10px",top:"0",width:"20px"}},[t._v("这里是右边")])])])],1),a("div",{staticClass:"square"},[a("myBtn",{attrs:{type:"normal",text:"下雪",handleClick:t.snowy}}),a("myBtn",{attrs:{type:"cancel",text:"取消",handleClick:t.cancelSnow}}),a("p",{staticStyle:{position:"absolute",bottom:"30px"}},[t._v("Vue中的render函数，适用于相同组件不同状态的css样式呈现。点击“下雪”，开启动画")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("Vue中为了支持JSX，需要通过一个JSX的Babel的插件。")]),t._l(t.snowList,function(e){return a("i",{staticClass:"iconfont iconxuehua ",style:t.styleful(e)})})],2)])},s=[],o=a("e814"),c=a.n(o),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mixSelect"},[a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.handleClose,expression:"handleClose"}],staticClass:"singleBOX",class:{active:t.showflag}},[a("span",{staticClass:"valuebox",attrs:{title:t.labelText},on:{click:function(e){t.showflag=!t.showflag}}},[a("em",{class:{active:"请选择"!==t.labelText}},[t._v(t._s(t.labelText))]),a("i",{staticClass:"iconfont icondaosanjiao svgse",class:{active:t.showflag}})]),a("transition",{attrs:{name:"slfade"}},[t.showflag?a("tSelect",{attrs:{arr:t.list,labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)])},u=[],f=(a("7f7f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"tSelect",staticClass:"tSelect"},t._l(t.arr,function(e,n){return a("div",{staticClass:"tLine"},[a("div",{staticClass:"tLabel",on:{mouseenter:function(e){t.hoverIndex=n},click:function(a){return t.sentVal(e[t.valueName],e[t.labelName])}}},[t._v(t._s(e[t.labelName]))]),a("transition",{attrs:{name:"tfade"}},[e[t.childrenName]&&t.hoverIndex===n?a("tSelect",{directives:[{name:"show",rawName:"v-show",value:t.hoverIndex===n,expression:"hoverIndex === index"}],style:{left:t.leftVal},attrs:{arr:e[t.childrenName],labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)}),0)}),h=[],m=a("2b0e"),d=new m["default"],v={name:"tSelect",props:["arr","labelName","valueName","childrenName"],data:function(){return{hoverIndex:-1,leftVal:""}},mounted:function(){var t=this;this.$nextTick(function(){t.leftVal=t.$refs.tSelect.clientWidth+5+"px"})},methods:{sentVal:function(t,e){t&&d.$emit("tsObj",{val:t,name:e})}}},p=v,b=(a("166d"),a("2877")),x=Object(b["a"])(p,f,h,!1,null,"037c558a",null),w=x.exports,y={name:"mixSelect",components:{tSelect:w},props:["selectList","labelName","valueName","childrenName"],data:function(){return{showflag:!1,labelText:"请选择",list:[]}},computed:{},mounted:function(){this.selectList&&(this.list=this.selectList);var t=this;d.$on("tsObj",function(e){t.labelText=e.name,t.$emit("sentTo",e.val),t.showflag=!1})},methods:{handleClose:function(){this.showflag=!1}}},g=y,S=(a("bdb1"),Object(b["a"])(g,r,u,!1,null,"c0ea7052",null)),_=S.exports,N=[{name:"全部",val:"0"},{name:"工程管理类",children:[{name:"全部工程管理类",val:"10"},{name:"污水处理及配套设施",val:"11",children:[{name:"1类项目",val:"962"},{name:"2类项目",val:"4186"}]},{name:"饮用水源地污染防治项目",val:"12",children:[{name:"地表水治理",val:"830"},{name:"山泉水饮用",val:"213",children:[{name:"开发",val:"213-1"},{name:"环境维护",val:"213-2"}]}]},{name:"区域水环境综合整治",val:"13"}]},{name:"管理类项目",children:[{name:"全部管理类",val:"20"},{name:"土地管理",val:"21",children:[{name:"土地面测绘",val:"21-1"},{name:"土地资源整合",val:"21-2"}]},{name:"环境管理",val:"22"},{name:"电力管理",val:"23"}]}],C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"randomBall"}},[a("i",{staticClass:"iconfont iconjiang"}),a("ul",{staticClass:"bolist"},t._l(t.ball,function(e,n){return a("li",{class:e,style:{marginLeft:t.leftpx(n)}})}),0)])},I=[],k={name:"randomBall",data:function(){return{ball:["white","copper","white","gold","white","white","silver","white","white","copper","white","gold","white","white","silver","white"],xleft:0,setBall:"",stopFlag:!0,fn1:null,fn2:null}},mounted:function(){},methods:{leftpx:function(t){if(0===t)return this.xleft+"px"},startit:function(){var t=this;if(this.fn1);else{for(var e=[],a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}this.ball=this.ball.concat(e),this.fn2=setInterval(function(){t.xleft-=2},5),this.fn1=setInterval(function(){e=[];for(var a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}t.ball=t.ball.concat(e)},1e3)}},stopit:function(){var t=this;if(this.stopFlag){this.stopFlag=!1;var e=this.xleft,a=-this.xleft/70+15;if(a=c()(a),this.setBall&&(this.ball[a]=this.setBall),this.fn1)var n=5,i=0,l=setInterval(function(){n<20&&(i<4?i++:n+=1,clearInterval(t.fn2),t.fn2=setInterval(function(){t.xleft-=2;var a=e-910,n=e-840;t.xleft>=a&&t.xleft<=n&&t.xleft%70===0&&(clearInterval(t.fn2),clearInterval(l),clearInterval(t.fn1),t.fn1=null,t.stopFlag=!0)},n))},200)}}}},B=k,L=(a("0d9e"),Object(b["a"])(B,C,I,!1,null,"52e2fddf",null)),$=L.exports,M={name:"myBtn",props:{type:{type:String,default:"normal"},text:{type:String,default:"按钮"},handleClick:{type:Function,default:function(){}}},render:function(t){return t("div",{class:{mybtn:!0,confirm:"confirm"===this.type,cancel:"cancel"===this.type,normal:"normal"===this.type},domProps:{innerText:this.text},on:{click:this.handleClick}})},methods:{}},T=M,j=(a("8a7e"),Object(b["a"])(T,n,i,!1,null,"4ae2643d",null)),V=j.exports,O={name:"paperDetail",components:{randomBall:$,mixSelect:_,myBtn:V},data:function(){return{testJson:N,squareHeight:document.body.clientHeight-100+"px",actIndex:3,text:"xxxxx",snowList:[],fn1:null,fn2:null,iii:0,tiemr:0}},mounted:function(){},watch:{snowList:function(){var t=this;this.iii>99&&(clearInterval(this.fn2),clearInterval(this.fn1),setTimeout(function(){t.iii=0,t.snowList=[],t.snowy()},3e3))}},methods:{goit:function(){this.$refs.random.startit()},backit:function(){this.$refs.random.stopit()},getVal:function(t){console.log(t)},set:function(t,e){this.$refs.random.setBall=t,this.actIndex=e},cancelSnow:function(){clearInterval(this.fn2),clearInterval(this.fn1)},snowy:function(){var t=this;this.fn2=setInterval(function(){clearInterval(t.fn1),t.tiemr=300*Math.random()+200,t.fn1=setInterval(function(){var e=c()(500*Math.random());t.snowList.push({left:e,top:-40,fontSize:36,rotate:0,opacity:1,transition:3+2*Math.random()}),setTimeout(function(){var e=document.body.clientHeight+c()(500*Math.random()),a=Math.random()>.5?-1:1,n=Math.random()>.5?-1:1;t.$set(t.snowList,t.iii,{left:t.snowList[t.iii].left+n*(200*Math.random()+100),top:e,fontSize:10+6*Math.random(),rotate:a*(720*Math.random()+720),opacity:.3}),t.iii++},50)},t.tiemr)},1e3)},styleful:function(t){var e="left:".concat(t.left,"px;top:").concat(t.top,"px;opacity:").concat(t.opacity,";font-size:").concat(t.fontSize,"px;transform: rotate(").concat(t.rotate,"deg); transition:all ").concat(t.transition,"s linear;");return e}}},q=O,F=(a("7b83"),Object(b["a"])(q,l,s,!1,null,"2237d4f8",null));e["default"]=F.exports},e935:function(t,e,a){}}]);
//# sourceMappingURL=chunk-43f81abb.edb6b8b4.js.map