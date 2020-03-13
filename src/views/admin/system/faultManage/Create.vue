<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.fault-add')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="createForm"
                ref="createForm"
                :rules="formRules"
                label-position="right"
                label-width="200px"
                v-loading="loading"
            >
                <el-form-item prop="code" :label="$t('lang.fault-num')">
                    <el-input
                        size="medium"
                        v-model="createForm.code"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-Fnum')"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="name" :label="$t('lang.fault-name')">
                    <el-input
                        size="medium"
                        v-model="createForm.name"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-Fname')"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="user_visible" :label="$t('lang.fault-see')">
                    <el-switch
                        v-model="createForm.user_visible"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group">
                <el-button
                    class="white-btn"
                    size="medium"
                    @click="close"
                    :disabled="loading?true:false"
                >{{$t('lang.cancel')}}</el-button>
                <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="create"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible"],
    data() {
        return {
            visible: false,
            loading: false,
            createForm: {},
            formRules: {
                code: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 10, message: this.$t('lang.long-faultCode'), trigger: "blur"}
                ],
                name: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-faultName'), trigger: "blur"}
                ]
            }
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        }
    },
    created() {},
    components: {},
    methods: {
        //
        create() {
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.create("", this.createForm).then(res => {
                    this.$message.success("");
                    this.loading = false;
                    this.$emit("refresh");
                }).catch(err => {
                    this.loading = false
                })
            });
        },
        //关闭
        close() {
            this.resetForm("createForm");
            this.$emit("dialog-close");
        }
    }
};
</script>

<style scoped lang="scss">
</style>
