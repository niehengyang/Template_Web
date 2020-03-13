<template>
    <div>
        <!-- dialog弹窗 + 编辑采集组 -->
        <el-dialog
            :title="$t('lang.collect-edit')"
            :visible.sync="visible"
            width="780px"
            center
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                :rules="formRules"
                ref="editForm"
                label-width="100px"
                class="demo-ruleForm"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.collect-name')" prop="collect_name">
                        <el-input v-model="editForm.collect_name"
                                  onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                  :placeholder="$t('lang.hint-Cname')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.collect-HZ')" prop="collect_num">
                    <el-row type="flex">
                        <el-col :span="12">
                            <el-form-item>
                                <el-input-number v-model="editForm.collect_num" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="collect_unit">
                                <el-select
                                    :placeholder="$t('lang.hint-unit')"
                                    v-model="editForm.collect_unit"
                                    default-first-option
                                >
                                    <!-- <el-option :label="毫秒/次" :value="'ms'"></el-option> -->
                                    <el-option :label="$t('lang.unit-s')" :value="'s'"></el-option>
                                    <el-option :label="$t('lang.unit-m')" :value="'m'"></el-option>
                                    <el-option :label="$t('lang.unit-h')" :value="'h'"></el-option>
                                    <el-option :label="$t('lang.unit-d')" :value="'d'"></el-option>
                                    <!-- <el-option :label="周/次" :value="'w'"></el-option> -->
                                    <!-- <el-option :label="月/次" :value="'month'"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item :label="$t('lang.field-data')" prop="collect_dataflows" :class="noError?'no-error':''">
                    <template>
                        <el-transfer
                            filterable
                            :titles="[$t('lang.en-data'),$t('lang.sel-data')]"
                            :button-texts="[$t('lang.delete'), $t('lang.add')]"
                            :filter-:placeholder="$t('lang.hint-Qdata')"
                            v-model="collect_dataflows"
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
                    @click="edit"
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
        formData: {
            type: Object,
            default: {}
        },
        dmId: {
            type: String
        }
    },
    data() {
        return {
            visible: false,
            loading: false,
            editForm: {},
            useData: [], //应用数据中可用数据
            collect_dataflows: [], //应用数据中选择好的数据组
            noError: true,
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
                    { type: "number", message:  this.$t('lang.hint-num') }
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
                //应用数据处理
                this.editForm = this.formData;
                let that = this;
                // this.loading = true;
                this.getDataflow(function(data) {
                    that.useData = data;
                    if (that.editForm.dataflows.length != 0) {
                        that.editForm.dataflows.forEach((item, index) => {
                            that.useData.push({
                                label: item.df_displayname,
                                key: item.df_id
                            });
                        });
                        for (
                            var i = 0;
                            i < that.editForm.dataflows.length;
                            i++
                        ) {
                            that.collect_dataflows[i] =
                                that.editForm.dataflows[i].df_id;
                        }
                        that.loading = false;
                    } else {
                        that.collect_dataflows = [];
                        that.useData = data;
                        that.loading = false;
                    }
                });
            }
        },
        collect_dataflows:function(newVal,oldVal){
            if(newVal.length==0){
                this.noError=false;
            }else{
                this.noError=true;
            }
        }
    },
    created() {},
    methods: {
        //编辑
        edit() {
            //collect_dataflows验证处理
            this.editForm.collect_dataflows = this.collect_dataflows;
            if (this.editForm.collect_dataflows.length != 0) {
                this.noError = true;
                delete this.formRules.collect_dataflows;
            } else {
                this.formRules.collect_dataflows = {
                    type: "array",
                    required: true,
                    message: this.$t('lang.hint-Fdata'),
                    trigger: "change"
                };
                this.noError = false;
            }
            this.$refs["editForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.editForm.dt_id = this.dmId;
                if (this.editForm.dataflows != undefined) {
                    delete this.editForm.dataflows;
                }
                this.$api.restfulApi
                    .edit("collect", this.editForm.collect_id, this.editForm)
                    .then(res => {
                        this.$message({
                            message:this.$t('lang.edit-success'),
                            type: "success"
                        });
                        this.visible = false;
                        this.$emit("refresh");
                    });
            });
        },
        //关闭
        close() {
            this.resetForm("editForm");
            this.$emit("dialog-close");
        }
    }
};
</script>

<style lang="scss">
.no-error {
    .el-form-item__error {
        display: none;
    }
}
</style>


