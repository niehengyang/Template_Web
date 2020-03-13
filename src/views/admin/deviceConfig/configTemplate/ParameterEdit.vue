<template>
    <div>
        <!-- dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.param-add')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="130px"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.data-name')" prop="df_keyname">
                    <el-input
                        size="medium"
                        v-model="editForm.df_keyname"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-dataName')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.show-name')" prop="df_displayname">
                    <el-input
                        size="medium"
                        v-model="editForm.df_displayname"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-showName')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.data-type')" prop="df_type">
                    <el-select
                        size="medium"
                        v-model="editForm.df_type"
                        :placeholder="$t('lang.hint-dataType')"
                        @change="chooseDataType"
                    >
                        <el-option
                            v-for="item in dataTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.value-showset')"
                    required
                    v-if="editForm.df_type!='00' && editForm.df_type"
                >
                    <!-- 新数据配置列表 -->
                    <el-row
                        v-for="(item,index) in editForm.df_datamap"
                        :key="index"
                        :gutter="20"
                        :style="index > 0? 'margin-top: 14px': 'left: -10px'"
                    >
                        <el-col :span="10">
                            <el-form-item
                                label-width="0"
                                :prop="'df_datamap.'+index+'.key'"
                                :rules="dataConfigRules.key"
                            >
                                <el-input
                                    style="width: 140px"
                                    size="medium"
                                    v-model="item.key"
                                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                    :placeholder="$t('lang.hint-orValue')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item
                                label-width="0"
                                :prop="'df_datamap.'+index+'.value'"
                                :rules="dataConfigRules.value"
                            >
                                <el-input
                                    style="width: 140px"
                                    size="medium"
                                    v-model="item.value"
                                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                    :placeholder="$t('lang.hint-showName')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" v-if="index == 0">
                            <i class="el-icon-plus" @click="addNewConfigRow"></i>
                        </el-col>
                        <el-col :span="2" v-if="index > 0">
                            <i class="el-icon-close" @click="deleteConfigRow(index,item)"></i>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.unit')"
                    v-if="editForm.df_type == '00'"
                    prop="df_unit"
                >
                    <el-input
                        size="medium"
                        v-model="editForm.df_unit"
                        :placeholder="$t('lang.hint-unit')"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group">
                <el-button class="white-btn" size="medium" @click="close">{{$t('lang.cancel')}}</el-button>
                <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="edit"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible", "dmId", "formData"],
    data() {
        return {
            visible: false,
            loading: false,
            editForm: {
                df_datamap: [
                    {
                        key: "",
                        value: ""
                    }
                ]
            },
            formRules: {
                df_keyname: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-dataName'), trigger: "blur"}
                ],
                df_displayname: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-showName'), trigger: "blur"}
                ],
                df_type: [
                    {required: true, message: this.$t('lang.hint-dataType'), trigger: "blur"}
                ]
            },
            dataConfigRules: {
                key: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-dataName'), trigger: "blur"}
                ],
                value: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-showName'), trigger: "blur"}
                ]
            },
            dataTypeOptions: [
                { value: "00", label: this.$t("lang.valueT") },
                { value: "01", label: this.$t("lang.onOffT") },
                { value: "02", label: this.$t("lang.statusT") }
            ]
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
            if (newVal) {
                this.editForm = this.formData;
                this.editForm.df_datamap = [
                    {
                        key: "",
                        value: ""
                    }
                ];
            }
        }
    },
    created() {},
    methods: {
        //提交表单
        edit() {
            this.$refs.editForm.validate(valid => {
                if (!valid) return;
                this.editForm.dt_id = this.dmId;
                this.$api.restfulApi
                    .edit("dataflow", this.editForm)
                    .then(() => {
                        this.loading = false;
                        this.$message({
                            message: this.$t("lang.edit-success"),
                            type: "success"
                        });
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false
                })
            });
        },
        //选择数据类型
        chooseDataType(val) {
            console.log(val);
            if (val != "00") {
                this.editForm.df_unit = "";
            }
            this.editForm.df_datamap = [
                {
                    key: "",
                    value: ""
                }
            ];
        },
        //增加配置行
        addNewConfigRow() {
            this.editForm.df_datamap.push({
                key: "",
                value: ""
            });
        },
        // 删除新增的某一行
        deleteConfigRow(index, item) {
            this.index = this.editForm.df_datamap.indexOf(item);
            if (index !== 0) {
                this.editForm.df_datamap.splice(index, 1);
            }
        },
        //关闭
        close() {
            this.editForm = {};
            this.$emit("dialog-close");
        }
    }
};
</script>

<style lang="scss">
i {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
}
.el-icon-plus {
    color: #67c23a;
    margin-right: 5px;
     margin-top: 10px;
}
.el-icon-close {
    color: #f56c6c;
     margin-top: 10px;
}
</style>


