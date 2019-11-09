import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:"/m_index",
      name:"Mindex",
      meta:{title:"手机端"},
      component:() => import("./dayuM/MLogin")
    },
    {
      path:"/m_toolbox",
      name:"Mtoolbox",
      meta:{title:"手机工具箱"},
      component:() => import("./dayuM/MIndex")
    },
    {
      path:"/m_billdetail",
      name:"Mbilldetail",
      meta:{title:"客户详情"},
      component:() => import("./dayuM/MBillDetail")
    },
    {
    path: "/",
    name: "index",
    meta: { title: "首页" },
    //redirect: "/index",
  },
    {
      path: "/index",
      name: "Index",
      component: () => import("./views/Index.vue"),
      meta: { title: "首页" },
      //redirect: "/index/home",
      children: [
        {
          path: "/home",
          name: "home",

          component: () => import("./views/Home/Home"),
          meta: { title: "首页",auth:true }
        },
        {
          path: "/staff",
          name: "staff",
          component: () => import("./dayu/modules/users/Users"),
          meta: { title: "用户管理",auth:true }
        },
        {
          path: "/listuser",
          name: "listuser",
          component: () => import("./dayu/modules/bills/Bills"),
          meta: { title: "信息列表" }
        },
        {
          path:"/clients",
          name:"clients",
          component: () => import("./dayu/modules/clients/Clients"),
          meta:{title:"客户管理"}
        },
        {
          path:"/keywords",
          name:"keywords",
          component: () => import("./dayu/modules/keyword/Keywords"),
          meta:{title:"关键字管理"}
        },
        {
          path: "/menu",
          name: "menu",
          component: () => import("./dayu/modules/menu/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path:"/tools",
          name:"tools",
          component: () => import("./dayu/modules/tools/Tools"),
          meta:{title:"工具箱"}
        }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register/Register")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./dayu/modules/others/Login")
    },
    {
      path: "/lock",
      name: "lock",
      component: () => import("./views/Lock.vue")
    },
    {
      path: "*",
      name: "Nofind",
      component: () => import("./views/404.vue")
    }
  ],
  //mode: "history"
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(localStorage.getItem('token')){
      next()
    }else{
      next({path:'/'})
    }
  }else{
    next()
  }
  
  const isLogin = localStorage.getItem('token') ? true : false

  console.log(`路由守卫 ---》  ${isLogin} --- ${to.path} --- ${localStorage.getItem('token')}`)

  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
  
});

export default router