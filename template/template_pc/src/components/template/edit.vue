<template>
    <div>
        <!-- 编辑dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            title=""
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="100px"
                v-loading="loading"
            >
                <el-form-item prop="">
                    <el-input
                        size="medium"
                        v-model=""
                        placeholder=""
                    ></el-input>
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
                    @click="edit"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible", "formData"],
    data() {
        return {
            visible: false,
            loading: false,
            editForm: {},
            formRules: {
                name: [
                    {
                        required: true,
                        message: "",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        },
        formData: function(newVal, oldVal) {
            this.editForm = newVal;
        }
    },
    created() {},
    components: {},
    methods: {
        //编辑企业客户
        edit() {
            this.$refs.editForm.validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.edit("").then(res => {
                    this.$message.success("");
                    this.loading = false;
                    this.$emit("refresh");
                });
            });
        },
        close() {
            this.resetForm("editForm");
            this.$emit("dialog-close");
        }
    }
};
</script>

<style scoped lang="scss">
</style>
