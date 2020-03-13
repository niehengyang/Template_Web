<template>
    <div>
        <el-form class="device-form" :model="editForm" ref="editForm" :rules="createFormRules" label-position="right" label-width="140px"
                 v-loading="editLoading"
        >
            <el-form-item :label="$t('lang.word-type')" prop="type" >
                <el-select size="medium" v-model="editForm.type" :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in typeArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.faultCode')" prop="faultcode" >
                <el-select size="medium"
                           v-model="editForm.faultcode"
                           @visible-change="getFault"
                           :loading="faultLoading"
                           :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in faultArray" :key="item.id" :label="item.code" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isShow" :label="$t('lang.data-deviceType')" prop="dt_id">
                <type-select v-model="editForm.dt_id"></type-select>
            </el-form-item>
            <el-form-item :label="$t('lang.download-allot')" prop="download">
                <el-cascader
                        :options="options"
                        :props="{ multiple: true}"
                        v-model="editForm.admin_ids"
                        clearable></el-cascader>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog('editForm')" :disabled="editLoading?true:false">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="edit('editForm')" :disabled="editLoading?true:false">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        props: ['editData', 'options'],
        data(){
            return {
                editForm: {},
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
                editLoading: false,
                typeArray: [
                    {label: this.$t('lang.air-data'), value: '2'},
                    {label: this.$t('lang.internal-data'), value: '1'}
                ],
                noUploadDoc: false,
                fileList: [],
                faultArray: [],
                allotData: [],
                faultLoading: false,

            }
        },
        created(){
            this.initEdit()
        },
        watch: {
            editData(){
                this.initEdit()
            }
        },
        computed: {
            isShow: function () {
                return this.editData.type === '2' ? true : false
            }
        },
        components: {

        },
        methods: {
            //初始化编辑数据
            initEdit(){
                //console.log(this.editData)
                this.allotData = []
                this.editLoading = true
                this.$api.restfulApi.item('faultfile', this.editData.id).then(res => {
                    console.log('我是res',res)
                    res.xmbadmins.salesManager.forEach(item => {
                        this.allotData.push(['1', item])
                    })
                    res.xmbadmins.systemChigo.forEach(item => {
                        this.allotData.push(['0', item])
                    })
                    this.editForm = this.editData
                    this.editForm.admin_ids = this.allotData
                    this.editLoading = false
                    //console.log('allotData', this.allotData)
                }).catch(err => {
                    this.editLoading = false
                })
            },
            closeDialog(formName){
                this.$emit('closeEdit')
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
            //编辑
            edit() {
                let allotArray = []
                this.editForm.admin_ids.forEach(item => {
                    if(item.length > 1){
                        allotArray.push(item[1])
                    }else{
                        allotArray.push(item[0])
                    }
                })
                this.editForm.admin_ids = allotArray
                this.$refs.editForm.validate(valid => {
                    if (!valid) return;
                    this.editLoading = true;
                    this.$api.restfulApi
                        .edit("faultfile", this.editForm.id, this.editForm)
                        .then(res => {
                            this.$message.success(this.$t('lang.edit-success'));
                            this.editLoading = false;
                            this.$emit("handleEdit");
                        }).catch(err => {
                            this.editLoading = false
                    })
                });
            },
            //文件上传成功
            upSuccess(files) {
                console.log(files)
                let res = files[0].response;
                this.editForm.name = res.file_name;
                this.editForm.original_name = res.file_originalname;
                this.editForm.file_type = res.file_type
                this.editForm.file_path = res.file_path
            },
            //文件上传失败
            upError() {
                this.editForm.name = ''
                this.editForm.original_name = ''
                this.editForm.file_type = ''
                this.editForm.file_path = ''
            },
            //文件移除
            upRemove() {
                this.editForm.name = ''
                this.editForm.original_name = ''
                this.editForm.file_type = ''
                this.editForm.file_path = ''
            }
        }
    }
</script>

<style scoped>

</style>