interface tabItem{
    routeName: '',
    showName:'',
    query?:'',
}

export interface routeState {
    readonly routeModuleList: Array<string>;        //模块列表
    routeModule:string,                             //当前所处模块
    tabList: Array<tabItem>,                            //路由标签列表
    activeTabName:string,                               //当前路由标签的名字
    partB: Array<any>,
    Asize:number,
    toRouteName:string,                              //关闭标签后，跳转入的路由

}
