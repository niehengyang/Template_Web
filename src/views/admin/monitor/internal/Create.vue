<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.time-add')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="createForm"
                ref="createForm"
                :rules="formRules"
                label-position="right"
                label-width="120px"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.time-name')" prop="name">
                    <el-input
                        size="medium"
                        v-model="createForm.name"
                        :placeholder="$t('lang.hint-Timename')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.startT')" prop="date_min">
                    <el-date-picker
                        v-model="createForm.date_min"
                        type="date"
                        :placeholder="$t('lang.hint-startT')"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('lang.endT')" prop="date_max">
                    <el-date-picker
                        v-model="createForm.date_max"
                        type="date"
                        :placeholder="$t('lang.hint-endT')"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('lang.time-slot')" prop="slot">
                    <el-time-picker
                        is-range
                        v-model="createForm.slot"
                        :range-separator="$t('lang.to')"
                        :start-placeholder="$t('lang.startT')"
                        :end-placeholder="$t('lang.endT')"
                        :placeholder="$t('lang.time-horizon')"
                        value-format="HH:mm"
                        @change="changeTime"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item :label="$t('lang.repeat-way')" prop="repeat_way">
                    <el-select
                        v-model="createForm.repeat_way"
                        :placeholder="$t('lang.hint-Rway')"
                        @change="changeRepeat"
                    >
                        <el-option
                            v-for="item in wayList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.defined-con')"
                    v-if="createForm.repeat_way==4"
                    prop="defined_at"
                >
                    <el-select
                        v-model="createForm.defined_at"
                        multiple
                        :placeholder="$t('lang.hint-sel')"
                    >
                        <el-option
                            v-for="item in definedList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('lang.mode-set')" prop="runmode">
                    <el-select
                        v-model="createForm.runmode"
                        :placeholder="$t('lang.hint-SelMode')"
                        @change="modeChange"
                    >
                        <el-option
                            v-for="item in modeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- createForm.runmode 5:关机，4：送风 3：除湿 -->
                <el-form-item :label="$t('lang.temp-set')" prop="temperature">
                    <el-input
                        v-model="createForm.temperature"
                        :placeholder="$t('lang.hint-SetTemp')"
                        clearable
                        :disabled="tempdis"
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
    props: ["dialogVisible", "internalId"],
    data() {
        var slotValidate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error(this.$t("lang.hint-tempNull")));
            }
            if (isNaN(value)) {
                callback(new Error(this.$t("lang.hint-num")));
            }
            if (value < 16 || value > 32) {
                callback(new Error(this.$t("lang.hint-temprang")));
            } else {
                callback();
            }
        };
        return {
            visible: false,
            loading: false,
            createForm: {},
            tempdis: false,
            slotValidate:slotValidate,
            formRules: {
                name: [
                    {
                        required: true,
                        message: this.$t("lang.hint-Timename"),
                        trigger: "blur"
                    }
                ],
                date_min: [
                    {
                        required: true,
                        message: this.$t("lang.hint-startT"),
                        trigger: "blur"
                    }
                ],
                repeat_way: [
                    {
                        required: true,
                        message: this.$t("lang.hint-Rway"),
                        trigger: "blur"
                    }
                ],
                date_max: [
                    {
                        required: true,
                        message: this.$t("lang.hint-endT"),
                        trigger: "blur"
                    }
                ],
                slot: [
                    {
                        required: true,
                        message: this.$t("lang.time-horizon"),
                        trigger: "blur"
                    }
                ],
                runmode: [
                    {
                        required: true,
                        message: this.$t("lang.hint-SelMode"),
                        trigger: "blur"
                    }
                ],
                temperature: [
                    {
                        required: true,
                        validator: slotValidate,
                        trigger: "change"
                    }
                ]
            },
            wayList: [
                { label: this.$t("lang.only-one"), value: "1" },
                { label: this.$t("lang.everyday"), value: "2" },
                { label: this.$t("lang.workday"), value: "3" },
                {
                    label: this.$t("lang.user-defined"),
                    value: "4"
                }
            ],
            modeList: [
                {
                    label: this.$t("lang.mode-auto"),
                    value: "0"
                },
                {
                    label: this.$t("lang.mode-cold"),
                    value: "1"
                },
                {
                    label: this.$t("lang.mode-heating"),
                    value: "2"
                },
                {
                    label: this.$t("lang.mode-dehumidification"),
                    value: "3"
                },
                {
                    label: this.$t("lang.mode-wind"),
                    value: "4"
                },
                {
                    label: this.$t("lang.mode-power"),
                    value: "5"
                }
            ],
            definedList: [
                { label: this.$t("lang.monday"), value: "1" },
                { label: this.$t("lang.tuesday"), value: "2" },
                { label: this.$t("lang.wednesday"), value: "3" },
                { label: this.$t("lang.thursday"), value: "4" },
                { label: this.$t("lang.friday"), value: "5" },
                { label: this.$t("lang.saturday"), value: "6" },
                { label: this.$t("lang.sunday"), value: "7" }
            ]
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
        //添加定时
        create() {
            this.createForm.defined_at = "[" + this.createForm.defined_at + "]";
            this.createForm.type = 1;
            this.createForm.internal_id = this.internalId;
            console.log(this.createForm);
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi
                    .create("timing", this.createForm)
                    .then(res => {
                        this.$message.success(this.$t("lang.add-success"));
                        this.loading = false;
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false
                })
            });
        },
        //时间段选择改变
        changeTime() {
            if (this.createForm.slot) {
                this.createForm.time_start = this.createForm.slot[0];
                this.createForm.time_end = this.createForm.slot[1];
            }
        },
        //重复方式改变
        changeRepeat() {
            // this.createForm.repeat_way = this.createForm.repeat_way[0];
            if (this.createForm.repeat_way == 4) {
                this.formRules.defined_at = [
                    {
                        required: true,
                        message: this.$t("lang.hint-sel"),
                        trigger: "blur"
                    }
                ];
            }
        },
        //运行模式改变
        modeChange(val) {
            if (val == 5 || val == 4 || val == 3) {
                if (val == 3) this.createForm.temperature = 26;
                else this.createForm.temperature = "";
                this.tempdis = true;
                this.formRules.temperature = [];
            } else {
                this.tempdis = false;
                this.createForm.temperature = "";
                this.formRules.temperature = [
                    {
                        required: true,
                        validator: this.slotValidate,
                        trigger: "change"
                    }
                ];
            }
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
