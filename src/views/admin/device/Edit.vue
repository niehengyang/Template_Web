<template>
    <div>
        <!-- 编辑dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.device-edit')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="120px"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.device-name')">
                    <el-input
                        size="medium"
                        v-model="editForm.name"
                        :placeholder="$t('lang.hint-Dname')"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.device-serial')" prop="serialno">
                    <el-input
                        size="medium"
                        v-model="editForm.serialno"
                        :placeholder="$t('lang.hint-Dserial')"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.device-type')" prop="dt_id">
                    <type-select v-model="editForm.dt_id" disabled></type-select>
                </el-form-item>
                <!-- <el-form-item :label="$t('lang.gatewayMac')" prop="mac">
                    <el-input
                        size="medium"
                        v-model="editForm.mac"
                        :placeholder="$t('lang.hint-mac')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.gatewayIMEI')" prop="imei">
                    <el-input
                        size="medium"
                        v-model="editForm.imei"
                        :placeholder="$t('lang.hint-IMEI')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.iotcard')">
                    <el-input
                        size="medium"
                        v-model="editForm.iotsim"
                        :placeholder="$t('lang.hint-iotcard')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.gateway-baud')" prop="gateway_baud">
                    <el-select
                        size="medium"
                        v-model="editForm.byterate"
                        :placeholder="$t('lang.hint-baud')"
                    >
                        <el-option
                            v-for="(item, index) in baudOptions"
                            :key="index"
                            :label="item.value"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('lang.gateway-protocol')" prop="gateway_protocol">
                    <el-select
                        size="medium"
                        v-model="editForm.protocol"
                        :placeholder="$t('lang.hint-protocol')"
                    >
                        <el-option
                            v-for="(item, index) in protocolOptions"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item> -->
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
                    {required: false, max: '50', message: this.$t("lang.hint-Dserial"), trigger: "blur"}
                ],
                serialno: [
                    {required: true, message: this.$t("lang.hint-Dserial"), trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-serialno'), trigger: "blur"}
                ],
                dt_id: [
                    {required: true, message: this.$t("lang.hint-Dtype"), trigger: "blur"}
                ],
                // imei: [
                //     {
                //         required: true,
                //         message: this.$t("lang.hint-IMEI"),
                //         trigger: "blur"
                //     }
                // ],
                // mac: [
                //     {
                //         required: true,
                //         message: this.$t("lang.hint-IMEI"),
                //         trigger: "blur"
                //     }
                // ]
            },
            baudOptions: [
                { value: "1200" },
                { value: "1600" },
                { value: "1800" },
                { value: "2400" }
            ],
            protocolOptions: [
                { name: "MQTT", value:"0"},
                { name: "HTTP", value:"1"},
                { name: "COAP", value:"2"},
                { name: "MODBUS",value:"3"}
            ]
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
        //编辑
        edit() {
            this.$refs.editForm.validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.edit("device",this.editForm.id,this.editForm).then(res => {
                    this.$message.success(this.$t("lang.edit-success"));
                    this.loading = false;
                    this.$emit("refresh");
                }).catch(err => {
                    this.loading = false
                })
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
