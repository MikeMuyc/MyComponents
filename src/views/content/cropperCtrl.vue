<template>
    <div id="cropperCtrl" >
        <div class="contentBody">
            <div class="rowline">
               图片裁剪组件vue-cropper
            </div>
            <div class="rowline">
                <div class="label">
                    <div class="note">*</div>
                    头像
                </div>
                <div class="right">
                    <img v-if="" :src="imgsrc" id="image" class="headPhoto">
                </div>
            </div>
            <div class="rowline">
                <label for="imgup"><myBtn type="normal" text="上传头像"></myBtn></label>
                <input type="file" id="imgup" @change="initCanvas">
            </div>

        </div>


        <el-dialog
                :visible.sync="upDialog"
                width="880px"
                top="8vh"
                custom-class="myDialog"
                :append-to-body="true"
        >
            <span class="title" slot="title">
                <span>上传头像</span>
                <i class="iconfont icon-shanchu-copy" @click="upDialog = false"></i>
            </span>
            <div style="width: 100%;height: 400px">
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
            <span slot="footer">
                <myBtn type="normal" text="裁剪" :handleClick="onCubeImg"></myBtn>
            </span>
        </el-dialog>
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
            outputSize: 2,                   // 裁剪生成图片的质量
            outputType: 'png',              //裁剪生成图片的格式
            canScale: true,                 // 图片是否允许滚轮缩放
            autoCrop: true,                  // 是否默认生成截图框
            autoCropWidth: 80,              // 默认生成截图框宽度
            autoCropHeight: 80,             // 默认生成截图框高度
            fixed: true,                    //是否开启截图框宽高固定比例
            fixedNumber: [8, 8],              //截图框的宽高比例
            centerBox:true,
        };
        upDialog:boolean = false;
        imgsrc:any = null;

        initCanvas(ev){
            let file = ev.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);//转化成base64数据类型
            let _this = this;
            reader.onload = function(e){
                _this.option.img = e.target.result;
                _this.upDialog = true;
            }
        }

        onCubeImg() {
            let cropper:any = this.$refs.cropper;
            // 获取cropper的截图的base64 数据
            cropper.getCropData(data => {
                this.imgsrc = data;
                //先将显示图片地址清空，防止重复显示
                //this.option.img = ''
                this.upDialog = false;
            })
        }


    }
</script>

<style lang="scss" scoped>
    #cropperCtrl {
        height: 500px;
        .headPhoto{
            width:80px;
            height: 80px;
        }
    }
</style>
