(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64e0d898"],{"0b12":function(t,e,a){"use strict";var n=a("f2f6"),i=a.n(n);i.a},3882:function(t,e,a){"use strict";var n=a("3aa3"),i=a.n(n);i.a},"3aa3":function(t,e,a){},"58b0":function(t,e,a){"use strict";var n=a("af0d"),i=a.n(n);i.a},5937:function(t,e,a){"use strict";var n=a("fddc"),i=a.n(n);i.a},"6f8f":function(t,e,a){"use strict";var n=a("bc07"),i=a.n(n);i.a},"70c8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"detail"}},[a("div",{staticClass:"square"},[a("mixSelect",{attrs:{selectList:t.testJson,labelName:"name",valueName:"val",childrenName:"children"},on:{sentTo:t.getVal}}),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("可以无限级展开的菜单组件，因为是向右展开，请注意控制组件与浏览器右边界的距离")])],1),a("div",{staticClass:"square"},[a("div",{staticClass:"btnLine"},[a("button",{staticClass:"start",on:{click:t.goit}},[t._v("开始")]),a("button",{staticClass:"stop",staticStyle:{"margin-right":"20px"},on:{click:t.backit}},[t._v("停止")]),a("button",{staticClass:"set",class:{active:1===t.actIndex},on:{click:function(e){return t.setball("white",1)}}},[t._v("必中白球")]),a("button",{staticClass:"set",class:{active:2===t.actIndex},on:{click:function(e){return t.setball("black",2)}}},[t._v("必中黑球")]),a("button",{staticClass:"set",class:{active:3===t.actIndex},on:{click:function(e){return t.setball("",3)}}},[t._v("恢复概率")])]),a("randomBall",{ref:"random"}),a("p",{staticStyle:{position:"absolute",bottom:"30px"}},[t._v("白球46%，铜球24%，银球16%，金球10%，黑球4%")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("随机球组件，概率、中奖项可设置")])],1),a("div",{staticClass:"square"},[a("vue-perfect-scrollbar",{staticStyle:{height:"100%",width:"100%"}},[a("div",{staticStyle:{height:"800px",width:"800px",position:"relative"}},[a("p",[t._v("滚动条组件")]),a("p",[t._v("如果是用在body上作为全局滚动条，可以将isBodyScroll设置为true\n                ")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("这里是底部")]),a("p",{staticStyle:{position:"absolute",right:"10px",top:"0",width:"20px"}},[t._v("这里是右边")])])])],1),a("div",{staticClass:"square"},[a("myBtn",{attrs:{type:"normal",text:"下雪",handleClick:t.snowying}}),a("myBtn",{attrs:{type:"cancel",text:"取消",handleClick:t.cancelSnow}}),a("p",{staticStyle:{position:"absolute",bottom:"30px"}},[t._v("Vue中的render函数，适用于相同组件不同状态的css样式呈现。点击“下雪”，开启动画")]),a("p",{staticStyle:{position:"absolute",bottom:"10px"}},[t._v("Vue中为了支持JSX，需要通过一个JSX的Babel的插件。")]),a("snowy",{ref:"snowy",staticStyle:{width:"100%",height:"100%",position:"absolute",left:"0",top:"0px","z-index":"1"}})],1),a("div",{staticClass:"square",staticStyle:{width:"100%",height:"auto",padding:"20px 0"}})])},i=[],l=a("d225"),s=a("b0b4"),o=a("308d"),c=a("6bb5"),r=a("4e2b"),u=a("9ab4"),f=a("60a3"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mixSelect"},[a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.handleClose,expression:"handleClose"}],staticClass:"singleBOX",class:{active:t.showflag}},[a("span",{staticClass:"valuebox",attrs:{title:t.labelText},on:{click:function(e){t.showflag=!t.showflag}}},[a("em",{class:{active:"请选择"!==t.labelText}},[t._v(t._s(t.labelText))]),a("i",{staticClass:"iconfont icondaosanjiao svgse",class:{active:t.showflag}})]),a("transition",{attrs:{name:"slfade"}},[t.showflag?a("tSelect",{attrs:{arr:t.list,labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)])},v=[],d=(a("7f7f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"tSelect",staticClass:"tSelect"},t._l(t.arr,(function(e,n){return a("div",{staticClass:"tLine"},[a("div",{staticClass:"tLabel",on:{mouseenter:function(e){t.hoverIndex=n},click:function(a){return t.sentVal(e[t.valueName],e[t.labelName])}}},[t._v("\n            "+t._s(e[t.labelName])+"\n        ")]),e[t.childrenName]?a("i",{staticClass:"iconfont iconjiantou"}):t._e(),a("transition",{attrs:{name:"tfade"}},[e[t.childrenName]&&t.hoverIndex===n?a("tSelect",{directives:[{name:"show",rawName:"v-show",value:t.hoverIndex===n,expression:"hoverIndex === index"}],style:{left:t.leftVal},attrs:{arr:e[t.childrenName],labelName:t.labelName,valueName:t.valueName,childrenName:t.childrenName}}):t._e()],1)],1)})),0)}),m=[],p=a("2b0e"),b=new p["default"],x={name:"tSelect",props:["arr","labelName","valueName","childrenName"],data:function(){return{hoverIndex:-1,leftVal:""}},mounted:function(){var t=this;this.$nextTick((function(){t.leftVal=t.$refs.tSelect.clientWidth+5+"px"}))},methods:{sentVal:function(t,e){t&&b.$emit("tsObj",{val:t,name:e})}}},w=x,y=(a("3882"),a("2877")),g=Object(y["a"])(w,d,m,!1,null,"b6fa98f8",null),S=g.exports,_={name:"mixSelect",components:{tSelect:S},props:["selectList","labelName","valueName","childrenName"],data:function(){return{showflag:!1,labelText:"请选择",list:[]}},computed:{},mounted:function(){this.selectList&&(this.list=this.selectList);var t=this;b.$on("tsObj",(function(e){t.labelText=e.name,t.$emit("sentTo",e.val),t.showflag=!1}))},methods:{handleClose:function(){this.showflag=!1}}},N=_,C=(a("5937"),Object(y["a"])(N,h,v,!1,null,"1dbebb9a",null)),k=C.exports,I=[{name:"全部",val:"0"},{name:"工程管理类",children:[{name:"全部工程管理类",val:"10"},{name:"污水处理及配套设施",val:"11",children:[{name:"1类项目",val:"962"},{name:"2类项目",val:"4186"}]},{name:"饮用水源地污染防治项目",val:"12",children:[{name:"地表水治理",val:"830"},{name:"山泉水饮用",val:"213",children:[{name:"开发",val:"213-1"},{name:"环境维护",val:"213-2"}]}]},{name:"区域水环境综合整治",val:"13"}]},{name:"管理类项目",children:[{name:"全部管理类",val:"20"},{name:"土地管理",val:"21",children:[{name:"土地面测绘",val:"21-1"},{name:"土地资源整合",val:"21-2"}]},{name:"环境管理",val:"22"},{name:"电力管理",val:"23"}]}],j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"randomBall"}},[a("i",{staticClass:"iconfont iconjiang"}),a("ul",{staticClass:"bolist"},t._l(t.ball,(function(e,n){return a("li",{class:e,style:{marginLeft:t.leftpx(n)}})})),0)])},B=[],$={name:"randomBall",data:function(){return{ball:["white","copper","white","gold","white","white","silver","white","white","copper","white","gold","white","white","silver","white"],xleft:0,setBall:"",stopFlag:!0,fn1:null,fn2:null}},mounted:function(){},methods:{leftpx:function(t){if(0===t)return this.xleft+"px"},startit:function(){var t=this;if(this.fn1);else{for(var e=[],a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}this.ball=this.ball.concat(e),this.fn2=setInterval((function(){t.xleft-=2}),5),this.fn1=setInterval((function(){e=[];for(var a=0;a<6;a++){var n=Math.random();n>=.96?e.push("black"):n>=.7&&n<.86?e.push("silver"):n>=.46&&n<.7?e.push("copper"):n>=0&&n<.46?e.push("white"):n>=.86&&n<.96&&e.push("gold")}t.ball=t.ball.concat(e)}),1e3)}},stopit:function(){var t=this;if(this.stopFlag){this.stopFlag=!1;var e=this.xleft,a=-this.xleft/70+15;if(a=parseInt(a),this.setBall&&(this.ball[a]=this.setBall),this.fn1)var n=5,i=0,l=setInterval((function(){n<20&&(i<4?i++:n+=1,clearInterval(t.fn2),t.fn2=setInterval((function(){t.xleft-=2;var a=e-910,n=e-840;t.xleft>=a&&t.xleft<=n&&t.xleft%70===0&&(clearInterval(t.fn2),clearInterval(l),clearInterval(t.fn1),t.fn1=null,t.stopFlag=!0)}),n))}),200)}}}},L=$,O=(a("0b12"),Object(y["a"])(L,j,B,!1,null,"b2b5cfc2",null)),M=O.exports,T=a("6f9d"),V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"snowy"}},[a("div",{staticClass:"viewbox"},t._l(t.snowList,(function(e){return a("i",{staticClass:"iconfont iconxuehua ",style:t.styleful(e)})})),0)])},J=[],q={name:"snowy",data:function(){return{snowList:[],fn1:null,fn2:null,iii:0,tiemr:0}},watch:{snowList:function(){var t=this;this.iii>111&&(this.cancelSnow(),setTimeout((function(){t.snowy()}),3e3))}},mounted:function(){},methods:{snowyBeing:function(){var t=this;this.fn2||(this.fn2=setInterval((function(){clearInterval(t.fn1),t.tiemr=300*Math.random()+200,t.fn1=setInterval((function(){var e=parseInt(500*Math.random());t.snowList.push({left:e,top:-40,fontSize:24+12*Math.random(),rotate:0,opacity:1,transition:3+2*Math.random()}),setTimeout((function(){var e=document.body.clientHeight+parseInt(500*Math.random()),a=Math.random()>.5?-1:1,n=Math.random()>.5?-1:1;t.$set(t.snowList,t.iii,{left:t.snowList[t.iii].left+n*(200*Math.random()+100),top:e,fontSize:10+8*Math.random(),rotate:a*(720*Math.random()+720),opacity:.2}),t.iii++}),50)}),t.tiemr)}),1e3))},styleful:function(t){var e="left:".concat(t.left,"px;top:").concat(t.top,"px;opacity:").concat(t.opacity,";font-size:").concat(t.fontSize,"px;transform: rotate(").concat(t.rotate,"deg); transition:all ").concat(t.transition,"s linear;");return e},cancelSnow:function(){var t=this;clearInterval(this.fn2),clearInterval(this.fn1),this.fn2=null,this.fn1=null,setTimeout((function(){t.iii=0,t.snowList=[]}),3e3)}}},z=q,E=(a("58b0"),Object(y["a"])(z,V,J,!1,null,"6ee69ee6",null)),F=E.exports,X=function(t){function e(){var t;return Object(l["a"])(this,e),t=Object(o["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.testJson=I,t.actIndex=3,t.text="xxxxx",t.txt="",t.src="",t}return Object(r["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){}},{key:"goit",value:function(){var t=this.$refs.random;t.startit()}},{key:"backit",value:function(){var t=this.$refs.random;t.stopit()}},{key:"getVal",value:function(t){console.log(t)}},{key:"setball",value:function(t,e){var a=this.$refs.random;a.setBall=t,this.actIndex=e}},{key:"snowying",value:function(){var t=this.$refs.snowy;t.snowyBeing()}},{key:"cancelSnow",value:function(){var t=this.$refs.snowy;t.cancelSnow()}}]),e}(f["b"]);X=Object(u["a"])([Object(f["a"])({components:{randomBall:M,mixSelect:k,myBtn:T["a"],snowy:F}})],X);var H=X,W=H,A=(a("6f8f"),Object(y["a"])(W,n,i,!1,null,"1bd69ee1",null));e["default"]=A.exports},af0d:function(t,e,a){},bc07:function(t,e,a){},f2f6:function(t,e,a){},fddc:function(t,e,a){}}]);
//# sourceMappingURL=chunk-64e0d898.15dd6100.js.map