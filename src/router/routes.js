const routes = [
    { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
    { path: '/projects/:slug', name: 'project-detail', component: () => import('../pages/ProjectDetail.vue') },
];

export default routes;
