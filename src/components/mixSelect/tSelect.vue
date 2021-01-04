<template>
    <div class="tSelect" :class="{multiple:multiple}" ref="tSelect">
        <vue-perfect-scrollbar ref="tScroll" :style="{height:theight}"
                               :settings="{wheelPropagation:false,minScrollbarLength:18}">
            <div class="tLine" :class="{hover:hoverIndex === index}" v-for="(item,index) in arr" :key="item[valueName]">
                <div class="tLabel" :class="{checked:isChecked(item),active:value === item[valueName] || item.isParent}"
                     @mouseenter="mouseEnter(index,item)" @click="sentVal(item)">
                    <div class="radius-box" v-if="multiple">
                        <i v-if="isChecked(item)" class="iconfont icon-gou1"></i>
                    </div>
                    {{item[labelName]}}
                </div>

                <div class="rowIcon">
                    <slot name="rowIcon" v-if="item[childrenName] && item[childrenName].length>0">
                        <i class="iconfont" :class="rowIconName"></i>
                    </slot>
                </div>
            </div>
        </vue-perfect-scrollbar>
        <transition name="tfade">
            <tSelect v-if="Titem[childrenName] && Titem[childrenName].length>0 && hoverIndex === Tindex"
                     v-show="hoverIndex === Tindex"
                     :value="value"
                     :arr="Titem[childrenName]"
                     :style="{left:leftVal,top:topVal}"
                     :labelName="labelName"
                     :valueName="valueName"
                     :childrenName="childrenName"
                     :busName="busName"
                     :rowIconName="rowIconName"
                     :multiple="multiple"
                     :checkedList="checkedList"
                     :parentName="parentNameTo"
                     :parentIds="parentIdTo"
                     :checkStrictly="checkStrictly"
            >
                <slot name="rowIcon" slot="rowIcon"></slot>
            </tSelect>
        </transition>
    </div>

</template>

<script>
    import bus from './eventBus'

    export default {
        name: "tSelect",
        props: {
            value: {},
            arr: {
                required: true,
                type: Array,
                default: function () {
                    return []
                },
            },
            labelName: {
                type: String,
                default: `name`,
            },
            valueName: {
                type: String,
                default: `value`,
            },
            childrenName: {
                type: String,
                default: `children`,
            },
            maxViewItem: {
                type: Number,
                default: 6,
            },
            busName: {
                type: String,
            },
            rowIconName: {
                type: String,
                default: 'iconjiantou1',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            checkedList: {
                type: Array,
                default: function () {
                    return []
                },
            },
            parentName: {
                type: String,
                default: '',
            },
            parentIds: {
                type: Array,
                default: function () {
                    return []
                },
            },
            //是否可选任意节点。默认只能选最底层节点
            checkStrictly: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                hoverIndex: -1,
                leftVal: ``,
                topVal: ``,
                itemHeight: 32,
                theight: '',
                Titem: {},
                Tindex: -1,
                isParent: false,
            }
        },
        computed: {
            parentNameTo: function () {
                if (this.parentName) {
                    return `${this.parentName}/${this.Titem[this.labelName]}`
                } else {
                    return this.Titem[this.labelName]
                }
            },
            parentIdTo: function () {
                if (this.parentIds.length > 0) {
                    return this.parentIds.concat(this.Titem[this.valueName])
                } else {
                    return [this.Titem[this.valueName]]
                }
            }

        },
        watch: {
            arr: function () {
                if (this.arr.length > this.maxViewItem) {
                    this.theight = this.itemHeight * this.maxViewItem + `px`;
                } else {
                    this.theight = this.itemHeight * this.arr.length + `px`;
                }
                this.$nextTick(() => {
                    this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
                });
                this.hoverIndex = -1;
            },
            hoverIndex: function (val) {
                this.topVal = val * this.itemHeight - this.$refs.tScroll.$el.scrollTop + `px`;
            }
        },
        mounted() {

            if (this.arr.length > this.maxViewItem) {
                this.theight = this.itemHeight * this.maxViewItem + `px`
            }
            this.$nextTick(() => {
                this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
            });
        },
        methods: {
            mouseEnter(index, item) {
                this.hoverIndex = index;
                this.Titem = item;
                this.Tindex = index;
            },
            sentVal(item) {
                if (item[this.valueName] !== undefined) {
                    item.parentName = this.parentName;
                    item.parentIds = this.parentIds;

                    if (item[this.childrenName]) {
                        if (this.checkStrictly) {
                            bus.$emit(`${this.busName}`, item)
                        } else if (item[this.childrenName].length === 0) {
                            bus.$emit(`${this.busName}`, item)
                        }
                    } else {
                        bus.$emit(`${this.busName}`, item)
                    }
                }
            },

            isChecked(item) {
                let isIndex = this.checkedList.findIndex(item1 => item1 === item);
                return isIndex > -1
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "./variables.scss";
    @import "./iconfont/iconfont.css";
    $white-color: #fff;
    $boxHeight: 32px;
    .tSelect {
        z-index: 99;
        position: absolute;
        top: 0;
        margin-bottom: 20px;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(183, 183, 183, 0.6);
        border-radius: 4px;
        transform-origin: center top 0;


        .tLine {
            position: relative;

            .tLabel {
                padding: 10px 30px 10px 10px;
                height: $boxHeight;
                display: flex;
                align-items: center;
                user-select: none;
                cursor: pointer;
                white-space: nowrap;

                &:active {
                    background-color: $background-active;
                }

                &.checked, &.active {
                    color: $theme-color;
                }
            }

            &:hover, &.hover {
                .tLabel {
                    color: #fff;

                    &.checked, &.active {
                        color: #fff;;
                    }

                    background-color: $theme-color;
                }

                .rowIcon {
                    > .iconfont {
                        color: #fff;
                    }
                }
            }
        }

        .rowIcon {
            position: absolute;
            right: 6px;
            top: 0;
            height: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;

            > .iconfont {
                font-size: 10px;
            }
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

    .tfade-enter {
        opacity: 0;
        transform: rotateY(90deg);
    }

    .tfade-leave-to {
        opacity: 0;
        transform: rotateY(90deg);
    }

    .iconcheck {
        color: $theme-color;
        font-size: 12px;
    }

    .tLine.hover {
        .iconcheck {
            color: #ffffff;
        }
    }

    .radius-box {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid $border-color;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
</style>
