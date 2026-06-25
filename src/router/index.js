import { createRouter, createWebHashHistory } from 'vue-router'
import TaskCatalog from '../views/TaskCatalog.vue'
import TaskList from '../views/TaskList.vue'
import CreateTask from '../views/CreateTask.vue'
import TaskDetail from '../views/TaskDetail.vue'
import EditTask from '../views/EditTask.vue'
import ImpressumView from '../views/ImpressumView.vue'
import KontaktView from '../views/KontaktView.vue'
import DatenschutzView from '../views/DatenschutzView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import FriendsView from '../views/FriendsView.vue'
import LevelView from '../views/LevelView.vue'
import SettingsView from '../views/SettingsView.vue'
import FriendTasksView from '../views/FriendTasksView.vue'
import AdminView from '../views/AdminView.vue'

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
 },
 {
  path: '/impressum',
  name: 'impressum',
  component: ImpressumView
},
{
  path: '/kontakt',
  name: 'kontakt',
  component: KontaktView
},
{
  path: '/datenschutz',
  name: 'datenschutz',
  component: DatenschutzView
}, 
{
  path: '/login',
  name: 'login',
  component: LoginView
},
{
  path: '/register',
  name: 'register',
  component: RegisterView
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: DashboardView
},
{
  path: '/friends',
  name: 'friends',
  component: FriendsView
},
{
  path: '/level',
  name: 'level',
  component: LevelView
},
{
  path: '/settings',
  name: 'settings',
  component: SettingsView
},
{
  path: '/friends/:name/tasks',
  name: 'friend-tasks',
  component: FriendTasksView
},
{
  path: '/admin',
  name: 'admin',
  component: AdminView,
  meta: { requiresAuth: true, requiresAdmin: true }
}

]

const router = createRouter({
history: createWebHashHistory(),
  routes,

scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }

  if (to.meta.requiresAdmin && role !== 'admin') {
    return '/dashboard'
  }
})

export default router