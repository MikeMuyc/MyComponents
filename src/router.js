import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/main',
        },

        {
            name: '',
            path: '/main',
            redirect: 'main/trainingManagement',
            component: () =>
                import ('pages/main.vue'),
            children: [
                {
                    path: 'trainingManagement',
                    name: '培训管理',
                    redirect: 'trainingManagement/paperDetail',
                    component: () =>
                        import ('pages/trainingManagement/trainingManagementMng.vue'),
                    children: [
                        {
                            path: 'paperDetail',
                            name: '查看试卷详情',
                            component: () =>
                                import ('pages/trainingManagement/paperMng/paperDetail.vue'),
                        }
                    ]
                },
            ]
        }
    ],
})