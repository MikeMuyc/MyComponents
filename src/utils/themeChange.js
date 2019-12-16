import colorful from '@/utils/color'
import objectAssign from 'object-assign'


/**替换element-ui主体色**/
let colors = {
    primary: '#354ef2'
};
let originalStyle = '';
let primaryColor = '#354ef2';


function writeNewStyle () {
    let cssText = originalStyle
    Object.keys(colors).forEach(key => {
        cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
    })


    let styleTag = document.getElementById(`element-ui-chalk`);
    if (!styleTag) {
        const style = document.createElement('style')
        style.setAttribute('id', `element-ui-chalk`)
        style.innerText = cssText
        document.head.appendChild(style)
    }
    else {
        styleTag.innerText = cssText
    }
}
function getIndexStyle () {
    //如果可连接外网，则使用以下代码
    //let {data} = await this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css');
    //this.originalStyle = this.getStyleTemplate(data);

    //colorful.originalStyle 存放的是element-ui的style字符串，适用于内网环境
    originalStyle = colorful.originalStyle;
}
export function themeFunction (newColor) {
    //primaryColor = colors.primary
    colors.primary = newColor;
    colors = objectAssign({}, colors, colorful.generateColors(colors.primary));
    getIndexStyle();
    writeNewStyle()
}




function getStyleTemplate (data) {
    const colorMap = {
        '#3a8ee6': 'shade-1',
        '#409eff': 'primary',
        '#53a8ff': 'light-1',
        '#66b1ff': 'light-2',
        '#79bbff': 'light-3',
        '#8cc5ff': 'light-4',
        '#a0cfff': 'light-5',
        '#b3d8ff': 'light-6',
        '#c6e2ff': 'light-7',
        '#d9ecff': 'light-8',
        '#ecf5ff': 'light-9'
    }
    Object.keys(colorMap).forEach(key => {
        const value = colorMap[key]
        data = data.replace(new RegExp(key, 'ig'), value)
    })
    return data
}

function getFile (url, isBlob = false) {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest()
        client.responseType = isBlob ? 'blob' : ''
        client.onreadystatechange = () => {
            if (client.readyState !== 4) {
                return
            }
            if (client.status === 200) {
                const urlArr = client.responseURL.split('/')
                resolve({
                    data: client.response,
                    url: urlArr[urlArr.length - 1]
                })
            } else {
                reject(new Error(client.statusText))
            }
        }
        client.open('GET', url)
        client.send()
    })
}

export default {
    themeFunction
}
