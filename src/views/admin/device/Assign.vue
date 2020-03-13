<template>
    <div>
        <!-- 分配设备dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.device-assign')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="allotForm"
                ref="allotForm"
                :rules="allotFormRules"
                label-position="right"
                label-width="140px"
                v-loading="loading"
            >
                <el-form-item prop="area_id" :label="$t('lang.belong-area')">
                    <area-select v-model="allotForm.area_id"></area-select>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.assign-user')"
                    prop="admin_type"
                    v-if="loginType==userType.SystemChigo || loginType ==userType.SuperAdmin"
                >
                    <template>
                        <div>
                            <el-select
                                v-model="allotForm.admin_type"
                                :placeholder="$t('lang.hint-assignUser')"
                                style="margin-bottom:10px"
                                @change="changeRules('allotForm')"
                            >
                                <el-option
                                    :label="$t('lang.customer-manager')"
                                    :value="userType.SalesManager"
                                ></el-option>
                                <el-option :label="$t('lang.client')" :value="userType.AirConUser"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.customer-manager')"
                    prop="saleManager"
                    v-if="allotForm.admin_type==userType.SalesManager"
                >
                    <template>
                        <el-select
                            v-model="allotForm.saleManager"
                            :placeholder="$t('lang.hint-UTM')"
                            @visible-change="getUser"
                        >
                            <el-option
                                v-for="item in userOptions"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.client')"
                    prop="airConUser"
                    v-if="allotForm.admin_type==userType.AirConUser"
                >
                    <template>
                        <el-select
                            v-model="allotForm.airConUser"
                            :placeholder="$t('lang.hint-client')"
                            @visible-change="getUser"
                        >
                            <el-option
                                v-for="item in userOptions"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item
                    :label="$t('lang.install-time')"
                    v-if="allotForm.admin_type==userType.AirConUser"
                >
                    <el-date-picker
                        v-model="allotForm.access_at"
                        align="right"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('lang.hint-Sdate')"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    :label="$t('lang.install-site')"
                    v-if="allotForm.admin_type==userType.AirConUser"
                >
                    <region-select
                        :province="allotForm.province"
                        :city="allotForm.city"
                        :county="allotForm.county"
                        v-on:regionselect="doneRegionSelect"
                    ></region-select>
                </el-form-item>
                <el-form-item prop="address" v-if="allotForm.admin_type==userType.AirConUser">
                    <el-input
                        size="medium"
                        v-model="allotForm.address"
                        :placeholder="$t('lang.hint-addres')"
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
                    @click="assign"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import RegionSelect from "@/components/RegionSelect";
export default {
    props: ["dialogVisible", "devicesId"],
    data() {
        return {
            visible: false,
            loading: false,
            allotForm: {},
            allotFormRules: {
                admin_type: [
                    {
                        required: true,
                        message: this.$t("lang.hint-assignUser"),
                        trigger: "blur"
                    }
                ],
                area_id: [
                    {
                        required: true,
                        message: this.$t("lang.hint-area"),
                        trigger: "blur"
                    }
                ]
            },
            userOptions: []
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
            if (newVal) {
                if (this.loginType == this.userType.SalesManager) {
                    this.allotForm.admin_type = this.userType.AirConUser;
                    this.allotFormRules.airConUser = [
                        {
                            required: true,
                            message: this.$t("lang.hint-client"),
                            trigger: "blur"
                        }
                    ];
                }
                this.allotForm.devicesId=this.devicesId;
            }
        }
    },
    created() {},
    components: {
        "region-select": RegionSelect
    },
    methods: {
        //分配设备
        assign() {
            console.log(this.allotForm)
            this.$refs["allotForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.post("device/divide", this.allotForm).then(() => {
                    this.$message.success(this.$t("lang.assign-success"));
                    this.loading = false;
                    this.$emit("assign-success");
                }).catch(err => {
                    this.loading = false
                })
            });
        },
        //获取对应用户
        getUser() {
            console.log(0);
            this.allotFormRules.saleManager = [];
            this.allotFormRules.airConUser = [];
            this.$refs.allotForm.validate(valid => {
                if (!valid) return;
                this.$api.restfulApi
                    .list("admin/user", {
                        area_id: this.allotForm.area_id,
                        admin_type: this.allotForm.admin_type
                    })
                    .then(res => {
                        console.log("userList", res.data);
                        this.userOptions = res.data;
                    });
            });
            this.allotFormRules.saleManager = [
                {
                    required: true,
                    message: this.$t("lang.hint-UTM"),
                    trigger: "blur"
                }
            ];
            this.allotFormRules.airConUser = [
                {
                    required: true,
                    message: this.$t("lang.hint-client"),
                    trigger: "blur"
                }
            ];
        },

        //改变allotFormRules
        changeRules(formName) {
            this.userOptions = [];
            if (this[formName].admin_type == this.userType.SalesManager) {
                this.allotForm.airConUser = "";
                this[formName + "Rules"].saleManager = [
                    {
                        required: true,
                        message: this.$t("lang.hint-UTM"),
                        trigger: "blur"
                    }
                ];
            } else if (this[formName].admin_type == this.userType.AirConUser) {
                this.allotForm.salesManager = "";
                this[formName + "Rules"].airConUser = [
                    {
                        required: true,
                        message: this.$t("lang.hint-client"),
                        trigger: "blur"
                    }
                ];
            }
        },
        //关闭
        close() {
            this.resetForm("allotForm");
            this.$emit("dialog-close");
        },
        //区域组件选中值赋给当前表单
        doneRegionSelect(province, city, county) {
            this.allotForm.province = province;
            this.allotForm.city = city;
            this.allotForm.county = county;
        }
    }
};
</script>

<style scoped lang="scss">
</style>
