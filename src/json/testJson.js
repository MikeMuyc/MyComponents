export default [
    {
        name: "全部",
        val: `0`,
    },
    {
        name: "工程管理类",
        children: [
            {
                name: "全部工程管理类",
                val: `10`,

            },
            {
                name: "污水处理及配套设施",
                val: `11`,
                children:[
                    {
                        name: "1类项目",
                        val: `962`,
                    },
                    {
                        name: "2类项目",
                        val: `4186`,
                    }
                ]
            },

            {
                name: "饮用水源地污染防治项目",
                val: `12`,
                children:[
                    {
                        name: "地表水治理",
                        val: `830`,
                    },
                    {
                        name: "山泉水饮用",
                        val: `213`,
                        children:[
                            {
                                name: "开发",
                                val: `213-1`,
                            },
                            {
                                name: "环境维护",
                                val: `213-2`,
                            },
                        ]
                    }
                ]
            },
            {
                name: "区域水环境综合整治",
                val: `13`,
            }
        ]

    },
    {
        name: "管理类项目",
        children: [
            {
                name: "全部管理类",
                val: `20`,
            },
            {
                name: "土地管理",
                val: `21`,
                children:[
                    {
                        name: "土地面测绘",
                        val: `21-1`,
                    },
                    {
                        name: "土地资源整合",
                        val: `21-2`,
                    }
                ]
            },
            {
                name: "环境管理",
                val: `22`,
            },
            {
                name: "电力管理",
                val: `23`,
            },
        ]

    }
]
