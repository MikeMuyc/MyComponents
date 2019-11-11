import {routeState} from "./interfaces";

//新增路由标签
export function openTabs(
    state: routeState,
    data: any,
) {
    let bool = false;
    state.tabList.forEach(item=>{
        if(item.routeName === data.routeName){
            bool = true
        }
    })
    if(!bool){
        if(state.Asize > state.tabList.length){
            state.tabList.push(data)
        }
        else{
            let temp = state.tabList.splice(state.tabList.length-1,1);
            state.tabList.push(data);
            state.partB.forEach((item,index)=>{
                if(item.routeName === data.routeName){
                    state.partB.splice(index,1)
                }
            });
            state.partB  = temp.concat(state.partB);

        }
    }
    state.activeTabName = data.routeName;

}
interface btoaInterface {
    routeName:string,
    index:number
}
//打开partB中的路由标签
export function BToA(
    state: routeState,
    obj:btoaInterface
) {
    let tempb = state.partB.splice(obj.index,1);
    let tempa = state.tabList.splice(state.tabList.length-1,1);
    state.tabList = state.tabList.concat(tempb);
    state.partB = tempa.concat(state.partB);
}

//设置路由所属模块
export function setRouteModule(
    state: routeState,
    module: any,
) {
    state.routeModule = module;
}

//关闭路由标签
export function closeTab(
    state: routeState,
    routeName:string,
) {
    if(state.tabList.length>1){
        let windex = 0;
        state.tabList.forEach((item,index)=>{
            if(item.routeName === routeName){
                state.tabList.splice(index,1);
                windex=index;
            }
        })
        if(state.partB.length>0){
            let temp = state.partB.splice(0,1);
            state.tabList = state.tabList.concat(temp);
        }
        if(windex === 0){
            state.toRouteName =  state.tabList[0].routeName
        }
        else{
            state.toRouteName =  state.tabList[windex-1].routeName
        }
    }

}
export function clearAllTabs(
    state: routeState,
) {
    state.tabList = [];
    state.partB = [];
}

//设置路由数组最大长度
export function setTabSize(
    state: routeState,
    size:number
) {
    state.Asize = size;
}
