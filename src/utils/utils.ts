import ECharts from '@/components/ECharts.vue';
import {Message} from "element-ui";
import mixSelect from '@/components/mixSelect/mixSelect.vue';

//通用方法集合
const utils: any = {
    //时间戳转换成自定义字符串
    dateFormat: (timeStamp: number, type?: string): any => {
        //type='date',转换为日期，type='time',转换为日期+时间
        if (timeStamp) {
            let date = new Date();
            date.setTime(timeStamp);
            let y = date.getFullYear();
            let m: any = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d: any = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            if (type === `date` || type === undefined) {
                return y + '-' + m + '-' + d;
            } else if (type === `time`) {
                let h: any = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute: any = date.getMinutes();
                let second: any = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            } else {
                return '-'
            }
        } else {
            return '-'
        }
    },
    //字符串转换时间戳成
    dateToTimestamp: (date: string): any => {
        if (date) {
            if (date.length > 0) {
                let str: string = date.substring(0, 19);
                str.replace(/-/g, '/');
                str.replace(/./g, '/');
                return new Date(str).getTime();
            }
        } else {
            return null
        }
    },
    //文件大小转换   B=> GB/MB
    changeSize: (fileSize: any): any => {
        let size: number = parseInt(fileSize);
        if (size) {
            return size > 1024
                ? size / 1024 > 1024
                    ? size / (1024 * 1024) > 1024
                        ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
                        : (size / (1024 * 1024)).toFixed(2) + 'MB'
                    : (size / 1024).toFixed(2) + 'KB'
                : (size).toFixed(2) + 'B'
        }
    },
    //获取上传图片的缓存路径
    getBlobUrl: (file: any): any => {
        //用法：getBlobUrl(e.target.files[0])
        let url = null;
        if (window.URL) {
            url = window.URL.createObjectURL(file);
        }
        return url
    },
    //深拷贝
    deepCopy: (obj: any): any => {
        return JSON.parse(JSON.stringify(obj));
    },
    //必填项不为空的验证
    isntNull: (data: any, name: any) => {
        /*
        * data 为数据源
        * name 为数据源对应每一项的名称，例如：
        * {
        *       "presonBasicInfo.name": `姓名`,
        *       "address": `地址`,
        * }
        * */
        if (Array.isArray(data)) {
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (!content(data[i], name[i])) {
                    break;
                }
            }
            return flag
        } else if (typeof data === 'object') {
            let flag = true;
            for (let key in name) {

                if (eval(`data.${key}`) !== undefined) {
                    if (!content(eval(`data.${key}`), name[key])) {
                        flag = false;
                        break;
                    }
                }
            }
            /* for (let key in data) {
                 if (name[key]) {
                     if (!content(data[key], name[key])) {
                         flag = false;
                         break;
                     }
                 }
             }*/
            return flag
        } else if (typeof data === 'string') {
            return content(data, name);
        }

        function content(obj:any, objName:string) {
            if (obj === '' || obj === null || obj === undefined) {
                Message({
                    showClose: true,
                    message: `${objName}不能为空！`,
                    type: 'warning'
                })
                return false
            } else {
                return true
            }
        }
    },

    //手机号码验证（2019）
    phoneLimit(phone: string) {
        let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
        return reg.test(phone);
    },
    //身份证校验（15/18位）
    idCardLimit(id: string) {
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
        return reg.test(id);
    },


    //颜色混合
    colourBlend (c1:string, c2:string, ratio:number) {
        ratio = Math.max(Math.min(Number(ratio), 1), 0)
        let r1:any = parseInt(c1.substring(1, 3), 16)
        let g1:any = parseInt(c1.substring(3, 5), 16)
        let b1:any = parseInt(c1.substring(5, 7), 16)
        let r2:any = parseInt(c2.substring(1, 3), 16)
        let g2:any = parseInt(c2.substring(3, 5), 16)
        let b2:any = parseInt(c2.substring(5, 7), 16)
        let r:any = Math.round(r1 * (1 - ratio) + r2 * ratio)
        let g:any = Math.round(g1 * (1 - ratio) + g2 * ratio)
        let b:any = Math.round(b1 * (1 - ratio) + b2 * ratio)
        r = ('0' + (r || 0).toString(16)).slice(-2)
        g = ('0' + (g || 0).toString(16)).slice(-2)
        b = ('0' + (b || 0).toString(16)).slice(-2)
        return '#' + r + g + b
    }
}



export default {
    install: (Vue: any, options: any) => {

        //echarts的vue组件
        Vue.component('v-chart', ECharts);
        Vue.component('mixSelect', mixSelect);

        //将方法集添加到Vue实例上面去
        Vue.prototype.$utils = utils;

        //返回分项目地址
        Vue.prototype.$getUrlConfig = function () {
            return (<any>window).urlConfig;
        }
        //点击该元素以外的部分触发的事件
        Vue.directive('clickoutside', {
            bind: function (el: { contains: (arg0: any) => void; _vueClickOutside_: (e: any) => false | undefined; }, binding: { expression: any; value: (arg0: any) => void; }) {
                function documentHandler(e: { target: any; }) {
                    // @ts-ignore
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e)
                    }
                }
                // @ts-ignore
                el._vueClickOutside_ = documentHandler;
                document.addEventListener('click', documentHandler);
            },
            unbind: function (el: { _vueClickOutside_: (this: Document, ev: MouseEvent) => any; }) {
                document.removeEventListener('click', el._vueClickOutside_);
                delete el._vueClickOutside_;
            }
        });
    }
}
