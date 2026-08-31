import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import routes from './router/routes.js'

export const createApp = ViteSSG(
    App,
    {
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) return savedPosition;
            if (to.hash) return {el: to.hash, behavior: 'smooth'};
            return {top: 0};
        },
    },
)
