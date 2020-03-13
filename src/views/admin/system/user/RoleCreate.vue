<template>
    <div>
        <el-form class="device-form" :model="createForm" ref="createForm" :rules="createFormRules" label-position="right" label-width="100px"
                 v-loading="dialogAddLoading"
        >
            <el-form-item :label="$t('lang.role-name')" prop="name">
                <el-input size="medium"
                          v-model="createForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-roleName')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.role-desc')" prop="describe" maxlength="200">
                <el-input size="medium"
                          type="textarea"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          v-model="createForm.describe"
                          :placeholder="$t('lang.hint-roleDes')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.role-right')" prop="role_permission">
                <el-cascader
                        size="medium"
                        :placeholder="$t('lang.hint-roleLimit')"
                        v-model="createForm.role_permission"
                        :options="options"
                        :props="{ multiple: true}"
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
                    name: [
                        {required: true, message: this.$t('lang.hint-rolename'), trigger: "blur"},
                        { max: 20, message: this.$t('lang.long-rolename'), trigger: 'blur' }
                    ],
                    describe: [
                        {required: false, max: 200, message: this.$t('lang.long-descript'), trigger: 'blur'},
                    ]
                },
                dialogAddLoading: false,
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
                }]
            }
        },
        components: {

        },
        created() {
            console.log(__permission_list__)
        },
        methods: {
            closeDialog(formName){
                this.resetForm(formName)
                this.$emit('closeCreate')
            },
            //创建
            create() {
                console.log(this.createForm)
                let roleArray = []
                this.createForm.role_permission.forEach(item => {
                    if(item.length > 1){
                        roleArray.push(item[1])
                    }else{
                        roleArray.push(item[0])
                    }
                })
                // console.log(roleArray)
                this.createForm.role_permission = roleArray
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("role", this.createForm).then(() => {
                        this.$message.success(this.$t('lang.add-success'));
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>