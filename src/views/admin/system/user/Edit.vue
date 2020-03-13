<template>
    <div> <!-- 用户添加 dialog弹窗 + form表单 -->
        <el-form
                class="device-form"
                :model="editForm"
                ref="editForm"
                :rules="editFormRules"
                label-position="right"
                label-width="100px"
                v-loading="dialogEditLoading"
        >
            <el-form-item v-if="loginType != userType.AirConUser" :label="$t('lang.user-level')" prop="type">
                <el-select v-model="editForm.type" :placeholder="$t('lang.hint-Ulevel')" size="medium">
                    <el-option v-if="loginType == userType.SystemChigo" value="1" :label="$t('lang.system')"></el-option>
                    <el-option v-if="loginType == userType.SalesManager" value="2" :label="$t('lang.customer-manager')"></el-option>
                    <el-option v-if="item.value > loginType" v-for="item in typeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="editForm.type == userType.SystemChigo" :label="$t('lang.role')">
                <el-select v-model="editForm.role_id" @visible-change="handleRoleSelect" :placeholder="$t('lang.hint-Urole')" size="medium">
                    <el-option v-for="item in roleOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="loginType != userType.AirConUser" :label="$t('lang.area')" prop="area_id">
                <el-select size="medium" v-model="editForm.area_name" :placeholder="$t('lang.hint-area')" @visible-change="getArea" :loading="areaLoading">
                    <el-tree default-expand-all :data="areaArray" :props="props" node-key="id" :expand-on-click-node="false" @node-click="selectChange">
                        <template slot-scope="{ node, data }">
                            <el-option :label="node.label" :value="data.id"></el-option>
                        </template>
                    </el-tree>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('lang.user-name')" prop="username">
                <el-input size="medium"
                          v-model="editForm.username"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-Uname')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('lang.user-account')" prop="loginname">
                <el-input size="medium"
                          v-model="editForm.loginname"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.login-account')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('lang.cellphone')" prop="cellphone">
                <el-input size="medium"
                          v-model="editForm.cellphone"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-phone')"></el-input>
            </el-form-item>

            <el-form-item v-if="editForm.type == userType.Repairman" :label="$t('lang.service-life')" prop="valid_days">
                <el-select size="medium" v-model="editForm.valid_days" :placeholder="$t('lang.hint-life')">
                    <el-option v-for="item in serviceLife" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('lang.email')" prop="email">
                <el-input size="medium"
                          v-model="editForm.email"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-email')"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeEdit('editForm')" :disabled="dialogEditLoading">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="edit()" :disabled="dialogEditLoading">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['editData'],
        data() {
            return {
                editForm: {},
                editFormRules: {
                    type: [
                        {required: true, message: this.$t('lang.select-level'), trigger: 'change'}
                    ],
                    area_name: [
                        {required: true, message: this.$t('lang.hint-area'), trigger: 'change'}
                    ],
                    username: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 50, message: this.$t('lang.long-username'), trigger: "blur"}
                    ],
                    loginname: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 20, message: this.$t('lang.long-loginname'), trigger: "blur"}
                    ],
                    cellphone: [
                        {required: true, validator: validatePhone, trigger: "blur"}
                    ],
                    valid_days: [
                        {required: true, message: this.$t('lang.hint-date'), trigger: "change"}
                    ],
                    email: [
                        { required: false, type: 'email', message: this.$t('lang.email-address'), trigger: 'blur' }
                    ]
                },
                dialogEditLoading: false,
                typeOptions: [
                    //{label: this.$t('lang.super-admin'), value: '0'},
                    {label: this.$t('lang.system'), value: '1'},
                    {label: this.$t('lang.customer-manager'), value: '2'},
                    {label: this.$t('lang.serviceman'), value: '3'},
                    {label: this.$t('lang.client'), value: '4'}
                ],
                roleOptions: [
                    {label: this.$t('lang.admin'), value: '0'},
                    {label: this.$t('lang.artisan'), value: '-1'}
                ],
                serviceLife: [
                    {label: this.$t('lang.hebdomad'), value: '7'},
                    {label: this.$t('lang.half-month'), value: '15'},
                    {label: this.$t('lang.one-month'), value: '30'}
                ],
                areaArray: [],
                areaLoading: false,
                props: {
                    id: "id",
                    label: "name",
                    children: 'children',
                },
            }
        },
        created(){
            console.log(this.editData)
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
                this.editForm = this.editData
                if(this.editData.role_id == 0){
                    this.editForm.role_id = this.$t('lang.admin')
                }
                if(this.editData.role_id == -1){
                    this.editForm.role_id = this.$t('lang.artisan')
                }
                if(this.editData.type == 0){
                    this.editForm.type = this.$t('lang.super-admin')
                }
            },
            //编辑
            edit() {
                this.$refs.editForm.validate(valid => {
                    if (!valid) return;
                    this.dialogEditLoading = true;
                    this.$api.restfulApi
                        .edit("admin", this.editForm.id, this.editForm)
                        .then(res => {
                            this.$message.success(this.$t('lang.edit-success'));
                            this.dialogEditLoading = false;
                            this.$emit("edit");
                        }).catch(err => {
                        this.dialogEditLoading = false;
                    })
                });
            },
            //获取管理域
            getArea(){
                this.areaLoading = true
                this.$api.restfulApi.list('area').then(res => {
                    console.log(res)
                    this.areaArray = res.data
                    this.areaLoading = false
                }).catch(err => {
                    this.areaLoading = false
                })
            },
            //点击树节点
            selectChange(data, node, self){
                console.log(data)
            },
            //关闭弹窗
            closeEdit(formName){
                this.resetForm(formName)
                this.$emit('closeEdit')
            },
            handleRoleSelect(){

            },
        },
    }
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>