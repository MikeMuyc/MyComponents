
<script>
    export default {
        name: "normalInput",
        render: function (createElement) {
            let self = this;
            return createElement('input', {
                attrs: {
                    type: 'text'
                },
                class:{
                    createdInput:true,
                },
                on: {
                    input: function (event) {
                        self.$emit('input', event.target.value)
                    },
                    focus: function () {
                        self.$emit('focus', true)
                    },
                    blur: function () {
                        self.$emit('focus', false)
                    },
                }
            })
        },

    }
</script>

<style scoped>
    .createdInput{
        min-width: 120px;
        width: 100%;
        border-top: 0 none;
        border-left: 0 none;
        border-right: 0 none;
        color: #333;
    }
</style>