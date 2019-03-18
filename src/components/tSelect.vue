<template>
    <div class="tSelect" ref="tSelect">
        <div class="tLine" v-for="(item,index) in arr" >
            <div class="tLabel" @mouseenter="hoverIndex = index" @click="sentVal(item[valueName],item[labelName])">
                {{item[labelName]}}
            </div>
            <i class="iconfont iconjiantou" v-if="item[childrenName]"></i>
            <transition name="tfade">
                <tSelect v-if="item[childrenName] && hoverIndex === index" v-show="hoverIndex === index" :arr="item[childrenName]" :style="{left:leftVal}" :labelName="labelName" :valueName="valueName" :childrenName="childrenName"></tSelect>
            </transition>

        </div>
    </div>

</template>

<script>
    import bus from './eventBus'
    export default {
        name: "tSelect",
        props:[`arr`,`labelName`,`valueName`,`childrenName`],
        data() {
            return {
                hoverIndex:-1,
                leftVal:``,
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
            });
        },
        methods: {
            sentVal(val,name){
                if(val){
                    bus.$emit(`tsObj`,{val:val,name:name})
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../style/main";
    .tSelect {
        z-index: 99;
        position: absolute;
        top: 0;
        margin-bottom: 20px;
        background: #fff;
        border-radius: 2px;
        border: 1px solid #ddd;
        .tLine{
            position: relative;
            .tLabel{
                padding: 10px 15px 10px 10px;
                height: 36px;
                display:flex;
                align-items: center;
                user-select: none;
                cursor: pointer;
                white-space: nowrap;
                &:hover{
                    background-color: #f5f7fa;
                }
                &:active{
                    box-shadow: inset 0 3px 6px 3px #eee;
                }
            }
        }
        .iconjiantou{
            position: absolute;
            right: 1px;
            top: calc(50% - 10px);
            font-size: 8px;
            display: block;
            transform: rotate(180deg);
        }
    }

    /*进入离开过渡动画*/
    .tfade-enter-active {
        transition: all .3s;
        transform-origin: left center 0;
        transform: rotateY(0deg);
    }

    .tfade-leave-active {
        transition: all .3s;
        transform-origin: left center 0;
        transform: rotateY(0deg);
    }

    .tfade-enter{
        opacity: 0;
        transform: rotateY(90deg);
    }

    .tfade-leave-to {
        opacity: 0;
        transform: rotateY(90deg);
    }
</style>