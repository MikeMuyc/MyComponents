//黑色蒙层
const loaderOption = {
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
}
//白色蒙层
const loaderOption_w = {
    lock: true,
    target:'#viewbox',
    text: '加载中',
    spinner: 'el-icon-loading',
    //background: 'rgba(0, 0, 0, 0.7)'
}

export default
{
    loaderOption,
    loaderOption_w
}

