
<script>
    export default {
        name: "myBtn",
        props: {
            type: {
                type: String,
                default: 'normal'
            },
            text: {
                type: String,
                default: '按钮'
            },
            handleClick:{
                type:Function,
                default:function () {

                }
            }
        },

        render (h) {
            return h('div', {
                class: {
                    'mybtn': true,
                    'confirm': this.type === 'confirm',
                    'cancel': this.type === 'cancel',
                    'normal': this.type === 'normal'
                },
                domProps: {
                    innerText: this.text
                },
                on: {
                    click: this.handleClick
                }
            });
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/main';
    .mybtn{
        padding: 0 10px;
        height: 30px;
        border-radius: 3px;
        display: inline-flex;
        align-items: center;
        border: 1px solid #ddd;
        cursor: pointer;
        user-select: none;
        margin: 0 5px;
        &.normal{
            background-color: $style-red;
            border-color: $style-red;
            color: #fff;
            &:active{
                background-color: $active-red;
            }
        }
        &.confirm{
            background-color: #fff;
            border-color: $style-red;
            color: $style-red;
            &:active{
                box-shadow: inset 0 2px 3px 2px #F9E8F1;
                border-color: $active-red;
            }
        }
        &.cancel{
            background-color: #fff;
            border-color: #bbb;
            color: #999;
            &:active{
                border-color: #999;
                color: #666;
            }
        }
    }

</style>