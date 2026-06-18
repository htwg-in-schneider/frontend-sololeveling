import { createRouter, createWebHistory } from 'vue-router'

import TaskCatalog from '../views/TaskCatalog.vue'
import TaskList from '../views/TaskList.vue'
import CreateTask from '../views/CreateTask.vue'
import TaskDetail from '../views/TaskDetail.vue'
import EditTask from '../views/EditTask.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TaskCatalog
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskList
  },
  {
    path: '/task/create',
    name: 'create-task',
    component: CreateTask
  },
  {
    path: '/task/:id',
    name: 'task-detail',
    component: TaskDetail
  },
  {
  path: '/task/edit/:id',
  name: 'edit-task',
  component: EditTask
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router