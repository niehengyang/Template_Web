<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            title
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="150px"
                v-loading="loading"
                class="rule-form"
            >
                <el-form-item prop="alarm_name" :label="$t('lang.alarm-name')">
                    <el-input
                        size="medium"
                        :placeholder="$t('lang.hint-Aname')"
                        v-model="editForm.alarm_name"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item prop="rule" :label="$t('lang.rule-set')">
                    <rule-set v-model="editForm.rule"></rule-set>
                </el-form-item>
                <el-form-item prop="alarm_level" :label="$t('lang.alarm-level')">
                    <el-select
                        :placeholder="$t('lang.hint-Alevel')"
                        v-model="editForm.alarm_level"
                        clearable
                    >
                        <el-option
                            v-for="item in levelOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm_way" :label="$t('lang.alarm-way')">
                    <el-checkbox
                        :label="$t('lang.SMS')"
                        name="sms"
                        v-model="editForm.sms"
                        @change="changeSms"
                    ></el-checkbox>
                    <el-checkbox
                        :label="$t('lang.send-email')"
                        name="email"
                        v-model="editForm.email"
                        @change="changeEmail"
                    ></el-checkbox>
                </el-form-item>
                <el-form-item :label="$t('lang.enable-alarm')" prop="alarm_enable">
                    <el-switch v-model="editForm.alarm_enable"></el-switch>
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
import RuleSet from "@/views/admin/rule/conditions";
export default {
    props: ["dialogVisible", "formData"],
    data() {
        return {
            visible: false,
            loading: false,
            editForm: {
                alarm_way: [],
                alarm_enable: true
            },
            paramOptions: [],
            operators: [
                { value: "0", label: this.$t("lang.range") },
                { value: "1", label: "=" },
                { value: "2", label: "≥" },
                { value: "3", label: "≤" },
                { value: "4", label: ">" },
                { value: "5", label: "<" }
            ],
            conditions: [
                { value: "0", label: "and" },
                { value: "1", label: "or" },
                { value: "2", label: "not" }
            ],
            levelOptions: [
                { value: "0", label: this.$t("lang.serious") },
                { value: "1", label: this.$t("lang.matter") },
                { value: "2", label: this.$t("lang.common") },
                { value: "3", label: this.$t("lang.lesser") }
            ],
            conditionsNum: 1, //条件数
            formRules: {
                alarm_name: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-alarmName'), trigger: "blur"}
                ],
                alarm_level: [
                    {
                        required: true,
                        message: this.$t("lang.hint-Alevel"),
                        trigger: "blur"
                    }
                ],
                alarm_way: [
                    {
                        required: true,
                        message: this.$t("lang.hint-Away"),
                        trigger: "blur"
                    }
                ],
                rule: [
                    {
                        required: true,
                        message: this.$t("lang.hint-rule"),
                        trigger: "blur"
                    }
                ]
            }
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
    created() {},
    components: {
        "rule-set": RuleSet
    },
    methods: {
        //
        edit() {
            console.log(this.editForm.alarm_way);
            this.$refs["editForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.edit("", this.editForm).then(res => {
                    this.$message.success("");
                    this.loading = false;
                    this.$emit("refresh");
                }).catch(err => {
                    this.loading = false
                })
            });
        },
        changeSms(val) {
            console.log(val);
            if (val) {
                this.createForm.alarm_way[0] = "sms";
            } else {
                this.createForm.alarm_way[0] = "";
            }
        },
        changeEmail(val) {
            console.log(val);
            if (val) {
                this.createForm.alarm_way[1] = "email";
            } else {
                this.createForm.alarm_way[1] = "";
            }
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
.rule-form {
    padding-left: 60px !important;
    .el-input {
        width: 360px;
    }
}
</style>
