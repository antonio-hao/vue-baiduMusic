import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import HotMusic from '../pages/MusicList/HotMusic'
import NewMusic from '../pages/MusicList/NewMusic'
import KingMusic from '../pages/MusicList/KingMusic'
import SingerInfo from '../pages/Singer/SingerInfo'
import MusicPlay from '../pages/MusicPlay'
import Recommend from '../pages/Recommend/Recommend'
import SearchView from "../pages/search/SearchView"

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  // mode:"history",
  // base: '/musicApp/',
  routes: [
    {
      path: '/',
      name: 'Inex',
      component: Index,
      redirect:"/hot",
      children:[
        {
          path: '/hot',
          name: 'HotMusic',
          component: HotMusic
        },
        {
          path: '/new',
          name: 'NewMusic',
          component: NewMusic
        },
        {
          path: '/king',
          name: 'KingMusic',
          component: KingMusic
        }
      ]
    },
    {
      path:'/singer/:singerid',
      name:'SingerInfo',
      component: SingerInfo
    },
    {
      path:'/play/:songid',
      name:'MusicPlay',
      component:MusicPlay
    },
    {
      path:'/recommend/:musictype',
      name:'Recommend',
      component:Recommend
    },
    {
      path:'/searchview/:searchcontent',
      name:'searchview',
      component:SearchView
    }
  ]
})
