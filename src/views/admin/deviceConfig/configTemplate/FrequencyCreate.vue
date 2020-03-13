<template>
    <div>
        <!-- dialog弹窗 + 新增采集组 -->
        <el-dialog
            :title="$t('lang.collect-add')"
            :visible.sync="visible"
            width="780px"
            center
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="createForm"
                :rules="formRules"
                ref="createForm"
                label-width="100px"
                class="demo-ruleForm"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.collect-name')" prop="collect_name">
                    <el-input v-model="createForm.collect_name"
                              onkeyup="this.value=this.value.replace(/\s+/g,'')"
                              :placeholder="$t('lang.hint-Cname')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.collect-HZ')" prop="collect_num">
                    <el-row type="flex">
                        <el-col :span="12">
                            <el-form-item>
                                <el-input-number v-model="createForm.collect_num" :min='0'></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="collect_unit">
                                <el-select
                                    :placeholder="$t('lang.hint-unit')"
                                    v-model="createForm.collect_unit"
                                    default-first-option
                                >
                                    <!-- <el-option :label="毫秒/次" :value="'ms'"></el-option> -->
                                    <el-option :label="$t('lang.unit-s')" :value="'s'"></el-option>
                                    <el-option :label="$t('lang.unit-m')" :value="'m'"></el-option>
                                    <el-option :label="$t('lang.unit-h')" :value="'h'"></el-option>
                                    <el-option :label="$t('lang.unit-d')" :value="'d'"></el-option>
                                    <!-- <el-option :label="周/次" :value="'w'"></el-option>
                                    <el-option :label="月/次" :value="'month'"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item :label="$t('lang.field-data')" prop="collect_dataflows">
                    <template>
                        <el-transfer
                            filterable
                            :titles="[$t('lang.en-data'),$t('lang.sel-data')]"
                            :button-texts="[$t('lang.delete'), $t('lang.add')]"
                            :filter-:placeholder="$t('lang.hint-Qdata')"
                            v-model="createForm.collect_dataflows"
                            :data="useData"
                        ></el-transfer>
                    </template>
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
    props: {
        getDataflow: {
            type: Function,
            default: null
        },
        dialogVisible: {
            type: Boolean
        },
        dmId: {
            type: String
        }
    },
    data() {
        return {
            visible: false,
            loading: false,
            createForm: {},
            useData: [], //应用数据中可用数据
            formRules: {
                collect_name: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-collectName'), trigger: "blur"}
                ],
                collect_num: [
                    {
                        required: true,
                        message: this.$t('lang.hint-Cnum'),
                        trigger: "change"
                    },
                    { type: "number", message: this.$t('lang.hint-num') }
                ],
                collect_unit: [
                    { required: true, message: this.$t('lang.hint-unit'), trigger: "blur" }
                ],
                collect_dataflows: [
                    {
                        type: "array",
                        required: true,
                        message: this.$t('lang.hint-Fdata'),
                        trigger: "change"
                    }
                ]
            }
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
            if (newVal) {
                let that = this;
                // this.loading = true;
                this.getDataflow(function(data) {
                    that.useData = data;
                    // that.loading = false;
                });
            }
        }
    },
    created() {},
    methods: {
        //添加
        create() {
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.createForm.dt_id = this.dmId;
                this.$api.restfulApi
                    .create("collect", this.createForm)
                    .then(res => {
                        this.$message({
                            message: this.$t('lang.add-success'),
                            type: "success"
                        });
                        this.loading = false;
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false
                });
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


