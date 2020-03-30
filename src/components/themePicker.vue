<template>
    <div class="themePicker">
        <el-color-picker style="margin-right: 40px" v-model="primary"></el-color-picker>
        <em>{{primary}}</em>
        <el-button type="primary" size="mini" @click="submitForm">确定</el-button>
    </div>
</template>
<script>
    // import colorful from '@/utils/color'
    // import objectAssign from 'object-assign'
    import {mapGetters} from 'vuex';
    import {themeFunction} from '@/utils/themeChange'
    export default {
        name: 'themePicker',
        data() {
            return {
                primary: `#354ef2`,
                originalStyle: '',
                primaryColor: `#354ef2`,
                themeColor: `#354ef2`,
            }
        },
        computed: {
           /* ...mapGetters({
                themeColor:'user/getThemeColor',
            })*/
        },
        methods: {
            submitForm() {
                document.getElementsByTagName('body')[0].style.setProperty('--colorful',this.primary);
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-second',this.$utils.colourBlend(`#000000`,this.primary,0.9));
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-active',this.$utils.colourBlend(`#ffffff`,this.primary,0.8));
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-border',this.$utils.colourBlend(`#ffffff`,this.primary,0.3));
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-background',this.$utils.colourBlend(`#ffffff`,this.primary,0.2));
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-shadow',this.$utils.colourBlend(`#ffffff`,this.primary,0.1));
                document.getElementsByTagName('body')[0].style.setProperty('--colorful-shadow95',this.$utils.colourBlend(`#ffffff`,this.primary,0.05));
                themeFunction(this.primary)

            },

        },
        created() {
            this.primary = this.themeColor;
        },
    }
</script>
<style lang="scss" scoped>
    .themePicker{
        display: flex;
        height: 40px;
        align-items: center;
        em{
            font-style: normal;
            padding: 0 15px;
        }
    }
</style>
