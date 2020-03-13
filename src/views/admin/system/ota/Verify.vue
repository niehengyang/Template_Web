<template>
    <div>
        <p class="tip">
            {{$t('lang.verify-tip')}}
        </p>
        <el-form
                :model="createForm"
                ref="createForm"
                :rules="createFormRules"
                label-position="right"
                label-width="152px"
                v-loading="dialogAddLoading">
            <el-form-item :label="$t('lang.firmware-name')" prop="name">
                <el-input size="medium"
                          disabled
                          v-model="createForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-firmware')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.firmware-version')" prop="version">
                <el-input size="medium"
                          disabled
                          v-model="createForm.version"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-firmwareVersion')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.upgrade-serial')" prop="gateway_ids">
                <el-select v-model="createForm.gateway_ids"
                           filterable
                           remote
                           :placeholder="$t('lang.hint-serialno')"
                           multiple
                           reserve-keyword
                           :remote-method="remoteMethod"
                           :loading="loading"
                           size="medium">
                    <el-option v-for="item in serialOption" :key="item.id" :value="item.id" :label="item.mac"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog()" :disabled="dialogAddLoading?true:false">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="create()" :disabled="dialogAddLoading?true:false">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        props: ['verifyData'],
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
                    gateway_ids: [
                        {required: true, message: this.$t('lang.hint-serial'), trigger: 'blur'}
                    ]
                },
                dialogAddLoading: false,
                loading: false,
                serialOption: [],
                list: []
            }
        },
        watch: {
            verifyData(){
                this.initData()
            }
        },
        created(){
            this.initData()
        },
        methods: {
            //初始化表单数据
            initData(){
                this.createForm = this.verifyData
            },
            closeDialog(){
                this.createForm.gateway_ids = ''
                this.$emit('closeCreate')
            },
            create(){
                this.createForm.firmware_id = this.verifyData.id
                console.log('create',this.createForm)
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("ota/firmwareverify", this.createForm).then(() => {
                        this.$message.success(this.$t('lang.verify-loading'));
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                })
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.$api.restfulApi.post('ota/getgateway', {mac: query}).then(res => {
                        this.loading = false
                        console.log(res)
                        this.serialOption = res.chigo_gateways
                    }).catch(err => {
                        this.loading = false
                    })
                } else {
                    this.serialOption = [];
                }
            }
        }
    }
</script>

<style  lang="scss">
    .tip{
        width: 80%;
        margin: 0 auto 10px;
        border: 1px solid #797979;
        padding: 12px 8px;
    }
</style>