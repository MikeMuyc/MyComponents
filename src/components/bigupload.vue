<template>
    <div class="upload">
        <div class="uploadBody">
            <input type="file" :id="input_id" :ref="input_id" :accept="accept" @change="handlerFileChange"
                   :multiple="multiple && 'multiple'"/>
            <label :for="input_id" class="select-btn" id="aaa">上传视频</label>

        </div>
        <slot name="file-list" :list="fileList" :remove="handlerRemoveFile">
            <ul class="upload-list">
                <li v-for="(file, index) in fileList" :key="file.name">
                    <img :src="file.preview" v-if="file.preview"/>
                    <label>
                        {{file.name}}
                        ({{getSize(file.size)}})
                    </label>
                    <span @click="handlerRemoveFile(file, index)"
                          v-show="btnFlag"
                          :class="{error: (file.status === UPLOAD_FAIL || !!file.msg),
                            success: file.status === UPLOAD_SUCCESS
                        }"
                    >
                        {{file.msg || (file.per? `${file.per}%`: '')}}
                        删除
                    </span>
                    <i :style="{ width: `${file.per || 0}%` }"
                       :class="{
                            error: file.status === UPLOAD_FAIL,
                            success: file.status === UPLOAD_SUCCESS
                            }">
                    </i>
                </li>
            </ul>
        </slot>
        <!-- get_filemd5sum -->
        <slot name="upload-btn" :handlerStartUpload="handlerUploading">
            <button
                    class="upload-btn"
                    style="margin-bottom: 10px"
                    v-if="fileList.some(f => [READY_UPLOAD, UPLOAD_FAIL].includes(f.status)) && btnFlag"

                    @click="handlerUploading"
            >
                开始上传
            </button>
            <button class="loadingBtn" style="margin-bottom: 10px" v-else-if="!btnFlag">上传中...</button>
        </slot>
    </div>
</template>
<script>
    import axios from 'axios';
    import md5 from 'js-md5';
    import qs from 'qs';

    const requestCancelQueue = {} // 请求方法队列（调用取消上传
    const VALIDATE_FAIL = -1 // 文件验证失败，只能删除
    const READY_UPLOAD = 0 // 待上传
    const UPLOADING = 1 // 上传中
    const UPLOAD_FAIL = 2 // 上传失败
    const UPLOAD_SUCCESS = 3 // 上传成功
    export default {
        name: 'bigupload',
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            // input[type="file"] accept
            accept: {
                type: String,
                default: 'video/*'
            },
            // 上传的文件列表，可支持默认，必须设置preview属性和status=UPLOAD_SUCCESS
            fileList: {
                type: Array,
                default: () => []
            },
            // 上传最大文件限制,5G
            maxSize: {
                type: Number,
                default: 5 * 1024 * 1024 * 1024
            },
            // 大于这个大小的文件使用分块上传(后端可以支持断点续传)
            multiUploadSize: {
                type: Number,
                default: 5 * 1024 * 1024
            },
            // 每块文件大小
            eachSize: {
                type: Number,
                default: 5 * 1024 * 1024
                // default: 50 * 1024 * 1024
            },
            // 提交的文件地址
            postUrl: {
                type: String,
                default: 'http://localhost:8088/rest/media/uploadBigFile'
            },
        },
        data() {
            return {
                input_id: 'file_' + (+new Date()).toString(36),
                READY_UPLOAD,
                UPLOADING,
                UPLOAD_FAIL,
                UPLOAD_SUCCESS,
                fileType: ['video/mp4', 'video/ogg', 'video/webm'],
                btnFlag: true,
            }
        },
        methods: {
            getTimes(file) {
                return new Promise((resolve, reject) => {
                    try {
                        let url = URL.createObjectURL(file);
                        let audioElement = new Audio(url);
                        let duration;
                        let RES = function (v) {
                            return resolve(v);
                        };

                        audioElement.addEventListener("loadedmetadata", function (_event) {

                            duration = audioElement.duration;
                            RES(parseInt(duration))
                        });
                    } catch (e) {
                        reject(new Error('获取时长失败'))
                    }
                })


                //获取时长
                // let url = URL.createObjectURL(file);
                // let audioElement = new Audio(url);
                //
                // let duration;
                //
                // audioElement.addEventListener("loadedmetadata", function (_event) {
                //     duration = audioElement.duration;
                // });
                // return (parseInt(duration));
            },
            //选择文件
            handlerFileChange({target: {files}}) {
                const {fileList, maxSize, fileType, getTimes} = this;
                Array.prototype.map.call(files, async file => {
                    if (!fileList.some(f => f.name === file.name)) {
                        file.status = READY_UPLOAD;
                        file.per = 0;
                        if (file.size > maxSize) {
                            this.$message({
                                showClose: true,
                                message: '该文件超出限制，请上传5G内的视频！',
                                type: 'error'
                            });
                        } else if (file.name.indexOf(`.flv`)>-1 || file.name.indexOf(`.f4v`)>-1 ) {
                            fileList.push(file);
                        } else if (!fileType.includes(file.type)) {
                            this.$message({
                                showClose: true,
                                message: '该文件格式暂不支持！',
                                type: 'error'
                            });
                        }
                        else if(file.type.indexOf(`video`) > -1) {
                            fileList.push(file);
                        }
                    }
                });
                this.$emit('on-file-change', fileList.slice())
            },
            // 从数组读取未上传和失败文件进行上传
            async handlerUploading() {
                const {fileList, setFileData, splitUpload} = this;
                for (let i = 0; i < fileList.length; i++) {
                    if ([READY_UPLOAD, UPLOAD_FAIL].includes(fileList[i].status)) {
                        this.btnFlag = false;
                        setFileData(fileList[i].name, {
                            per: 0,
                            msg: null,
                            status: UPLOADING
                        });
                        await splitUpload(fileList[i]);
                    }
                }

                /*fileList.forEach(async file => {
                    if ([READY_UPLOAD, UPLOAD_FAIL].includes(file.status))
                        setFileData(file.name, {
                            per: 0,
                            msg: null,
                            status: UPLOADING
                        });
                    await splitUpload(file)
                    //get_filemd5sum(file);
                }
            })*/
            },

            // 大文件分块上传
            async splitUpload(file) {

                return new Promise(async (resolve, reject) => {
                    // try {

                        const {eachSize, setFileData, getTimes} = this
                        setFileData(file.name, {
                            per: 0,
                            msg: null,
                            status: UPLOADING
                        });
                        const chunks = Math.ceil(file.size / eachSize)
                        const fileChunks = await this.splitFile(file, eachSize, chunks);
                        const md5 = await this.get_filemd5sum(file);
                        const date = this.changeDate((new Date()).getTime());
                        let currentChunk = 0;
                        let RES = function () {
                            return resolve();
                        };
                        for (let i = 0; i < fileChunks.length; i++) {
                            // 服务端检测已经上传到第currentChunk块了，那就直接跳到第currentChunk块，实现断点续传
                            if (Number(currentChunk) === i) {
                                // 每块上传完后则返回需要提交的下一块的index
                                let {flag, next, url} = await this.postFile({
                                    action: `upload`,
                                    index: i,                    //分块数索引
                                    total: chunks,               //总分块数
                                    size: eachSize,              //每个分块多大
                                    date: date,
                                    fileName: file.name,
                                    fullSize: file.size,         //总共多大
                                    file: fileChunks[i],
                                    md5: md5
                                });
                                currentChunk = next;
                                if (url) {
                                    this.btnFlag = true;

                                    setFileData(file.name, 'status', UPLOAD_SUCCESS);
                                    let arr = file.name.split(`.`);
                                    arr.splice(arr.length - 1, i);
                                    let name = arr.join(`.`);
                                    if (name.length > 20) {
                                        name = name.slice(0, 19)
                                    }
                                    let time = `未知`;
                                    if(url.indexOf(`mp4`)>-1){
                                        time = await getTimes(file);
                                    }
                                    debugger
                                    this.$emit('on-success', {
                                        url,
                                        name,
                                        time,
                                        preview: file.preview,
                                        size: file.size,
                                        status: file.status,
                                        msg: file.msg,
                                        per: file.per,
                                    });
                                    RES();
                                }
                            }
                        }
                    // } catch (e) {
                    //     reject(new Error('获取MD5失败'))
                    // }
                })
            },
            // 格式化文件大小显示文字
            getSize(size) {
                return size > 1024
                    ? size / 1024 > 1024
                        ? size / (1024 * 1024) > 1024
                            ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
                            : (size / (1024 * 1024)).toFixed(2) + 'MB'
                        : (size / 1024).toFixed(2) + 'KB'
                    : (size).toFixed(2) + 'B'
            },
            // 文件分块,利用Array.prototype.slice方法
            splitFile(file, eachSize, chunks) {
                return new Promise((resolve, reject) => {
                    try {
                        setTimeout(() => {
                            const fileChunk = []
                            for (let chunk = 0; chunks > 0; chunks--) {
                                fileChunk.push(file.slice(chunk, chunk + eachSize))
                                chunk += eachSize
                                // console.log(`分块`, fileChunk)
                            }
                            resolve(fileChunk)

                        }, 0)
                    } catch (e) {
                        reject(new Error('文件切块发生错误'))
                    }
                })
            },
            handlerRemoveFile(file, index) {
                if (requestCancelQueue[file.name]) {
                    requestCancelQueue[file.name]()
                    delete requestCancelQueue[file.name]
                }
                this.fileList.splice(index, 1);
                //this.$refs.input_id.value = '';
                this.$emit(`on-delete`, file);
                this.btnFlag = true;
            },
            // 提交文件方法,将参数转换为FormData, 然后通过axios发起请求
            postFile(param) {
                const formData = new FormData()
                for (let p in param) {
                    formData.append(p, param[p])
                }

                const {fileName} = param
                const config = {
                    cancelToken: new axios.CancelToken(function (cancel) {
                        if (requestCancelQueue[fileName]) {
                            requestCancelQueue[fileName]()
                            delete requestCancelQueue[fileName]
                        }
                        requestCancelQueue[fileName] = cancel
                    }),
                    onUploadProgress: e => {
                        let percent;
                        if (param.index) {
                            percent = parseInt(((((param.index * (param.size - 1)) + (e.loaded)) / param.fullSize) * 100).toFixed(2))
                        } /*else {
                             percent = parseInt(((e.loaded / e.total) * 100).toFixed(2))
                         }*/
                        this.setFileData(fileName, 'per', percent);
                    }
                };
                //配置代理路径
                if (process.env.NODE_ENV === 'development') {
                    //开发环境 do something
                    axios.defaults.baseURL = "./api";
                }
                return axios.post(`${this.postUrl}`, formData, config).then(rs => rs.data)
            },


            setFileData(fileName, key, value) {
                const index = this.fileList.findIndex(f => f.name === fileName)
                const file = this.fileList[index]
                if (!file) return
                if (typeof key === 'string') {
                    file[key] = value
                } else {
                    for (let k in key) {
                        file[k] = key[key]
                    }
                }
                this.$set(this.fileList, index, file)
            },

            //获取文件MD5值
            get_filemd5sum(file) {
                /*let tmp_md5 = "";
                let {splitUpload} = this;
                if (file) {
                    let fileReader = new FileReader();
                    fileReader.readAsBinaryString(file);
                    fileReader.onload = function (e) {
                        tmp_md5 = md5(e.target.result);
                        //console.log(file.name + "的MD5值是：" + tmp_md5);
                        splitUpload(file,tmp_md5);
                    };
                }*/


                return new Promise((resolve, reject) => {
                    try {
                        let tmp_md5 = "";
                        if (file) {
                            let fileReader = new FileReader();
                            let RES = function (v) {
                                return resolve(v);
                            };
                            fileReader.readAsBinaryString(file);
                            fileReader.onload = function (e) {
                                tmp_md5 = md5(e.target.result);
                                RES(tmp_md5);
                            };
                        }

                    } catch (e) {
                        reject(new Error('获取MD5失败'))
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped>

    .upload {
        width: 100%;
        height: 100%;

        &-main {
            position: relative;
            display: inline-block;

            input[type="file"] {
                width: 200%;
                height: 100%;
                position: absolute;
                z-index: 1;
                left: -100%;
                top: 0;
                opacity: 0;
                cursor: pointer;
            }

            .btn {
                text-align: center;
            }
        }

        &-list {
            list-style: none;
            padding: 10px;

            li {
                padding: 10px 0;
                display: flex;
                align-items: center;
                position: relative;

                img {
                    width: 40px;
                    height: 40px;
                }

                label {
                    padding-left: 10px;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
                }

                span {
                    padding-right: 20px;
                    height: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: transform .3s;

                    .icon {
                        content: '';
                        position: absolute;
                        top: 2px;
                        right: 4px;
                        width: 2px;
                        height: 12px;
                        background: #cccccc;
                    }

                    &:before {

                        transform: rotate(45deg);
                    }

                    &:after {

                        transform: rotate(-45deg);
                    }

                    &:hover {
                        transform: scale(1.2);
                    }

                    &.error {
                        color: #ed4014;
                    }

                    &.success {
                        color: #19be6b;
                    }
                }

                i {
                    position: absolute;
                    bottom: 4px;
                    left: 0;
                    display: block;
                    height: 5px;
                    border-radius: 5px;
                    transition: all .3s;
                    opacity: .8;
                    background: #2D8cF0;

                    &.error {
                        background: #ed4014;
                    }

                    &.success {
                        background: #19be6b;
                    }
                }
            }
        }

        .select-btn {
            display: inline-block;
            width: 90px;
            height: 32px;
            line-height: 32px;
            text-align: center;
        }

        .upload-btn {
            width: 100%;
            padding: 7px 10px;
        }

        .upload-btn, .select-btn {
            border-radius: 4px;
            cursor: pointer;
            background-color: #344dee;
            color: #FFFFFF;

            &:hover {
                background-color: #5066f3;
            }

            &:active {
                background-color: #5066f3;
            }
        }
    }

    .loadingBtn {
        background: #00c185;
        width: 100%;
        padding: 5px;
        border: 0;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }

    .uploadBody {
        text-align: right;
    }
</style>
