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
            redirect: 'main/content',
            component: () =>
                import ('@/views/main.vue'),
            children: [
                {
                    path: 'content',
                    name: '组件',
                    redirect: 'content/detail',
                    component: () =>
                        import ('@/views/content/contentMng.vue'),
                    children: [
                        {
                            path: 'detail',
                            name: '组件详情',
                            component: () =>
                                import ('@/views/content/detail.vue'),
                        }
                    ]
                },
                {
                    path: 'cropper',
                    name: '裁剪组件',
                    component: () =>
                        import ('@/views/content/cropperCtrl.vue'),

                },
            ]
        }
    ],
})
