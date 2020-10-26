
<script>
    export default {
        name: "normalInput",
        model: {
            prop: 'value',
            event:  `decorate`,
        },
        props:{
            disabled:{
                type:Boolean,
                default:false,
            },
            necessary:{
                type:Boolean,
                default:false,
            },
            placeholder:{
                type:String,
            },
            type:{
                type:String,
                default:"text",
                //text,number,float,2fixed,allNumber,allFloat,all2fixed;分别代表字符串，正整数，正数,正数（2位小数），所有整数，所有数，所有数（保留2位小数）
            },
            value:{},
        },
        data() {
            return {
                iNecessary:false,
            }
        },
        render: function (createElement) {
            let self = this;
            return createElement('div', {
                    class:{
                        myInputbox:true,
                    },
                },
                [
                    createElement('input', {
                        domProps: {
                            value: self.value
                        },
                        attrs: {
                            type: 'text',
                            placeholder:this.placeholder,
                            disabled:this.disabled,
                        },
                        class:{
                            createdInput:true,
                            error:this.iNecessary,
                        },
                        on: {
                            input: function (event) {
                                self.$emit('decorate', event.target.value)
                            },
                            focus: function (event) {
                                self.$emit('focus', event.target.value)
                            },
                            keydown: function (event) {
                                if(event.code===`Enter`){
                                    self.$emit('enter', event.target.value)
                                }
                            },
                            blur: function (event) {
                                if (event.target.value === '') {
                                    self.iNecessary = self.necessary;
                                }
                                else{
                                    if(self.type === 'number'){
                                        if(parseInt(event.target.value) >= 0) {
                                            event.target.value = parseInt(event.target.value);
                                        }

                                        else{
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正整数！`)
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    else if(self.type === 'float'){
                                        if(parseFloat(event.target.value) >= 0) {
                                            event.target.value = parseFloat(event.target.value);
                                        }

                                        else {
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正数！`)
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    else if(self.type === '2fixed'){
                                        if (parseFloat(event.target.value) >= 0) {
                                            event.target.value = Number(parseFloat(event.target.value).toFixed(2))
                                        }

                                        else {
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正数！`)
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    else if(self.type === 'allNumber'){
                                        if ( isNaN(event.target.value) ) {
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正确的数字！`)
                                        }

                                        else{
                                            event.target.value = parseInt(event.target.value);
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    else if(self.type === 'allFloat'){
                                        if ( isNaN(event.target.value) ) {
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正确的数字！`)
                                        }

                                        else{
                                            event.target.value = parseFloat(event.target.value);
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    else if(self.type === 'all2fixed'){
                                        if ( isNaN(event.target.value) ) {
                                            event.target.value = 0;
                                            self.$message.warning(`请输入正确的数字！`)
                                        }
                                        else{
                                            event.target.value = Number(parseFloat(event.target.value).toFixed(2))
                                        }
                                        self.$emit('decorate', Number(event.target.value))
                                    }
                                    self.iNecessary = false;
                                }
                                self.$emit('blur', event.target.value)
                            },
                        }
                    }),
                    createElement('i',{
                        class:{
                            iconfont:true,
                            iconsousuo:true,
                            show:this.type === `search`,
                        },
                        on: {
                            click: function (event) {
                                self.$emit('enter')
                            },
                        }
                    }),
                    /*createElement('i',{
                        class:{
                            tips:true,
                            show:this.iNecessary,
                        },
                        on: {

                        }
                    },`不能为空`)*/
                ])
        },

        beforeDestroy(){
            this.iNecessary = false;
        }
    }
</script>

<style lang="scss" scoped>

    @import "../styles/mainVariables";
    .myInputbox{
        min-width: 60px;
        width: 100%;
        position: relative;
        .createdInput{
            width: 100%;
            height: 36px;
            border-radius: 4px;
            border: solid 1px #dde4eb;
            padding: 0 10px;
            transition: .3s;
            &:focus,&:hover{
                border-color: $theme-color;
                box-shadow: 0px 0px 3px 0px rgba(58, 126, 243, 0.6);
            }
            &:disabled{
                background-color: #f8f9fc;
                cursor: not-allowed;
            }
            &.error{
                border-color: $error-color;
                box-shadow: 0px 0px 3px 0px rgba(255,44,44,0.6);
            }
        }
        .iconfont{
            position: absolute;
            z-index: 2;
            right: 8px;
            top: 10px;
            font-size: 16px;
            color: #a0a5a9;
            line-height: 1;
            display: none;
            cursor: pointer;
            &.show{
                display: inline-block;
            }
        }
        .tips{
            color: red;
            position: absolute;
            left: 5px;
            top:calc(100% + 5px);
            font-size: 12px;
            display: none;
            &.show{
                display: inline-block;
            }
        }
    }

</style>
