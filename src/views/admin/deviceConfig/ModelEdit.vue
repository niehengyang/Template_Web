<template>
    <div>
        <el-dialog
            class="dialog-form"
            :title="$t('lang.model-edit')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :rules="formRules"
                ref="editForm"
                :model="editForm"
                label-position="right"
                label-width="100px"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.model-name')" prop="name">
                    <el-input size="medium" v-model="editForm.name" :placeholder="$t('lang.hint-Mname')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.belongto-type')" prop="dt_id">
                    <el-select
                        size="medium"
                        v-model="editForm.dt_id"
                        @visible-change="getDeviceTypes"
                        :placeholder="$t('lang.hint-toType')"
                    >
                        <el-option
                            v-for="item in deviceTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('lang.model-descript')" prop="describe">
                    <el-input
                        type="textarea"
                        :rows="3"
                        :placeholder="$t('lang.hint-Mdesc')"
                        v-model="editForm.describe"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
                <el-button
                    class="white-btn"
                    size="medium"
                    @click="close()"
                    :disabled="loading?true:false"
                >{{$t('lang.cancel')}}</el-button>
                <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="edit()"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["formData","dialogVisible"],
    data() {
        return {
            loading: false,
            visible:false,
            editForm: {
                name: "",
                dt_id: "",
                describe: ""
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: this.$t('lang.hint-Mname'),
                        trigger: "blur"
                    },
                ],
                dt_id: [
                    {
                        required: true,
                        message: this.$t('lang.hint-toType'),
                        trigger: "blur"
                    }
                ],
            },
            deviceTypeOptions: []
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
            if (newVal) {
                this.editForm = this.formData;
            }
        }
    },
    created() {
        this.getDeviceTypes();
    },
    methods: {
        //获取设备类型
        getDeviceTypes(val) {
            this.$api.restfulApi.list("devicetype").then((response) => {
                this.deviceTypeOptions = response.data;
            })
        },
         close() {
            this.resetForm("editForm");
            this.$emit("dialog-close");
        },
         edit() {
            this.$refs.editForm.validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi
                    .edit("devicemodel", this.editForm.id, this.editForm)
                    .then(() => {
                        this.loading = false;
                        this.$message({
                            message: this.$t("lang.edit-success"),
                            type: "success"
                        });
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false;
                });
            });
        }
    }
};
</script>

<style scoped>
</style>