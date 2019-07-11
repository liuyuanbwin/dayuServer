export default {
    isAuthenticated: false,  //授权
    //user: {},  //用户登录
    user:localStorage.getItem('user') || '',
    token:localStorage.getItem('token')||null
};