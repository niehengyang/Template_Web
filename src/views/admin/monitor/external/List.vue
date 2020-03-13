<template>
    <div class="ex-list">
        <!-- 卡片式数据 -->
        <el-row type="flex" :gutter="10" class="mwidth-t">
            <el-col :span="4" v-if="params.model!=undefined">
                <div class="card">
                    <p class="value">{{params.model}}</p>
                    <p class="name">{{$t('lang.model')}}</p>
                </div>
            </el-col>
            <el-col :span="4" v-if="params.runMode!=undefined">
                <div class="card">
                    <p class="value">{{$t("lang.mode"+params.runMode+"")}}</p>
                    <p class="name">{{$t('lang.runMode')}}</p>
                </div>
            </el-col>

            <el-col :span="4" v-if="params.power!=undefined">
                <div class="card">
                    <p class="value">{{params.power}}</p>
                    <p class="name">{{$t('lang.ex-power')}}</p>
                </div>
            </el-col>
            <el-col :span="4" v-if="params.temperature4!=undefined">
                <div class="card">
                    <p class="value">{{params.temperature4}}</p>
                    <p class="name">{{$t('lang.ex-temperature4')}}</p>
                </div>
            </el-col>
            <el-col :span="4" v-if="params.operatingAbility!=undefined">
                <div class="card">
                    <p class="value">{{params.operatingAbility}}</p>
                    <p class="name">{{$t('lang.operatingAbility')}}</p>
                </div>
            </el-col>
            <el-col :span="4" v-if="params.temperature3!=undefined">
                <div class="card">
                    <p class="value">{{params.temperature3}}</p>
                    <p class="name">{{$t('lang.ex-temperature3')}}</p>
                </div>
            </el-col>
        </el-row>

        <el-row class="mwidth-b">
            <div class="left">
                <!-- 高压数据 -->
                <div class="list-box" v-if="params.highVoltage!=undefined">
                    <p class="name">{{$t('lang.highVoltage')}}</p>
                    <p class="value">{{params.highVoltage}}</p>
                </div>
                <!-- 低压数据 -->
                <div class="list-box" v-if="params.lowVoltage!=undefined">
                    <p class="name">{{$t('lang.lowVoltage')}}</p>
                    <p class="value">{{params.lowVoltage}}</p>
                </div>
                <!-- 电子膨胀阀 -->
                <div class="list-box" v-if="params.expansion1!=undefined">
                    <p class="name">{{$t('lang.expansion1')}}</p>
                    <p
                        class="value"
                        style="color:#999999"
                    >{{params.expansion1==0?$t('lang.off'):$t('lang.on')}}</p>
                </div>
                <div class="list-box" v-if="params.expansion2!=undefined">
                    <p class="name">{{$t('lang.expansion2')}}</p>
                    <p
                        class="value"
                        style="color:#999999"
                    >{{params.expansion2==0?$t('lang.off'):$t('lang.on')}}</p>
                </div>
                <!-- 外机运行状态 -->
                <!-- <div class="list-box">
                    <p class="name">{{$t('lang.runStatus')}}</p>
                    <p
                        class="value"
                        style="color:#999999"
                    >{{params.runStatus==0?$t('lang.off'):$t('lang.on')}}</p>
                </div>-->
                <!-- 风机运行状态 -->
                <!-- <div class="list-box">
                    <p class="name">{{$t('lang.windRunStatus')}}</p>
                    <p
                        class="value"
                        style="color:#999999"
                    >{{params.windRunStatus==0?$t('lang.off'):$t('lang.on')}}</p>
                </div>-->
            </div>
            <div class="middle">
                <!-- 变频压缩机 -->
                <div class="list-box" v-if="params.inverterCompressor!=undefined">
                    <p class="name">{{$t('lang.inverterCompressor')}}</p>
                    <table class="table">
                        <tr>
                            <td>{{$t('lang.temperatureA1')}}</td>
                            <td>{{params.inverterCompressor.temperatureA1}}°C</td>
                            <td>{{$t('lang.currentA')}}</td>
                            <td>{{params.inverterCompressor.currentA}}A</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.temperatureA2')}}</td>
                            <td>{{params.inverterCompressor.temperatureA2}}°C</td>
                            <td>{{$t('lang.frequencyA')}}</td>
                            <td>{{params.inverterCompressor.frequencyA}}Hz</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.temperatureB1')}}</td>
                            <td>{{params.inverterCompressor.temperatureB1}}°C</td>
                            <td>{{$t('lang.currentB')}}</td>
                            <td>{{params.inverterCompressor.currentB}}A</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.temperatureB2')}}°C</td>
                            <td>{{params.inverterCompressor.temperatureB2}}°C</td>
                            <td>{{$t('lang.frequencyB')}}</td>
                            <td>{{params.inverterCompressor.frequencyB}}Hz</td>
                        </tr>
                    </table>
                </div>
                <!-- 电磁阀状态 -->
                <div class="list-box" v-if="params.solenoidValveStatus!=undefined">
                    <p class="name">{{$t('lang.solenoidValveStatus')}}</p>
                    <table class="table">
                        <tr>
                            <td>{{$t('lang.st1')}}</td>
                            <td>{{params.solenoidValveStatus.st1==0?$t('lang.off'):$t('lang.on')}}</td>
                            <td>{{$t('lang.sv3')}}</td>
                            <td>{{params.solenoidValveStatus.sv3==0?$t('lang.off'):$t('lang.on')}}</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.st2')}}</td>
                            <td>{{params.solenoidValveStatus.st2==0?$t('lang.off'):$t('lang.on')}}</td>
                            <td>{{$t('lang.sv4')}}</td>
                            <td>{{params.solenoidValveStatus.sv4==0?$t('lang.off'):$t('lang.on')}}</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.sv1')}}</td>
                            <td>{{params.solenoidValveStatus.sv1==0?$t('lang.off'):$t('lang.on')}}</td>
                            <td>{{$t('lang.sv5')}}</td>
                            <td>{{params.solenoidValveStatus.sv5==0?$t('lang.off'):$t('lang.on')}}</td>
                        </tr>
                        <tr>
                            <td>{{$t('lang.sv2')}}</td>
                            <td>{{params.solenoidValveStatus.sv2==0?$t('lang.off'):$t('lang.on')}}</td>
                            <td>{{$t('lang.sv6')}}</td>
                            <td>{{params.solenoidValveStatus.sv6==0?$t('lang.off'):$t('lang.on')}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="right">
                <div>
                    <!-- 故障状态 -->
                    <div class="list-box" v-if="params.faultStatus!=undefined">
                        <p class="name">{{$t('lang.faultStatus')}}</p>
                        <p v-if="params.faultStatus.length==0"  style="color:#999999;font-size:16px;font-weight:bold">无</p>
                        <p
                            class="fault-v"
                            v-for="(item,index) in params.faultStatus"
                            :key="index"
                        >{{item.message}}</p>
                    </div>
                    <!-- 保护状态 -->
                    <div class="list-box" v-if="params.protectionStatus!=undefined">
                        <p class="name">{{$t('lang.protectionStatus')}}</p>
                        <p
                            v-if="params.protectionStatus.length==0"
                            style="color:#999999;font-size:16px;font-weight:bold"
                        >无</p>
                        <p
                            class="pro-v"
                            v-for="(item,index) in params.protectionStatus"
                            :key="index"
                        >{{item.message}}</p>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    props: ["paramList"],
    data() {
        return {};
    },
    computed: {
        params: function() {
            return this.paramList;
        }
    },
    created() {}
};
</script>
<style lang="scss">
@media screen {
    .ex-list {
        .mwidth-t {
            min-width: 964px;
            .card {
                min-width: 60px;
                min-height: 60px;
                border: 1px solid #e4e4e4;
                padding: 10px 15px;
                border-radius: 4px;
                .value {
                    text-align: center;
                    color: #408bfc;
                    font-size: 20px;
                    font-weight: bold;
                    @media (max-width: 1280px) {
                        font-size: 16px;
                    }
                }
                .name {
                    text-align: center;
                    margin-top: 5px;
                    font-size: 14px;
                    // @media (max-width: 1280px) {
                    //     font-size: 13px;
                    // }
                }
            }
        }
        .mwidth-b {
            min-width: 708px;
            display: flex;
            .left {
                display: flex;
                flex-wrap: wrap;
                width: 25%;
                justify-content: space-between;
            }
            .list-box {
                min-width: 60px;
                min-height: 60px;
                padding: 20px 20px 10px 0;
                .name {
                    text-align: left;
                    padding-left: 10px;
                    margin-bottom: 10px;
                    line-height: 15px;
                    position: relative;
                    font-size: 16px;
                    @media (max-width: 1280px) {
                        font-size: 13px;
                    }
                    &:before {
                        content: "";
                        position: absolute;
                        height: 15px;
                        width: 6px;
                        background: #6caffe;
                        left: 0;
                    }
                }
                .fault-v {
                    text-align: left;
                    padding-left: 10px;
                    color: #ec4343;
                    font-size: 20px;
                    font-weight: bold;
                    @media (max-width: 1280px) {
                        font-size: 16px;
                    }
                }
                .pro-v {
                    text-align: left;
                    padding-left: 10px;
                    color: #999;
                    font-size: 20px;
                    font-weight: bold;
                    @media (max-width: 1280px) {
                        font-size: 16px;
                    }
                }
                .value {
                    text-align: left;
                    padding-left: 10px;
                    color: #408bfc;
                    font-size: 20px;
                    font-weight: bold;
                    @media (max-width: 1280px) {
                        font-size: 16px;
                    }
                }
            }
            .middle {
                display: flex;
                width: 55%;
                justify-content: flex-end;
                @media (max-width: 1280px) {
                    width: 60%;
                }
                .table {
                    border-top: 1px solid #e4e4e4;
                    border-left: 1px solid #e4e4e4;
                    td {
                        padding: 10px;
                        text-align: center;
                        border-right: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        @media (max-width: 1280px) {
                            font-size: 12px;
                        }
                    }
                }
            }
            .right {
                width: 20%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                @media (max-width: 1280px) {
                    width: 15%;
                }
                .list-box {
                    padding: 20px 30px 10px 0;
                }
            }
        }
    }
}
</style>