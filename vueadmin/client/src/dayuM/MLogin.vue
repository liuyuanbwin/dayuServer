<template>
<div class="container">
    <div class="logoDiv">
        <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138082772&di=bd3ac605480b74ad0139c26ac8f235eb&imgtype=0&src=http%3A%2F%2Fyzhtml01.book118.com%2F2016%2F11%2F23%2F10%2F44470958%2F14.files%2Ffile0003.jpg"
            alt=""
            class="logo">
    </div>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-button type="primary" size="large" @click.native="login()" class="loginBtn">登录</mt-button>
</div>
</template>

<script>
    import {Toast, Field, Button} from 'mint-ui'
    export default {
        name: 'Mlogin',
        data() {
            return {email: '', password: ''}
        },
        methods: {
            login(){
                this
                .$axios
                .post('/api/login',{
                    email:this.email,
                    password:this.password
                    })
                .then(res=>{
                    localStorage.setItem('token', res.data.tk)
                    localStorage.setItem('user', res.data.user)
                    localStorage.setItem('identity', res.data.identity)
                    this.$router.push('/m_toolbox')
                })
        }
    }
    }
</script>

<style scoped="scoped">
    .container {
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
    }
    .logoDiv {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;

    }
    .logo {
        margin: auto;
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
    .loginBtn {
        margin-top: 80px;
    }
</style>>