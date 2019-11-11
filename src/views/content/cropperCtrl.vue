<template>
    <div id="cropperCtrl" >
        <div style="width: 100%;height: 30px;margin-bottom: 10px">
            <label for="imgup"><myBtn type="normal" text="上传"></myBtn></label>
            <input type="file" id="imgup" @change="initCanvas">
            <myBtn type="normal" text="裁剪" :handleClick="onCubeImg"></myBtn>
        </div>
        <img src="" id="image" style="">

        <vueCropper ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber">
        </vueCropper>


    </div>
</template>
<script lang="ts">
    import { VueCropper } from 'vue-cropper'
    import {Vue, Component, Watch} from "vue-property-decorator";
    import myBtn from '@/components/myBtn.vue'
    @Component({
        components: {myBtn, VueCropper}
    })

    export default class cropperCtrl extends Vue {
        option:any = {
            img: '',                         //裁剪图片的地址
            info: true,                      //裁剪框的大小信息
            outputSize: 1,                   // 裁剪生成图片的质量
            outputType: 'jpeg',              //裁剪生成图片的格式
            canScale: true,                 // 图片是否允许滚轮缩放
            autoCrop: true,                  // 是否默认生成截图框
            autoCropWidth: 150,              // 默认生成截图框宽度
            autoCropHeight: 150,             // 默认生成截图框高度
            fixed: true,                    //是否开启截图框宽高固定比例
            fixedNumber: [16, 9]              //截图框的宽高比例
        };
        fileinfo:any = {};
        fileUpload:any = {};
        isShowCropper:boolean = false;

        initCanvas(ev){
            let file = ev.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);//转化成base64数据类型
            let _this = this;
            reader.onload = function(e){
                _this.option.img = e.target.result;
            }
        }

        onCubeImg() {
            let cropper:any = this.$refs.cropper;
            // 获取cropper的截图的base64 数据
            cropper.getCropData(data => {
                this.fileinfo.url = data
                this.isShowCropper = false

                console.log(data);
                let img:any = document.getElementById(`image`);
                img.src = data;
                //先将显示图片地址清空，防止重复显示
                // this.option.img = ''

            })
        }


    }
</script>

<style lang="scss" scoped>
    #cropperCtrl {
        height: 500px;
    }
</style>
