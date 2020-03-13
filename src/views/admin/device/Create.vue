<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.device-add')"
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
                <el-form-item :label="$t('lang.device-name')" prop="name">
                    <el-input
                        size="medium"
                        v-model="createForm.name"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-Dname')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.device-serial')" prop="serialno">
                    <el-input
                        size="medium"
                        v-model="createForm.serialno"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-Dserial')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.device-type')" prop="dt_id">
                    <type-select v-model="createForm.dt_id"></type-select>
                </el-form-item>
                <el-form-item :label="$t('lang.gatewayMac')" prop="mac">
                    <el-input
                        size="medium"
                        v-model="createForm.mac"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-mac')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.gatewayIMEI')" prop="imei">
                    <el-input
                        size="medium"
                        v-model="createForm.imei"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        :placeholder="$t('lang.hint-IMEI')"
                    ></el-input>
                </el-form-item>
<!--                <el-form-item :label="$t('lang.iotcard')" prop="iotsim">-->
<!--                    <el-input-->
<!--                        size="medium"-->
<!--                        v-model="createForm.iotsim"-->
<!--                        onkeyup="this.value=this.value.replace(/\s+/g,'')"-->
<!--                        :placeholder="$t('lang.hint-iotcard')"-->
<!--                    ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item :label="$t('lang.gateway-baud')" prop="byterate">-->
<!--                    <el-select-->
<!--                        size="medium"-->
<!--                        v-model="createForm.byterate"-->
<!--                        :placeholder="$t('lang.hint-baud')"-->
<!--                    >-->
<!--                        <el-option-->
<!--                            v-for="(item, index) in baudOptions"-->
<!--                            :key="index"-->
<!--                            :label="item.value"-->
<!--                            :value="item.value"-->
<!--                        ></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item :label="$t('lang.gateway-protocol')" prop="protocol">-->
<!--                    <el-select-->
<!--                        size="medium"-->
<!--                        v-model="createForm.protocol"-->
<!--                        :placeholder="$t('lang.hint-protocol')"-->
<!--                    >-->
<!--                        <el-option-->
<!--                            v-for="(item, index) in protocolOptions"-->
<!--                            :key="index"-->
<!--                            :label="item.name"-->
<!--                            :value="item.value"-->
<!--                        ></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
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
                imei: [
                    {required: true, message: this.$t("lang.hint-IMEI"), trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-imei'), trigger: "blur"}
                ],
                mac: [
                    {required: true, message: this.$t("lang.hint-mac"), trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-mac'), trigger: "blur"}
                ],
                iotsim: [
                    {required: false, max: '50', message: this.$t("lang.long-iotsim"), trigger: "blur"}
                ]
            },
            baudOptions: [
                { value: "1200" },
                { value: "1600" },
                { value: "1800" },
                { value: "2400" }
            ],
            protocolOptions: [
                { name: "MQTT", value: "0" },
                { name: "HTTP", value: "1" },
                { name: "COAP", value: "2" },
                { name: "MODBUS", value: "3" }
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
        //添加设备
        create() {
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi
                    .create("device", this.createForm)
                    .then(res => {
                        this.$message.success(this.$t("lang.add-success"));
                        this.loading = false;
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false
                })
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
