<template>
    <div style="display: flex">
        <el-color-picker style="margin-right: 40px" v-model="colors.primary"></el-color-picker>

        <el-button type="primary" size="mini" @click="submitForm">确定</el-button>
    </div>
</template>
<script>
    import colorful from '@/utils/color'
    import objectAssign from 'object-assign'

    export default {
        name: 'app',
        data() {
            return {
                colors: {
                    primary: '#409eff'
                },
                originalStyle: '',
                primaryColor: '#409eff',
            }
        },
        methods: {
            writeNewStyle() {
                let cssText = this.originalStyle
                Object.keys(this.colors).forEach(key => {
                    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
                })


                let styleTag = document.getElementById(`element-ui-chalk`);
                if (!styleTag) {
                    const style = document.createElement('style')
                    style.setAttribute('id', `element-ui-chalk`)
                    style.innerText = cssText
                    document.head.appendChild(style)
                } else {
                    styleTag.innerText = cssText
                }
            },

            submitForm() {
                this.primaryColor = this.colors.primary
                this.colors = objectAssign({}, this.colors, colorful.generateColors(this.colors.primary));
                this.getIndexStyle();
                this.writeNewStyle()
            },

            getStyleTemplate(data) {
                const colorMap = {
                    '#3a8ee6': 'shade-1',
                    '#409eff': 'primary',
                    '#53a8ff': 'light-1',
                    '#66b1ff': 'light-2',
                    '#79bbff': 'light-3',
                    '#8cc5ff': 'light-4',
                    '#a0cfff': 'light-5',
                    '#b3d8ff': 'light-6',
                    '#c6e2ff': 'light-7',
                    '#d9ecff': 'light-8',
                    '#ecf5ff': 'light-9'
                }
                Object.keys(colorMap).forEach(key => {
                    const value = colorMap[key]
                    data = data.replace(new RegExp(key, 'ig'), value)
                })
                return data
            },

            getFile(url, isBlob = false) {
                return new Promise((resolve, reject) => {
                    const client = new XMLHttpRequest()
                    client.responseType = isBlob ? 'blob' : ''
                    client.onreadystatechange = () => {
                        if (client.readyState !== 4) {
                            return
                        }
                        if (client.status === 200) {
                            const urlArr = client.responseURL.split('/')
                            resolve({
                                data: client.response,
                                url: urlArr[urlArr.length - 1]
                            })
                        } else {
                            reject(new Error(client.statusText))
                        }
                    }
                    client.open('GET', url)
                    client.send()
                })
            },

            getIndexStyle() {
                //let {data} = await this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css');
                //this.originalStyle = this.getStyleTemplate(data);
                this.originalStyle = colorful.originalStyle;
            },

        },
        created() {
            //this.getIndexStyle()
        },
    }
</script>
