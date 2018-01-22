import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Add',
      component: Add
    }
  ]
})
