<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import jwt_decode from 'jwt-decode'
  export default {
    name:"App",
    created () { //持久化登录
      if(localStorage.eleToken) {
        //获取token解析
        const decode = jwt_decode(localStorage.eleToken);
        //存储vuex中
        this.$store.dispatch('setAuthenticated' , !this.isEmpty(decode))
				this.$store.dispatch('setUSER',decode)
      }
    },
    methods:{
      isEmpty(value) {
        return (
          value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0)
          || (typeof value === 'string' && value.trim().length === 0)
        )
      },
      _isMobile() {
	 let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	 return flag;
}

    },
    mounted() {
    if (this._isMobile()) {
      this.$router.replace('/m_index');
    } else {
      this.$router.replace('/index');
    }
  }

  }
</script>


<style>
html,body,#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
