<template>
    <div id="Mybody">
        <div id="header">
            <div class="headCenter">
                <div class="left"></div>

                <div class="nav">
                    <div @click="navRouteTo(item.redirect)" v-for="item in navlist" class="itemli">

                        <div class="txt">{{item.name}}</div>
                    </div>
                    <div class="whiteHover" :class="hoverIndex"></div>
                </div>

                <div class="right">
                    <i class="iconfont iconxiaoxi"></i>

                    <i class="iconfont icontongzhi" ></i>
                </div>
            </div>
        </div>
        <vue-perfect-scrollbar :style="{height:bodyHeight + `px`}" ref="pfScroll" id="_scroll" :isBodyScroll="true">

            <transition name="el-fade-in-linear">
                <router-view></router-view>
            </transition>
        </vue-perfect-scrollbar>
    </div>
</template>

<script>
    import navlist from 'json/admin'
    export default {
        name: "Mybody",
        components: {

        },
        data() {
            return {
                navlist: navlist,
                bodyHeight: document.body.clientHeight - 60 ,
                showScroll: false,
            }
        },
        watch: {

        },
        mounted() {

        },
        computed: {
            hoverIndex() {
                let path = this.$route.path;
                if (path.indexOf(`mainIndex`) > -1) {
                    return `mainIndex`
                } else if (path.indexOf(`trainingManagement`) > -1) {
                    return `trainingManagement`
                } else if (path.indexOf(`communication`) > -1) {
                    return `communication`
                } else if (path.indexOf(`personnelManagement`) > -1) {
                    return `personnelManagement`
                }
            }
        },
        methods: {
            navfor(path) {
                return this.$route.fullPath.indexOf(path) > -1
            },
            navRouteTo(name) {
                if (name !== ``) {
                    this.$router.push({name: name});
                    this.$store.commit('communication/courseList/setcourseCurr', ``);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    #Mybody {
        height: 100%;
        position: relative;
        overflow: hidden
    }

    #header {
        height: 60px;
        background: url("../assets/background.png") #fff no-repeat center top;
        background-size: 1920px 60px;

        .headCenter {
            max-width: 1920px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            display: flex;
        }
    }

    .headCenter .left {
        padding-left: 50px;
        display: flex;
        align-items: center;
        width: calc(4% + 308px );
        margin-right: calc(4% - 30px);
    }

    .headCenter .left img {
        user-select: none;
        width: 100%;
    }

    .headCenter .right {
        display: flex;
        align-items: center;
        height: 60px;
        padding-right: 50px;
    }

    .nav {
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;
        position: relative;
        z-index: 1;
        .whiteHover {
            height: 60px;
            width: 100px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            background-color: rgba(255, 255, 255, 0.2);
            border-bottom: 3px solid #354ef2;
            transition: .3s;
            &.mainIndex {
                left: 0
            }

            &.trainingManagement {
                left: 300px;
            }

            &.communication {
                left: 400px;
            }

            &.personnelManagement {
                left: 500px;
            }
        }
    }

    .itemli {

    }

    .itemli .txt {
        width: 100px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        transition: .3s;
        cursor: pointer;
        user-select: none;
    }

    .itemli.active .txt {
        color: #fff;
    }

    .headCenter .right {
        .iconfont {
            margin-right: 20px;
            margin-top: 6px;
            cursor: pointer;
            font-size: 24px;
            width: 24px;
            height: 30px;
            line-height:  30px;
            color: #ffffff;
        }
    }

    .headCenter .right .photo {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #fff;
    }
</style>
