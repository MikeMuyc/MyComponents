import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui';
import qs from 'qs'


const timeout = 5000;
Vue.prototype.$http = axios;

let pending:Array<any>  = [];   //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let restUrl:string = ``;               //存放需要做重复请求拦截的接口
let cancelToken = axios.CancelToken;
let removePending = (ever:any) => {
    for(let p in pending){
        if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            // @ts-ignore
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}


//添加请求拦截器
axios.interceptors.request.use(config=>{
    // @ts-ignore
    if(restUrl.indexOf(config.url) > -1){
        removePending(config); //在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken((c)=>{
            // 这里的ajax标识，是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({ u: config.url + '&' + config.method, f: c });
        });
    }

    return config;
},error => {
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(response => {
    removePending(response.config)
    return response;
}, error => {
    if (error.response) {
        if(error.response.status === 401){
           /* Message({
                showClose: true,
                message: `无访问权限！`,
                type: 'error'
            })*/
           /* router.push({
                path: '/main',
            });*/
        }
    }
    return Promise.reject(error.response)
});



export default class myaxios{
    baseURL:string = `./api`;
    proUrl:string = ``;
    constructor(url?: string,pUrl?: string) { //constructor是一个构造方法，用来接收参数
        if (url) {
            this.baseURL = url;
        }
        if (pUrl) {
            this.proUrl = pUrl;
        }
    }
    post(url:string, data?:any) {
        if (process.env.NODE_ENV === 'development') {
            //开发环境 do something
            axios.defaults.baseURL = this.baseURL;
        }else{
            axios.defaults.baseURL = this.proUrl;
        }
        return axios({
            method: 'post',
            url: url,
            data: data,
            timeout: timeout,
            withCredentials: true,
            headers: {

            }
        })
    }

    get(url:string, params?:any) {
        if (process.env.NODE_ENV === 'development') {
            //开发环境 do something
            axios.defaults.baseURL = this.baseURL;
        }else{
            axios.defaults.baseURL = this.proUrl;
        }
        return axios({
            method: 'get',
            url: url,
            params: params,
            timeout: timeout,
            withCredentials: true,
            headers: {

            }
        })
    }
    delete(url:string, data?:any) {
        if (process.env.NODE_ENV === 'development') {
            //开发环境 do something
            axios.defaults.baseURL = this.baseURL;
        }else{
            axios.defaults.baseURL = this.proUrl;
        }
        return axios({
            method: 'delete',
            url: url,
            data: data,
            timeout: timeout,
            withCredentials: true,
            headers: {

            }
        })
    }
    put(url:string, data?:any){
        if (process.env.NODE_ENV === 'development') {
            //开发环境 do something
            axios.defaults.baseURL = this.baseURL;
        }else{
            axios.defaults.baseURL = this.proUrl;
        }
        return axios({
            method: 'put',
            url: url,
            data: data,
            timeout: timeout,
            withCredentials: true,
            headers: {

            }
        })
    }
}
