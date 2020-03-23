<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            title=""
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="createForm"
                ref="createForm"
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
            formRules: {}
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        }
    },
    created() {},
    components: {
    },
    methods: {
        //
        create() {
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi
                    .create("", this.createForm)
                    .then(res => {
                        this.$message.success("");
                        this.loading = false;
                        this.$emit("refresh");
                    });
            });
        },
        //关闭
        close() {
            this.resetForm("createForm");
            this.$emit("dialog-close");
        },
        
    }
};
</script>

<style scoped lang="scss">
</style>
