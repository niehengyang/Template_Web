<template>
    <div> <!-- 用户添加 dialog弹窗 + form表单 -->
        <el-form
                class="device-form"
                :model="createForm"
                ref="createForm"
                :rules="createFormRules"
                label-position="right"
                label-width="100px"
                v-loading="dialogAddLoading"
        >

            <el-form-item v-if="loginType != userType.AirConUser" :label="$t('lang.user-level')" prop="type">
                <el-select v-model="createForm.type" @change="handleChange('type')" :placeholder="$t('lang.hint-Ulevel')" size="medium">
                    <el-option v-if="loginType == userType.SystemChigo" value="1" :label="$t('lang.system')"></el-option>
                    <el-option v-if="loginType == userType.SalesManager" value="2" :label="$t('lang.customer-manager')"></el-option>
                    <el-option v-if="item.value > loginType" v-for="item in typeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="createForm.type == userType.SystemChigo" :label="$t('lang.role')">
                <el-select v-model="createForm.role_id" @visible-change="handleRoleSelect" :placeholder="$t('lang.hint-Urole')" size="medium">
                    <el-option v-for="item in roleOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="loginType != userType.AirConUser" :label="$t('lang.area')" prop="area_id">
                <el-select size="medium" v-model="createForm.area_id" :placeholder="$t('lang.hint-area')" @visible-change="getArea" :loading="areaLoading">
                    <el-tree default-expand-all :data="areaArray" :props="props" node-key="id" :expand-on-click-node="false" @node-click="selectChange">
                        <template slot-scope="{ node, data }">
                            <el-option :label="node.label" :value="data.id"></el-option>
                        </template>
                    </el-tree>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('lang.user-name')" prop="username">
                <el-input size="medium"
                          v-model="createForm.username"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-Uname')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('lang.user-account')" prop="loginname">
                <el-input size="medium"
                          v-model="createForm.loginname"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.login-account')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('lang.cellphone')" prop="cellphone">
                <el-input size="medium"
                          v-model="createForm.cellphone"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-phone')"></el-input>
            </el-form-item>

            <el-form-item v-if="createForm.type == userType.Repairman" :label="$t('lang.service-life')" prop="valid_days">
                <el-select size="medium" v-model="createForm.valid_days" :placeholder="$t('lang.hint-life')">
                    <el-option v-for="item in serviceLife" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('lang.password')" prop="password">
                <el-input
                        size="medium"
                        type="password"
                        v-model="createForm.password"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        show-password
                        :placeholder="$t('lang.hint-password')"
                ></el-input>
            </el-form-item>

            <el-form-item :label="$t('lang.email')" prop="email">
                <el-input size="medium"
                          v-model="createForm.email"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-email')"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="dialogClose('createForm')" :disabled="dialogAddLoading">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="createFormSubmit" :disabled="dialogAddLoading">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            dialogVisible: Boolean
        },
        data() {
            return {
                createForm: {
                    role_id: '0'  //默认创建角色管理员
                },
                ruleSelectLoad: false,
                createFormRules: {
                    type: [
                        {required: true, message: this.$t('lang.select-level'), trigger: 'change'}
                    ],
                    area_id: [
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
                    password: [
                        {required: true, validator: validatePassword, trigger: "blur"}
                    ],
                    valid_days: [
                        {required: true, message: this.$t('lang.hint-date'), trigger: "change"}
                    ],
                    email: [
                        { required: false, type: 'email', message: this.$t('lang.email-address'), trigger: 'blur' }
                    ]
                },
                dealerLoading: false,
                //areaOptions: [],
                dialogAddLoading: false,
                typeOptions: [
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
        methods: {
            //创建用户
            createFormSubmit() {
                this.$refs.createForm.validate((valid) => {
                    if(!valid) return;
                    if(this.loginType == this.userType.AirConUser){
                        this.createForm.type = this.loginType;
                        this.createForm.area_id = this.loginUser.area_id;
                    }

                    this.dialogAddLoading = true
                    this.$api.restfulApi.create(
                        "admin",
                        this.createForm
                    ).then((res) => {
                        this.$message.success(this.$t('lang.add-success'));
                        this.dialogAddLoading = false
                        this.resetForm('createForm')
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                });
            },
            //获取角色列表
            handleRoleSelect(){
                
            },
            //点击树节点
            selectChange(data, node, self){
                console.log(data)
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

            handleChange(val){
                if(val == 'type'){
                    this.createForm.role_id == 0;
                }
            },

            //关闭弹窗
            dialogClose(formName){
                this.resetForm(formName)
                this.$emit('closeCreate')
            },

        },
        components: {
        }
    }
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>