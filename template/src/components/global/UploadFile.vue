<template>
    <div>
        <el-upload
            class="dev-upload"
            :action="image?'/api/fileop/image':'/api/fileop/doc'"
            :headers="{'X-Requested-With': 'XMLHttpRequest', 'authorization': token}"
            :before-remove="beforeUpRemove"
            name="file"
            :limit="limit"
            :multiple="multiple?true:false"
            :on-exceed="handleUpExceed"
            :on-success="handleUpSuccess"
            :on-error="handleUpError"
            :on-remove="handleUpRemove"
            :file-list="fileList"
            :accept="accept"
        >
            <el-button
                v-if="mustUpload"
                size="small"
                icon="el-icon-upload2"
                :style="noUploadDoc?'border-color:#f56c6c':''"
            >{{$t('lang.word-upload')}}</el-button>
            <el-button v-if="!mustUpload" size="small" icon="el-icon-upload2">{{$t('lang.word-upload')}}</el-button>
            <div slot="tip" class="el-upload__tip">{{tip}}</div>
            <span class="error" v-show="mustUpload?noUploadDoc:false">{{$t('lang.hint-upload')}}</span>
            <!-- <span class="must" v-if="mustUpload">*</span> -->
        </el-upload>
    </div>
</template>

<script>
import tokenFactory from '@/utils/tokenfactory'
export default {
    /** mustUpload:必须上传文件时设为`true`;同时设置noUpload 用来判断是否上传成功
     *  noUpload 在父组件中关闭弹窗时要设为false,做校验时根据对应字段是否有值进行设置
     * limit 文件上传的最大个数
     * fileNum 在父组件中关闭弹窗时设为空数组
     * accept 可上传的文件类型
     * tip 上传按钮下的提示信息
     * image 上传文件视频：action="/api/upload/doc"；上传图片：action="/api/upload/doc"
     */
    props: [
        "mustUpload",
        "noUpload",
        "limit",
        "fileNum",
        "accept",
        "tip",
        "multiple",
        "image"
    ],
    mounted(){
        this.token = tokenFactory.getToken()
    },
    data() {
        return {
            noUploadDoc: false,
            fileList: [],
            token:""
        };
    },
    watch: {
        noUpload: function(newVal, oldVal) {
            this.noUploadDoc = newVal;
        },
        fileNum: function(newVal, oldVal) {
            this.fileList = [];
        }
    },
    created() {},
    methods: {
        //文件上传成功
        handleUpSuccess(res, file, fileList) {
            this.noUploadDoc = false;
            this.$emit("up-success", fileList);
        },
        //文件上传失败
        handleUpError(err, file, fileList) {
            this.$message.warning(this.$t('lang.upload-fail'));
            this.noUploadDoc = true;
            this.$emit("up-error", fileList);
        },
        //移除文件
        handleUpRemove(file, fileList) {
            this.noUploadDoc = true;
            this.$emit("up-remove", fileList);
        },
        //文件超出个数限制
        handleUpExceed(files, fileList) {
            this.$message.warning(
                this.$t('lang.limit-fileNum')+`${this.limit}，`+this.$t('lang.current-fileNum')+ `${
                    files.length
                } ，`+this.$t('lang.all-fileNum')+`${files.length + fileList.length} `
            );
        },
        //删除文件之前
        beforeUpRemove(file, fileList) {
            return this.$confirm(this.$t('lang.sure-remove')+ `${file.name}？`);
        }
    }
};
</script>

<style lang="scss">
.dev-upload {
    position: relative;
    .el-upload {
        width: 280px;
        .error {
            position: absolute;
            top: 42px;
            left: 0;
            color: #f56c6c;
            font-size: 12px;
            line-height: 1;
        }
        .must {
            position: absolute;
            color: #f56c6c;
            left: -80px;
            top: 0;
            font-size: 14px;
            font-weight: 700;
        }
        .el-button {
            width: 100%;
        }
    }
}
</style>


