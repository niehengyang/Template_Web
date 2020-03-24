/**
 *
 * 定制Axios
 * 统一的错误错误
 * 相应数据格式统一处理
 * 统一的token头添加
 *
 */
import TokenFactory from './tokenfactory';

//错误时的提示信息
const errorTip = msg => {
    Vue.prototype.$message.error(msg);
}

//跳转到登录页
const toLogin=()=>{
    window.location.href = '/login/'
}

//请求失败的错误统一处理
const errorHandler=(status,msg)=>{
    switch (status){
        case 401:
            //token校验失败后 ，清除token
            Vue.prototype.$message({
                type : "error",
                message : '登录超时，请重新登录。3秒后将跳回登录页',
                onClose:() => {
                    TokenFactory.clearToken();
                    toLogin();
                }
            });
            break;
        default:
            errorTip(msg);
    }
}

//----

//设置实例的请求头
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['authorization'] = TokenFactory.getToken();

//响应拦截器
axios.interceptors.response.use(res =>{
    //请求成功时
    return res.data;
},error => {
    //请求失败时
    if (error.response){
        console.log(error.response)
        errorHandler(error.response.status,error.response.data.message);
    }
    return Promise.reject(error);
});
