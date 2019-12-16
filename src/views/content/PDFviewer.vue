<template>
    <div id="PDFviewer">
        <PDF width="800px" :url="pdfUrl"></PDF>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Watch} from "vue-property-decorator";
    import PDF from "@/components/PDF.vue";

    @Component({
        components: {PDF}
    })

    export default class PDFviewer extends Vue {
        pdfUrl:string = 'http://172.18.0.111:8666/blogFile/javascript教程.pdf';
    }
</script>

<style lang="scss" scoped>
    #PDFviewer {

    }
</style>
