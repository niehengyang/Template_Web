<template>
    <div>
        <el-form class="device-form" :model="editForm" ref="editForm" :rules="editFormRules" label-position="right" label-width="100px"
                 v-loading="dialogEditLoading"
        >
            <el-form-item :label="$t('lang.role-name')" prop="name">
                <el-input size="medium"
                          v-model="editForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-roleName')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.role-desc')" prop="describe" maxlength="200">
                <el-input size="medium"
                          type="textarea"
                          v-model="editForm.describe"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-roleDes')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.role-right')" prop="role_based">
                <el-cascader
                        size="medium"
                        :placeholder="$t('lang.hint-roleLimit')"
                        v-model="editForm.selectData"
                        :options="options"
                        :props="{ multiple: true}"
                        clearable></el-cascader>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog('editForm')" :disabled="dialogEditLoading?true:false">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="edit()" :disabled="dialogEditLoading?true:false">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        props: ['editData'],
        data(){
            return {
                editForm: {
                    selectData: []
                },
                editFormRules: {
                    name: [
                        {required: true, message: this.$t('lang.hint-rolename'), trigger: "blur"},
                        { max: 20, message: this.$t('lang.long-rolename'), trigger: 'blur' }
                    ],
                    describe: [
                        {required: false, max: 200, message: this.$t('lang.long-descript'), trigger: 'blur'},
                    ]
                },
                dialogEditLoading: false,
                options: [{
                    value: '1',
                    label: this.$t('lang.home'),
                }, {
                    value: '2',
                    label: this.$t('lang.device-manage'),
                    children: [
                        {value: '7', label: this.$t('lang.device-list')},
                        {value: '8', label: this.$t('lang.device-type')},
                        {value: '9', label: this.$t('lang.device-group')}
                    ]
                }, {
                    value: '4',
                    label: this.$t('lang.alarm-fault'),
                    children: [{
                        value: '17',
                        label: this.$t('lang.fault-alarm')
                    }, {
                        value: '18',
                        label: this.$t('lang.alarm-rule')
                    }]
                },{
                    value: '6',
                    label: this.$t('lang.knowledge'),
                    children: [{
                        value: '21',
                        label: this.$t('lang.device-data')
                    },{
                        value: '22',
                        label: this.$t('lang.fault-data')
                    }]
                },{
                    value: '5',
                    label: this.$t('lang.data-analyst'),
                    children: [{
                        value: '19',
                        label: this.$t('lang.user-stats')
                    },{
                        value: '20',
                        label: this.$t('lang.air-stats')
                    }]
                },{
                    value: '3',
                    label: this.$t('lang.MSconfig'),
                    children: [{
                        value: '10',
                        label: this.$t('lang.users-manage')
                    },{
                        value: '13',
                        label: this.$t('lang.message-center')
                    },{
                        value: '14',
                        label: this.$t('lang.syslog')
                    },{
                        value: '15',
                        label: this.$t('lang.version-manage')
                    },{
                        value: '16',
                        label: this.$t('lang.small-tools')
                    },{
                        value: '11',
                        label: this.$t('lang.role-manage')
                    },{
                        value: '12',
                        label: this.$t('lang.area')
                    }]
                }],
                selectValue: []
            }
        },
        components: {

        },
        created(){
            this.initEdit()
        },
        watch: {
            editData(){
                this.initEdit()
            }
        },
        methods: {
            //初始化编辑数据
            initEdit(){
                console.log(this.editData)
                this.selectValue = []
                this.editData.permissions.forEach(item => {
                    if(item.parent == 'root'){
                        this.selectValue.push(item.id.toString())
                    }else if(item.parent == 'device'){
                        this.selectValue.push(['2', item.id.toString()])
                    }else if(item.parent == 'data'){
                        this.selectValue.push(['5', item.id.toString()])
                    }else if(item.parent == 'alarm'){
                        this.selectValue.push(['4', item.id.toString()])
                    }else if(item.parent == 'knowledge'){
                        this.selectValue.push(['6', item.id.toString()])
                    }else if(item.parent == 'system'){
                        this.selectValue.push(['3', item.id.toString()])
                    }
                })
                this.editForm = this.editData
                this.editForm.selectData = this.selectValue
                console.log(this.selectValue)
            },
            //编辑
            edit() {
                console.log(this.editForm)
                this.selectValue = this.editForm.selectData
                let roleArray = []
                this.editForm.selectData.forEach(item => {
                    if(item.length > 1){
                        roleArray.push(item[1])
                    }else{
                        roleArray.push(item[0])
                    }
                })
                this.editForm.permissions = roleArray
                this.$refs.editForm.validate(valid => {
                    if (!valid) return;
                    this.dialogEditLoading = true;
                    this.$api.restfulApi
                        .edit("role", this.editForm.id, this.editForm)
                        .then(res => {
                            this.$message.success(this.$t('lang.edit-success'));
                            this.dialogEditLoading = false;
                            this.$emit("edit");
                        }).catch(err => {
                            this.dialogEditLoading = false
                    })
                });
            },
            //关闭弹窗
            closeDialog(formName){
                this.resetForm(formName)
                this.$emit('closeEdit')
            },
        }
    }
</script>

<style scoped>

</style>