<template>
    <div id="PDF" :style="`width: ` + width">
        <myPage @sentTo="changepage" :totalCount="totalPages" :pageNo="pageNo" :totalPageCount="totalPages" :pagesize="pageSize"></myPage>
        <canvas id="the-canvas"></canvas>
    </div>
</template>

<script>
    import PDFJS from 'pdfjs-dist'
    import myPage from '@/components/mypagination';
    export default {
        props: [
            'width',
            'url',

        ],
        data() {
            return {
                title: '',
                pdfDoc: null,
                loadding: false,
                totalPages:0,
                pageNo:1,
                pageSize:1,
            }
        },
        components:{
            myPage
        },
        computed: {
            wid: function () {
                return parseFloat(this.width.replace('px', ''))
            }
        },
        mounted(){
            this.loadFile(this.url);
        },
        watch: {
            url: function (val) {
                //let url = `http://172.18.45.4:6087/api/file/downFile?id=${val}`

                console.log(val)
            }
        },
        methods: {
            changepage(page){
                this.renderPage(page)
            },
            renderPage(num) {
                let _this = this
                this.pdfDoc.getPage(num).then(function (page) {
                    let canvas = document.getElementById('the-canvas')
                    let ctx = canvas.getContext('2d')
                    let dpr = window.devicePixelRatio || 1
                    let bsr = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1
                    // let ratio = dpr / bsr

                    var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)

                    let ratio = _this.wid / viewport.width

                    canvas.width = viewport.width * ratio
                    canvas.height = viewport.height * ratio
                    canvas.style.width = canvas.width + 'px'
                    canvas.style.height = canvas.height + 'px'
                    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    }
                    page.render(renderContext)
                    /*if (_this.pages > num) {
                        _this.renderPage(num + 1)
                    }*/
                })
            },
            loadFile(url) {
                let _this = this
                PDFJS.getDocument(url).then(function (pdf) {
                    _this.pdfDoc = pdf;
                    _this.totalPages = _this.pdfDoc.numPages;
                    _this.$nextTick(() => {
                        _this.renderPage(_this.pageNo)
                    })
                })
            }
        },
    }
</script>

<style scoped>
    canvas {
        display: block;
    }
</style>
