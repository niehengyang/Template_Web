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
                    update: [
                        {required: true, validator: validateTrim, trigger: "blur"},
                        {max: 200, message: this.$t('lang.long-update'), trigger: "blur"}
                    ]
                },
                dialogAddLoading: false,
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
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("ios", this.createForm).then(() => {
                        this.$message.success(this.$t("lang.add-success"));
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