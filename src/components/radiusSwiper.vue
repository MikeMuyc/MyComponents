<template>
    <div id="radiusSwiper">
        <div class="main_menu" style="background-image: url('../assets/orbit.png')">
            <div class="swiper_item" ref="swiper_item" v-for="item in dataList" :key="item.id" @click="itemClick(item)">
                <div class="iconImg" :style="{height:10*vw+'px'}">
                    <img :src="imgSrc(item.img)">
                </div>
                <div class="placehu">
                    <slot name="txt" v-bind:item="item">
                        {{item}}
                    </slot>
                </div>
            </div>

        </div>
        <div @click="go(-1)" class="left_button"><</div>
        <div @click="go(1)" class="right_button">></div>
    </div>
</template>
<script>


    export default {
        name: "radiusSwiper",
        components: {},
        props: {
            dataList: {
                default: [
                    {
                        img: '',
                        txt: ``,
                        userId: '',
                    },
                ],
            },
            //基准宽度，默认为1920宽度下的样式
            vw: {
                type: Number,
                default: 1920 / 100,
            },
        },
        data() {
            return {
                time: 0,
                setinterval: null,
                settings: {
                    itemWidth: 9,
                    itemHeight: 6,
                    containerWidth: 50,
                    containerHeight: 15,
                },
            }
        },
        mounted() {
            this.setinterval = setInterval(() => {
                this.dataCheck();
            }, 500)
        },
        watch:{

        },
        methods: {
            onresize() {
                console.log(document.body.clientWidth, 1)
            },
            dataCheck() {
                let itemList = document.getElementsByClassName(`swiper_item`);
                if (itemList.length > 0) {
                    clearInterval(this.setinterval);
                    this.init();
                }
            },


            init() {
                //const itemList = this.$refs.swiper_item;
                let itemList = document.getElementsByClassName(`swiper_item`);

                for(let index=0;index<itemList.length;index++){
                    let item = itemList[index];
                    let top = (Math.cos(2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerHeight - this.settings.itemHeight) / 2 - this.settings.itemHeight / 2;
                    let left = (Math.sin(2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerWidth) / 2 - this.settings.itemWidth / 2;
                    item.style.left = left * this.vw + 'px';
                    item.style.top = top * this.vw + "px";

                    if (top < 0) {
                        item.style.opacity = 0.2;
                        item.childNodes.forEach(cItem => {
                            if (cItem.className === `placehu`) {
                                cItem.style.display = 'none';
                            }
                        })
                    } else {
                        item.style.opacity = 1;
                        item.childNodes.forEach(cItem => {
                            cItem.style.display = 'flex';
                        })
                    }
                }
                /*itemList.forEach((item, index) => {
                    let top = (Math.cos(2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerHeight - this.settings.itemHeight) / 2 - this.settings.itemHeight / 2;
                    let left = (Math.sin(2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerWidth) / 2 - this.settings.itemWidth / 2;
                    item.style.left = left * this.vw + 'px';
                    item.style.top = top * this.vw + "px";

                    if (top < 0) {
                        item.style.opacity = 0.2;
                        item.childNodes.forEach(cItem => {
                            if (cItem.className === `placehu`) {
                                cItem.style.display = 'none';
                            }
                        })
                    } else {
                        item.style.opacity = 1;
                        item.childNodes.forEach(cItem => {
                            cItem.style.display = 'flex';
                        })
                    }
                });*/
            },
            imgSrc(src) {
                if (src) {
                    let arr = src.split(`8666`);
                    let src1 = '';
                    if (arr.length === 1) {
                        src1 = arr[0]
                    } else {
                        src1 = arr.slice(1).join(``)
                    }
                    if (src.indexOf(`http://localhost`) > -1) {
                        if (process.env.NODE_ENV === 'development') {
                            //开发环境 do something
                            return `api/${src1}`;
                        } else {
                            //生产环境 do something
                            return src1;
                        }
                    } else if (src.indexOf(`http`) > -1) {
                        return src
                    } else if (process.env.NODE_ENV === 'development') {
                        //开发环境 do something
                        return `api/${src1}`;
                    } else {
                        //生产环境 do something
                        return src1;
                    }
                } else {
                    return headPhoto;
                }
            },
            go(num) {
                // const itemList = this.$refs.swiper_item;
                let itemList = document.getElementsByClassName(`swiper_item`);
                this.time += num * 2 * Math.PI / itemList.length;

                for(let index=0;index<itemList.length;index++) {
                    let item = itemList[index];
                    let top = (Math.cos(this.time + 2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerHeight - this.settings.itemHeight) / 2 - this.settings.itemHeight / 2;
                    let left = (Math.sin(this.time + 2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerWidth) / 2 - this.settings.itemWidth / 2;
                    item.style.left = left * this.vw + 'px';
                    item.style.top = top * this.vw + "px";

                    if (top < 0) {
                        item.style.opacity = 0.2;
                        item.childNodes.forEach(cItem => {
                            if (cItem.className === `placehu`) {
                                cItem.style.display = 'none';
                            }
                        })
                    } else {
                        item.style.opacity = 1;
                        item.childNodes.forEach(cItem => {
                            cItem.style.display = 'flex';
                        })
                    }
                }
                /*itemList.forEach((item, index) => {
                    let top = (Math.cos(this.time + 2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerHeight - this.settings.itemHeight) / 2 - this.settings.itemHeight / 2;
                    let left = (Math.sin(this.time + 2 * Math.PI / itemList.length * index) + 1) * (this.settings.containerWidth) / 2 - this.settings.itemWidth / 2;
                    item.style.left = left * this.vw + 'px';
                    item.style.top = top * this.vw + "px";

                    if (top < 0) {
                        item.style.opacity = 0.2;
                        item.childNodes.forEach(cItem => {
                            if (cItem.className === `placehu`) {
                                cItem.style.display = 'none';
                            }
                        })
                    } else {
                        item.style.opacity = 1;
                        item.childNodes.forEach(cItem => {
                            cItem.style.display = 'flex';
                        })
                    }
                });*/
            },

            itemClick(item) {
                this.$emit(`itemClick`, item);
            },
        },
    }
</script>

<style lang="scss" scoped>
    #radiusSwiper {
        position: relative;
        width: 100%;
        height: 100%;

        .main_menu {
            width: 80%;
            height: 57.6%;
            left: 10%;
            top: 21.2%;
            position: absolute;
            background-repeat: no-repeat;
            background-position: left center;
            background-size: 100%;
            font-size: 18px;
            user-select: none;

            > .swiper_item {
                width: 18.3%;
                position: absolute;
                text-align: center;
                transition: left 0.3s, opacity 0.3s, top 0.3s;
                cursor: pointer;
                user-select: none;

                .iconImg {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        border-radius: 6px;
                        max-width: 100%;
                        max-height: 100%;
                        background-color: #fff;
                    }
                }

                > .placehu {
                    display: flex;
                    font-weight: normal;
                    font-stretch: normal;
                    justify-content: center;
                    color: #ffffff;
                }
            }
        }

        .left_button {
            position: absolute;
            left: 22px;
            top: 48%;
            font-size: 60px;
            color: #4037bf;
            transform: scale(1, 1.5);
            cursor: pointer;
            user-select: none;
        }

        .right_button {
            position: absolute;
            right: 22px;
            top: 48%;
            font-size: 60px;
            color: #4037bf;
            transform: scale(1, 1.5);
            cursor: pointer;
            user-select: none;
        }

    }
</style>
