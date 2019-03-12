import axios from "@axios";
import { Message } from 'element-ui'
const MyPlugin = {};

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



