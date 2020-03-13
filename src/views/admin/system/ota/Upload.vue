<template>
    <div>
        <el-form
                :model="createForm"
                ref="createForm"
                :rules="createFormRules"
                label-position="right"
                label-width="110px"
                v-loading="dialogAddLoading">
            <el-form-item :label="$t('lang.firmware-name')" prop="name">
                <el-input size="medium"
                          v-model="createForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-firmware')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.firmware-version')" prop="version">
                <el-input size="medium"
                          v-model="createForm.version"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-firmwareVersion')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.file-chicked')" prop="verify_type">
                <el-select v-model="createForm.verify_type"
                           :placeholder="$t('lang.hint-fileChicked')"
                           size="medium">
                    <el-option v-for="item in methodOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.file-code')" prop="verify_code">
                <el-input size="medium"
                          v-model="createForm.verify_code"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-checkCode')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.upload-ota')" prop="upload">
                <upload-file
                        :limit="1"
                        :must-upload="true"
                        :noUpload="noUploadDoc"
                        :fileNum="fileList"
                        :tip="$t('lang.ota-tip')"
                        @up-success="upSuccess"
                        @up-error="upError"
                        @up-remove="upRemove"
                ></upload-file>
            </el-form-item>
            <el-form-item :label="$t('lang.firmware-describe')" prop="describe" maxlength="200">
                <el-input size="medium"
                          type="textarea"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          v-model="createForm.desc"
                          :placeholder="$t('lang.hint-upgradeContent')"></el-input>
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
        name: "Upload",
        data(){
            return {
                createForm: {},
                createFormRules: {
                    name: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        { max: 20, message: this.$t('lang.long-otaName'), trigger: 'blur' }
                    ],
                    version: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        { max: 20, message: this.$t('lang.long-otaVersion'), trigger: 'blur' }
                    ],
                    verify_type: [
                        {required: true, message: this.$t('lang.hint-method'), trigger: 'change'}
                    ],
                    verify_code: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        { max: 100, message: this.$t('lang.long-checkCode'), trigger: 'blur' }
                    ]
                },
                dialogAddLoading: false,
                methodOptions: [
                    {label: 'MD5', value: 'md5'},
                    {label: 'SHA256', value: 'sha256'}
                ],
                noUploadDoc: false,
                fileList: [],
            }
        },
        methods: {
            closeDialog(formName){
                this.resetForm(formName)
                this.$emit('closeCreate')
            },
            create(){
                console.log('create',this.createForm)
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("ota", this.createForm).then(() => {
                        this.$message.success(this.$t('lang.version-success'));
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                })
            },
            //文件上传成功
            upSuccess(files) {
                console.log(files)
                let res = files[0].response;
                this.createForm.file_name = res.file_name;
                this.createForm.original_name = res.file_originalname;
                this.createForm.file_type = res.file_type
                this.createForm.file_url = res.file_path
            },
            //文件上传失败
            upError() {
                this.createForm.file_name = ''
                this.createForm.original_name = ''
                this.createForm.file_type = ''
                this.createForm.file_url = ''
            },
            //文件移除
            upRemove(file) {
                // let params = {filePath: this.createForm.file_path}
                // this.$api.restfulApi.post('devicefile/removeupfile', params).then(() => {
                //     console.log('文件移除成功')
                // })
                this.createForm.file_name = ''
                this.createForm.original_name = ''
                this.createForm.file_type = ''
                this.createForm.file_url = ''
            }
        }
    }
</script>

<style scoped>

</style>