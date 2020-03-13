<template>
    <div>
        <el-form class="device-form" :model="createForm" ref="createForm" :rules="createFormRules" label-position="right" label-width="100px"
                 v-loading="dialogAddLoading"
        >
            <el-form-item :label="$t('lang.version-num')" prop="version">
                <el-input size="medium"
                          v-model="createForm.version"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-Vnum')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.version-name')" prop="name">
                <el-input size="medium"
                          v-model="createForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-vername')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.renew-site')" >
                <upload-file
                        :limit="1"
                        :must-upload="true"
                        :noUpload="noUploadDoc"
                        :fileNum="fileList"
                        @up-success="upSuccess"
                        @up-error="upError"
                        @up-remove="upRemove"
                ></upload-file>
<!--                <el-input size="medium" v-model="createForm.url" :placeholder="$t('lang.hint-Vsite')"></el-input>-->
            </el-form-item>
            <el-form-item :label="$t('lang.renew-con')" prop="update">
                <el-input type="textarea"
                          size="medium"
                          v-model="createForm.update"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-Vcon')"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog('createForm')" :disabled="dialogAddLoading?true:false">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="create()" :disabled="dialogAddLoading?true:false">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        data(){
            return {
                createForm: {},
                createFormRules: {
                    version: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 10, message: this.$t('lang.long-version'), trigger: "blur"}
                    ],
                    name: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 20, message: this.$t('lang.long-vername'), trigger: "blur"}
                    ],
                    update: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 200, message: this.$t('lang.long-update'), trigger: "blur"}
                    ],
                },
                dialogAddLoading: false,
                noUploadDoc: false,
                fileList: [],
            }
        },
        components: {

        },
        methods: {
            closeDialog(formName){
                this.fileList=[];
                this.resetForm(formName)
                this.$emit('closeCreate')
            },
            //创建
            create() {
                if(this.createForm.file_type!="apk"){
                    this.$message.error(this.$t("lang.hint-apk"));
                    return;
                }else{
                   this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("android", this.createForm).then(() => {
                        this.$message.success(this.$t("lang.add-success"));
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                }); 
                }
                
            },
            //文件上传成功
            upSuccess(files) {
                console.log(files)
                 let res = files[0].response;
                this.createForm.original_name = res.file_originalname;
                this.createForm.file_path = res.file_path;
                this.createForm.file_type = res.file_type
            },
            //文件上传失败
            upError() {
                this.createForm.original_name = ''
                this.createForm.file_path = ''
                this.createForm.file_type = ''
            },
            //文件移除
            upRemove(file) {
                this.createForm.original_name = ''
                this.createForm.file_path = ''
                this.createForm.file_type = ''

            }
        }
    }
</script>

<style scoped>

</style>