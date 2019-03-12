import axios from "@axios";
import { Message } from 'element-ui'
const MyPlugin = {};

const authoxCheck = async function(op) {
    let pro = new Promise((resolve, reject) => {
        let params = {};
        params['resource'] = `authox`;
        params['op'] = op;
        axios.get("/rest/authox/check", params).then(res => {
            if (res.data.allowed) {
                resolve();
            } else {
                reject();
            }
        }).catch(err => {
            // 暂时不考虑网络问题，如果因为网络丢包显示不正常，应当刷新页面
            reject();
        });
    });
    return pro
};

MyPlugin.install = function (Vue) {
    //时间戳转换成 年-月-日
    Vue.prototype.changeDate = function (timeStamp) {
        if(timeStamp){
            let date = new Date();
            date.setTime(timeStamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        }
        else{
            return '-'
        }
    }
    //时间戳转换成 年-月-日 时：分：秒
    Vue.prototype.changeTime = function (timeStamp){
        if(timeStamp){
            let date = new Date();
            date.setTime(timeStamp);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            let second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        }
        else{
            return '-'
        }
    }
    //限制输入值为浮点数
    Vue.prototype.floatful = function (num,name){
        if(parseFloat(num)>=0){
            this[name] = parseFloat(num);
        }
        else if(num == ''){

        }
        else{
            this[name] = '';
            this.$message({
                showClose: true,
                message: '请重新填写！',
                type: 'error'
            });
        }
    }
    //限制输入值为整数
    Vue.prototype.intful = function (num,name){
        if(parseInt(num)>=0){
            this[name] = parseInt(num);
        }
        else if(num == ''){

        }
        else{
            this[name] = '';
            this.$message({
                showClose: true,
                message: '请重新填写！',
                type: 'error'
            });
        }
    }
    //日期字符串转换时间戳
    /**
     * @return {number}
     */
    Vue.prototype.StrchangeTime = function (str) {
        if(str.length>0){
            let date = str.substring(0,19);
            date = date.replace(/-/g,'/');
            return new Date(date).getTime();
        }
    }
    //填空题-题目转换
    Vue.prototype.completionStringfor = function (str) {
        return str.replace(/##/g,`_____`);
    }
    //填空题-答案转换
    Vue.prototype.completionanswerful = function (str) {
        let newstr = '';
        if(str){
            let arr = str.split(`!#!`);

            for(let i=0;i<arr.length;i++){
                newstr += `第${i+1}项：${arr[i]}。`
            }
        }
        return newstr;
    }

    Vue.directive('authox', {
        bind: (el, binding, vnode, oldVnode) => {
            let className = el.getAttribute("class");
            if(className){
                el.setAttribute("class", className + ` authoxHidden`);
            }
            else{
                el.setAttribute("class", `authoxHidden`);
            }
            authoxCheck(binding.value).then(() => {
                className = className.replace("hidden", "");
                el.setAttribute("class", className);
            }).catch(() => {});
        }
    })

    Vue.directive('clickoutside', {
        bind:function(el,binding,vnode){
            function documentHandler(e){
                if(el.contains(e.target)){
                    return false;
                }
                if(binding.expression){
                    binding.value(e)
                }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click',documentHandler);
        },
        unbind:function(el,binding){
            document.removeEventListener('click',el._vueClickOutside_);
            delete el._vueClickOutside_;
        }
    })

}

export default MyPlugin
export function httpTips(type, code, dataLength) {
    if (type === 'post') {
        if (code === 200) {
            Message({
                showClose: true,
                message: `提交成功！`,
                type: 'success'
            })
        } else {
            Message({
                showClose: true,
                message: `提交失败！`,
                type: 'error'
            })
        }
    } else {
        if (code !== 200) {
            Message({
                showClose: true,
                message: `获取数据失败！`,
                type: 'error'
            })
        } else if(!dataLength) {
            Message({
                showClose: true,
                message: `查无数据`,
                type: 'error'
            })
        }
    }

}


