import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Peformance from './components/Peformance.vue'
import HistoricalData from './component/HistoricalData.vue'
import Dashboard from './component/Dashboard.vue'
import Admin from './component/Admin.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [

    {
        name: 'Home',
        component: Home,
        path: '/'
    },

    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },

    {
        name: 'Dashboard',
        component: Dashboard,
        path: '/dashboard'
    },

    {
        name: 'Admin',
        component: Admin,
        path: '/admin'
    },

    {
        name: 'Performance',
        component: Performance,
        path: '/performance'
    },


    {
        name: 'HistoricalData',
        component: HistoricalData,
        path: '/historical-data'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router











