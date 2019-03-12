import axios from 'axios'
import config from './config'
import router from '../router'
// import qs from 'qs'

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        let path = '';
        if( router.history.current.fullPath !== `/login`){
            path = router.history.current.fullPath;
        }
        switch (error.response.status) {
            case 401:
                router.push({
                    path: '/login',
                    query:{
                        redirect:path,
                    }
                });
                break;
            case 403:
                router.push({
                    path: '/login',
                    query:{
                        redirect:path,
                    }
                });
                break;
        }

    }
    return Promise.reject(error.response)
});



export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: url,
            //data: qs.stringify(data),
            data: data,
            timeout: config.timeout,
            withCredentials: true,
            headers: {

            }
        })
    },

    get(url, params) {
        return axios({
            method: 'get',
            url: url,
            params: params,
            timeout: config.timeout,
            withCredentials: true,
            headers: {

            }
        })
    },

}
