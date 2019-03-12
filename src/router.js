import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/login',
        },
        {
            name: '登录',
            path: '/login',
            component: () =>
                import ('pages/login.vue'),
        },

        {
            name: '',
            path: '/main',
            component: () =>
                import ('pages/main.vue'),
            children: [
                {
                    path: '',
                    redirect: 'communication',
                },


                {
                    path: 'trainingManagement',
                    name: '培训管理',
                    redirect: 'trainingManagement/trainingControl',
                    component: () =>
                        import ('pages/trainingManagement/trainingManagementMng.vue'),
                    children: [
                        {
                            path: '',
                            redirect: 'trainingControl',
                        },
                        {
                            path: 'trainingControl',
                            redirect: 'trainingControl/auditManagement',
                            component: () =>
                                import ('pages/trainingManagement/trainingControl.vue'),
                            children: [
                                {
                                    path: '',
                                    redirect: 'auditManagement',
                                },
                                {
                                    path: 'trainingIndex',
                                    name: '培训管理主页',
                                    component: () =>
                                        import ('pages/trainingManagement/auditTest.vue'),
                                },
                                {
                                    path: 'paperManage',
                                    name: '试卷管理',
                                    component: () =>
                                        import ('pages/trainingManagement/paperMng/paperList.vue'),
                                },
                                {
                                    path: 'questionManage',
                                    name: '题库管理',
                                    component: () =>
                                        import ('pages/trainingManagement/questionBank/list'),
                                },
                                {
                                    path: 'addQuestion',
                                    name: '新增试题',
                                    meta:{
                                        pname:`题库管理`,
                                    },
                                    component: () =>
                                        import ('pages/trainingManagement/questionBank/addQuestion.vue'),
                                },
                                {
                                    path: 'createPaper',
                                    name: '创建试卷',
                                    meta:{
                                        pname:`题库管理`,
                                    },
                                    component: () =>
                                        import ('pages/trainingManagement/questionBank/createPaper.vue'),
                                },
                                {
                                    path: 'preview',
                                    name: '预览上传文件',
                                    meta:{
                                        pname:`题库管理`,
                                    },
                                    component: () =>
                                        import ('pages/trainingManagement/questionBank/preview.vue'),
                                },
                                {
                                    path: 'auditManagement',
                                    name: '考核管理',
                                    component: () =>
                                        import ('pages/trainingManagement/auditManagement.vue'),
                                }
                            ]
                        },
                        {
                            path: 'auditTest',
                            name: '考核管理-审核考试',
                            component: () =>
                                import ('pages/trainingManagement/auditTest.vue'),
                        },
                        {
                            path: 'examDetail',
                            name: '考核管理-考试详情',
                            component: () =>
                                import ('pages/trainingManagement/examDetail.vue'),
                        },
                        {
                            path: 'paperDetail',
                            name: '查看试卷详情',
                            component: () =>
                                import ('pages/trainingManagement/paperMng/paperDetail.vue'),
                        }
                    ]

                },


                {
                    path: 'personnelManagement',
                    name: '人员管理',
                    redirect: 'personnelManagement/personnelControl',
                    component: () =>
                        import ('pages/personnelManagement/personnelManagementMng.vue'),
                    children: [
                        {
                            path: 'personnelControl',
                            name: '',
                            redirect: 'personnelControl/personnelList',
                            component: () =>
                                import ('pages/personnelManagement/personnelControl.vue'),
                            children: [
                                {
                                    path: 'personnelList',
                                    name: '人员列表',
                                    component: () =>
                                        import ('pages/personnelManagement/personnelList.vue'),

                                },
                                {
                                    path: 'addPersonnel',
                                    name: '添加人员-手动录入',
                                    component: () =>
                                        import ('pages/personnelManagement/addpersonnel.vue'),

                                },
                            ]
                        },
                        {
                            path: 'personnelHistory',
                            name: '人员变更记录',
                            component: () =>
                                import ('pages/personnelManagement/personnelhistory.vue'),

                        },
                    ]
                },
            ]
        }
    ],
})