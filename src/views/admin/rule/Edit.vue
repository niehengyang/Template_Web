<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="150px"
                v-loading="loading"
                class="rule-form"
        >
            <el-form-item prop="name" :label="$t('lang.alarm-name')">
                <el-input
                        size="medium"
                        :placeholder="$t('lang.hint-Aname')"
                        v-model="editForm.name"
                        clearable
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                ></el-input>
            </el-form-item>
            <el-form-item prop="device_id" :label="$t('lang.rule-type')">
                <el-select
                        :placeholder="$t('lang.hint-Dtype')"
                        v-model="device_label"
                        disabled
                        clearable
                >
                    <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="device_serialno" :label="$t('lang.alarm-device')">
                <el-select
                        :placeholder="$t('lang.hint-Adevice')"
                        v-model="editForm.device_serialno"
                        clearable
                >
                    <el-option
                            v-for="item in deviceOptions"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <rule-set :rule="editForm.rule"
                      @addContions="addContions"
                      @deleteContions="deleteContions"
                      @changeCondition="changeCondition"
            ></rule-set>
            <el-form-item prop="level" :label="$t('lang.alarm-level')">
                <el-select
                        :placeholder="$t('lang.hint-Alevel')"
                        v-model="editForm.level"
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
            <el-form-item prop="way" :label="$t('lang.alarm-way')">
                <el-checkbox-group v-model="editForm.way" v-if="editForm.way">
                    <el-checkbox v-for="item in wayOptions" :label="item.value" :key="item.value">{{item.label}}
                    </el-checkbox>

                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="$t('lang.enable-alarm')" prop="status">
                <el-switch
                        v-model="editForm.status"
                        active-value="1"
                        inactive-value="0"
                ></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer goright">
            <el-button
                    class="white-btn"
                    size="medium"
                    @click="close"
                    :disabled="loading?true:false"
            >{{$t('lang.cancel')}}
            </el-button>
            <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="edit"
                    :disabled="loading?true:false"
            >{{$t('lang.submit')}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import RuleSet from "./conditions";
    export default {
        props: {
            rule_id: {
                type: Number,
                required: true
            },
            getList: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                device_label: "",
                typeOptions: [
                    {value: "1", label: this.$t("lang.multi-split")},
                    {value: "2", label: this.$t("lang.water-machine")}
                ],
                wayOptions: [
                    {value: "1", label: this.$t('lang.SMS')},
                    {value: "2", label: this.$t('lang.send-email')}
                ],
                deviceOptions: [],
                paramOptions: [],
                operators: [
                    {value: "0", label: this.$t("lang.range")},
                    {value: "=", label: "="},
                    {value: ">=", label: "≥"},
                    {value: "<=", label: "≤"},
                    {value: ">", label: ">"},
                    {value: "<", label: "<"}
                ],
                conditions: [
                    {value: "AND", label: "and"},
                    {value: "OR", label: "or"},
                ],
                levelOptions: [
                    {value: "0", label: this.$t("lang.serious")},
                    {value: "1", label: this.$t("lang.matter")},
                    {value: "2", label: this.$t("lang.common")},
                    {value: "3", label: this.$t("lang.lesser")}
                ],
                conditionsNum: 1, //条件数
                editForm: {
                    name: '',
                    device_id: '',
                    device_serialno: '',
                    rule: [],
                    level: '',
                    way: [],
                    status: ''
                },
                formRules: {
                    name: [
                        {required: true, message: this.$t("lang.hint-Aname"), trigger: "blur"},
                        {max: 20,message: this.$t("lang.long-alarmName"),trigger: 'change'},
                        {validator: validateRule,trigger: 'change'}
                    ],
                    device_id: [
                        {
                            required: true,
                            type: "number",
                            message: this.$t("lang.hint-Dtype"),
                            trigger: "blur"
                        },{validator: validateRule,trigger: 'blur'}
                    ],
                    device_serialno: [
                        {
                            required: true,
                            message: this.$t("lang.hint-Adevice"),
                            trigger: "blur"
                        },,{validator: validateRule,trigger: 'blur'}
                    ],
                    level: [
                        {
                            required: true,
                            message: this.$t("lang.hint-Alevel"),
                            trigger: "blur"
                        },{validator: validateRule,trigger: 'blur'}
                    ],
                    way: [
                        {
                            required: true,
                            message: this.$t("lang.hint-Away"),
                            trigger: "blur"
                        }
                    ],
                    rule:[{
                        required: true
                    }]
                }
            };
        },
        watch: {},
        created() {
            this.init();
            this.getDeviceTypeList();
            this.getAlarmDevices();
        },
        components: {
            "rule-set": RuleSet
        },
        methods: {
            changeCondition(param) {
                let arr = this.editForm.rule
                for (let i = 1; i < arr.length; i++) {
                    if (param == 'AND') {
                        arr[i].condition = "AND"
                    } else if (param == "OR") {
                        arr[i].condition = "OR"
                    }
                }
            },

            deleteContions(index) {
                this.editForm.rule.splice(index, 1)
            },
            addContions() {
                this.editForm.rule.push(
                    {
                        param: "",
                        operator: "=",
                        value: "",
                        condition: ""
                    }
                )
            },
            //获取设备类型列表（水机、多联机）
            getDeviceTypeList() {
                this.typeOptions = [];
                this.$api.restfulApi.list("devicetype").then(res => {
                    let arr = res.data;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].prodtype == 0) {
                            let name = {value: arr[i].id, label: this.$t("lang.multi-split")}
                            this.typeOptions.push(name);
                        } else {
                            let name = {value: arr[i].id, label: this.$t("lang.water-machine")}
                            this.typeOptions.push(name);
                        }
                    }
                })
            },
            //获取告警设备序列号
            getAlarmDevices() {
                this.deviceOptions = [];
                this.$api.restfulApi.list("device", {deviceType: this.editForm.dt_id}).then(res => {
                    let arr = res.data;
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            let name = {id: arr[i].id, name: arr[i].serialno}
                            this.deviceOptions.push(name);
                        }
                    }
                })
            },
            //编辑
            edit() {
                this.$refs["editForm"].validate(valid => {
                    if (!valid) return;
                    this.loading = true;
                    this.$api.restfulApi.edit("alarmRule", this.editForm.id, this.editForm).then(res => {
                        this.$message.success(this.$t("lang.edit-success"));
                        this.loading = false;
                        this.close();
                        this.getList();
                    })
                        .catch(() => {
                        })
                        .finally(() => (this.loading = false));
                });
            },

            //------------------
            //重写方法如下
            // 触发关闭弹窗
            close() {
                this.$emit("close", "dialogEditRule");
            },
            //初始化企业数据
            init() {
                this.loading = true;
                this.$api.restfulApi.item("alarmRule", this.rule_id).then(res => {
                    this.editForm = res;
                    const {rule_query} = res
                    this.editForm.rule = rule_query
                    if (this.editForm.dt_id == '4') {
                        this.device_label = this.$t("lang.water-machine");
                    } else if (this.editForm.dt_id == '1') {
                        this.device_label = this.$t("lang.multi-split");
                    }
                    this.loading = false;
                }).catch(() => {
                }).finally(() => (this.loading = false));
            },
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
