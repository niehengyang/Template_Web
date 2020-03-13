<template>
    <div>
        <el-form class="device-form" :model="createForm" ref="createForm" :rules="createFormRules" label-position="right" label-width="140px"
                 v-loading="dialogAddLoading"
        >

            <el-form-item :label="$t('lang.word-type')" prop="type" >
                <el-select size="medium" v-model="createForm.type" :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in typeArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.faultCode')" prop="faultcode" >
                <el-select size="medium"
                           @visible-change="getFault"
                           :loading="faultLoading"
                           v-model="createForm.faultcode"
                           :placeholder="$t('lang.hint-faultCode')">
                    <el-option v-for="item in faultArray" :key="item.id" :label="item.code" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isShow" :label="$t('lang.data-deviceType')" prop="dt_id">
                <type-select v-model="createForm.dt_id"></type-select>
            </el-form-item>
            <el-form-item :label="$t('lang.word-upload')" prop="upload">
                <upload-file
                        :limit="1"
                        :must-upload="true"
                        :noUpload="noUploadDoc"
                        :fileNum="fileList"
                        :tip="$t('lang.tip-upload')"
                        @up-success="upSuccess"
                        @up-error="upError"
                        @up-remove="upRemove"
                ></upload-file>
            </el-form-item>
            <el-form-item :label="$t('lang.download-allot')" prop="download">
                <el-cascader
                        :options="options"
                        :props="{ multiple: true}"
                        @visible-change="getAllot"
                        :loading="allotLoading"
                        v-model="createForm.admin_ids"
                        :disabled="!createForm.type"
                        clearable></el-cascader>
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
                    type: [
                        {required: true, message: this.$t('lang.hint-type'), trigger: "blur"}
                    ],
                    dt_id: [
                        {required: true, message: this.$t('lang.hint-deviceType'), trigger: "blur"}
                    ],
                    faultcode: [
                        { required: true, message: this.$t('lang.hint-faultCode'), trigger: 'change' }
                    ]
                },
                dialogAddLoading: false,
                typeArray: [
                    {label: this.$t('lang.air-data'), value: '2'},
                    {label: this.$t('lang.internal-data'), value: '1'}
                ],
                noUploadDoc: false,
                fileList: [],
                options: [{
                    value: '0',
                    label: this.$t('lang.vendor'),
                    children: []
                }, {
                    value: '1',
                    label: this.$t('lang.customer-manager'),
                    children: []
                }],
                allotLoading: false,
                faultLoading: false,
                faultArray: []
            }
        },
        computed: {
            isShow: function () {
                return this.createForm.type === '2' ? true : false
            }
        },
        components: {

        },
        methods: {
            closeDialog(formName){
                this.resetForm(formName)
                this.$emit('closeCreate')
            },
            //创建
            create() {
                console.log(this.createForm)
                let adminArray = []
                this.createForm.admin_ids.forEach(item => {
                    if(item.length > 1){
                        adminArray.push(item[1])
                    }else{
                        adminArray.push(item[0])
                    }
                })
                this.createForm.admin_ids = adminArray
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("faultfile", this.createForm).then(() => {
                        this.$message.success(this.$t('lang.add-success'));
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                });
            },
            // 获取权限列表
            getAllot(){
                this.options[0].children = []
                this.options[1].children = []
                this.allotLoading = true
                let params = {
                    type: this.createForm.type,
                    deviceType: this.createForm.dt_id
                }
                this.$api.restfulApi.list('faultfile/filepermission', params).then(res => {
                    console.log(res)
                    res.systemChigo.forEach(item => {
                        this.options[0].children.push({value: item.id, label: item.loginname})
                    })
                    res.salesManager.forEach(item => {
                        this.options[1].children.push({value: item.id, label: item.loginname})
                    })
                })
            },
            // 获取故障代码
            getFault(){
                this.faultLoading = true
                this.$api.restfulApi.list('faultcode').then(res => {
                    console.log(res)
                    this.faultArray = res.data
                    this.faultLoading = false
                }).catch(err => {
                    this.faultLoading = false
                })
            },
            //文件上传成功
            upSuccess(files) {
                console.log(files)
                let res = files[0].response;
                this.createForm.name = res.file_name;
                this.createForm.original_name = res.file_originalname;
                this.createForm.file_type = res.file_type
                this.createForm.file_path = res.file_path
            },
            //文件上传失败
            upError() {
                this.createForm.name = ''
                this.createForm.original_name = ''
                this.createForm.file_type = ''
                this.createForm.file_path = ''
            },
            //文件移除
            upRemove(file) {
                let params = {filePath: this.createForm.file_path}
                this.$api.restfulApi.post('devicefile/removeupfile', params).then(() => {})
                this.createForm.name = ''
                this.createForm.original_name = ''
                this.createForm.file_type = ''
                this.createForm.file_path = ''

            }
        }
    }
</script>

<style scoped>

</style>