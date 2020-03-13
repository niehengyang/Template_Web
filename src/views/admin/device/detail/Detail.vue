<template>
    <div v-loading="loading">
        <!-- 面包屑 -->
        <bread-crumb
            :crumb-array="[{name:$t('lang.device-manage')}, {name:$t('lang.device-detail')}]"
        ></bread-crumb>

        <main-content>
            <!-- 设备基本信息 -->
            <div class="card-body">
                <el-row class="title">
                    <el-col :span="24" class="info">{{$t('lang.device-Dmsg')}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <span>{{$t('lang.device-name')}}：</span>
                        <span>{{info.name}}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{$t('lang.device-serial')}}：</span>
                        <span>{{info.serialno}}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{$t('lang.device-area')}}：</span>
                        <span>{{info.area_name}}</span>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="24">
                        <span>{{$t('lang.device-belongG')}}：</span>
                        <span>小组</span>
                    </el-col>
                </el-row>-->
                <el-row>
                    <el-col :span="8">
                        <span>{{$t('lang.device-type')}}：</span>
                        <span>{{info.type_name}}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{$t('lang.device-belongP')}}：</span>
                        <span>
                            <span v-if="info.belongto.type == '0'">{{$t('lang.vendor-admin')}}</span>
                            <span v-if="info.belongto.type == '1'">{{$t('lang.factory-tec')}}</span>
                            <span v-if="info.belongto.type == '2'">{{$t('lang.customer-manager')}}</span>
                            <span v-if="info.belongto.type == '3'">{{$t('lang.serviceman')}}</span>
                            <span v-if="info.belongto.type == '4'">{{$t('lang.client')}}</span>
                            -{{info.belongto.username}}
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <span>{{$t('lang.install-site')}}：</span>
                        <span
                            class="go-position"
                            @click="goPosition"
                        >{{info.province_name}}{{info.city_name}}{{info.county_name}}{{info.address}}</span>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </div>
            <!-- 网关信息 -->
            <div class="card-body">
                <el-row class="title">
                    <el-col :span="24" class="info">{{$t('lang.gateway-msg')}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <span>{{$t('lang.gatewayIMEI')}}：</span>
                        <span>{{info.gateway.imei}}</span>
                    </el-col>
                  
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <span>{{$t('lang.gatewayMac')}}：</span>
                        <span>{{info.gateway.mac}}</span>
                    </el-col>
                   
                </el-row>
                <el-divider></el-divider>
            </div>
            <!-- 设备内外机信息 -->
            <div class="card-body">
                <el-row class="title">
                    <el-col :span="24" class="info">{{$t('lang.inEx-msg')}}</el-col>
                </el-row>
                <el-row type="flex" justify="start" style="flex-wrap:wrap">
                    <div class="ex-card" v-for="item in info.externals" :key="item.id">
                        <external-card :external="item"></external-card>
                    </div>
                </el-row>
                <el-row type="flex" justify="start" style="flex-wrap:wrap">
                    <div class="ex-card" v-for="item in info.internals" :key="item.id">
                        <internal-card :internal="item"></internal-card>
                    </div>
                </el-row>
                <el-divider></el-divider>
            </div>
            <!-- 产品资料 -->
            <div class="card-body">
                <el-row class="title">
                    <el-col :span="24" class="info">{{$t('lang.product-data')}}</el-col>
                </el-row>
                <el-row>
                    <!-- 设备资料 -->
                    <el-col :span="8">
                        <el-row v-for="item in info.device_file" :key="item.id">
                            <el-col>
                                <span>{{$t('lang.device-data')}}：</span>
                                <span class="down-data" @click="downloaddevice(item.id)">{{item.original_name}}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- 故障资料 -->
                    <el-col :span="8">
                        <el-row v-for="item in info.fault_file" :key="item.id">
                            <el-col>
                                <span>{{$t('lang.fault-data')}}：</span>
                                <span
                                    class="down-data"
                                    @click="downloadfault(item.id)"
                                >{{item.original_name}}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </div>
        </main-content>
    </div>
</template>

<script>
import externalCard from "./ExternalCard";
import internalCard from "./InternalCard";

export default {
    data() {
        return {
            loading: false,
            //外机信息
            externals: [
                {
                    name: "外机1",
                    status: "01",
                    online_time: 120,
                    time_unit: "min"
                },
            ],
            //内机信息
            internals: [
                {
                    name: "内机1",
                    status: "01",
                    online_time: 57,
                    time_unit: "min",
                    model: "制冷",
                    s_wind: "高",
                    p_wind: "左右",
                    isLock: true,
                    isClock: false
                },
            ],
            info: {
                belongto: {},
                gateway: {}
            }
        };
    },
    created() {
        this.getDetail();
    },
    components: {
        "external-card": externalCard,
        "internal-card": internalCard
    },
    methods: {
        getDetail() {
            this.loading = true;
            this.$api.restfulApi
                .item("device", this.$route.params.device_id)
                .then(res => {
                    console.log("detail", res);
                    this.info = res;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false
            })
        },
        //下载故障资料
        downloadfault(id) {
            console.log(id);
            this.$api.restfulApi
                .list("faultfile/downloadfile", { id: id })
                .then(res => {
                    console.log(res);
                    let url = res.base_path
                    let btn = document.createElement("a");
                        btn.setAttribute('download',res.file_name);
                        btn.setAttribute('href',url);
                        btn.click();
                        btn.remove();
                });
        },
        //下载设备资料
        downloaddevice(id) {
            console.log(id);
            this.$api.restfulApi
                .list("devicefile/downloadfile", { id: id })
                .then(res => {
                    console.log(res);
                    let url = res.base_path
                    let btn = document.createElement("a");
                        btn.setAttribute('download',"");
                        btn.setAttribute('href',url);
                        btn.click();
                        btn.remove();
                });
        },
        goPosition() {
            this.$router.push("/devicemap?id=" + this.info.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.card-body {
    padding: 10px 20px;
    // border-bottom: 1px solid rgb(228, 228, 228);
    // box-shadow: rgba(228, 228, 228, 0.35) 5px 5px 5px;
    min-width: 710px;
    margin-bottom: 15px;
    .el-divider {
        background: #e4e4e4 !important;
    }
    .el-divider--horizontal {
        margin-top: 20px !important;
    }
    .el-row {
        text-align: left;
        margin-bottom: 10px;
        .down-data {
            color: #408bfc;
            cursor: pointer;
        }
        .ex-card {
            margin-right: 40px;
            margin-bottom: 10px;
        }
        .go-position {
            cursor: pointer;
            color: #408bfc;
        }
    }
    .title {
        margin-bottom: 30px;
        .info {
            color: #434343;
            font-size: 20px;
            font-weight: 400;
            position: relative;
            padding-left: 15px;
            line-height: 25px;
            &::before {
                content: "";
                position: absolute;
                height: 25px;
                left: 0;
                width: 4px;
                background: #6caffe;
            }
        }
    }
}
</style>