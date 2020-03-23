<template>
    <div class="home">
        <el-row class="top">
            <el-col :span="8">
                <device-stats
                    :total="deviceTotal.base"
                    :normal="onlineDevices.base"
                    :offline="offlineDevices.base"
                ></device-stats>
            </el-col>
            <el-col :span="8">
                <alarm-stats></alarm-stats>
            </el-col>
            <el-col :span="8">
                <inex-stats :internal="deviceTotal.internal" :external="deviceTotal.external"></inex-stats>
            </el-col>
        </el-row>
        <el-row class="bottom" type="flex" justify="space-between">
            <el-col :span="11" class="left">
                <area-map></area-map>
            </el-col>
            <el-col :span="13" class="right">
                <el-row class="right-t">
                    <p class="title">{{$t('lang.alarm-stats')}}</p>
                    <el-col>
                        <alarm-table></alarm-table>
                    </el-col>
<!--                    <el-col :span="12">-->
<!--                        <alarm-line></alarm-line>-->
<!--                    </el-col>-->
                </el-row>
                <el-row class="right-b">
                    <el-col class="title">{{$t('lang.type-stats')}}</el-col>
                    <el-col :span="12">
                        <type-fault></type-fault>
                    </el-col>
                    <el-col :span="12">
                        <type-alarm></type-alarm>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import deviceStats from "./component/DeviceStats";
import alarmStats from "./component/alarmStats";
import inExStats from "./component/InExStats";
import alarmTable from "./component/AlarmTable";
import alarmLine from "./component/AlarmLine";
import typeAlarm from "./component/TypeAlarm";
import typeFault from "./component/TypeFault";
import areaMap from "./component/AreaMap";

export default {
    data() {
        return {
            deviceTotal: {

            },
            faultDevices: {},
            offlineDevices: {},
            onlineDevices: {}
        };
    },
    components: {
        "device-stats": deviceStats,
        "alarm-stats": alarmStats,
        "inex-stats": inExStats,
        "alarm-table": alarmTable,
        "alarm-line": alarmLine,
        "type-alarm": typeAlarm,
        "type-fault": typeFault,
        "area-map": areaMap
    },
    created() {
        this.getDeviceStatusData();
    },
    methods: {
        //按空调状态统计
        getDeviceStatusData() {
            this.$api.restfulApi
                .list("statistical/deviceStatusToNum")
                .then(res => {
                    console.log('deviceStatus',res);
                    this.deviceTotal = res.deviceTotal;
                    this.faultDevices = res.faultDevices;
                    this.offlineDevices = res.offlineDevices;
                    this.onlineDevices = res.onlineDevices;
                });
        },
       
    }
};
</script>

<style lang="scss">
.home {
    @media screen {
        .top {
            @media (max-width: 1024px) {
                width: 910px;
            }
            .stats-card {
                padding: 20px 30px;
                min-width: 300px;
                min-height: 170px;
                background: #ffffff;
                margin-right: 10px;
                .title {
                    color: #666666;
                    font-size: 18px;
                    margin-bottom: 40px;
                    font-weight: bold;
                }
                .stats-num {
                    text-align: center;
                    .num {
                        @media (min-width: 1280px) {
                            font-size: 40px;
                        }
                        min-width: 90px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 30px;
                        color: #add3ff;
                        font-weight: bold;
                        padding: 5px;
                    }
                    .text {
                        color: #999999;
                        font-weight: 300;
                    }
                }
            }
        }
        .bottom {
            @media (max-width: 1024px) {
                width: 910px;
            }
            @media (max-width: 1280px) {
                flex-wrap: wrap;
            }
            margin-top: 30px;
            margin-bottom: 30px;

            .left {
                height: 690px;
                background: #ffffff;
                padding: 20px;
                margin-right: 10px;
                @media (max-width: 1280px) {
                    width: 100%;
                    margin-bottom: 10px;
                    margin-right: 0;
                    height: unset;
                }
            }
            .right {
                @media (max-width: 1280px) {
                    width: 100%;
                }
                .title {
                    font-size: 18px;
                    color: #333333;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .right-t {
                    background: #ffffff;
                    margin-bottom: 10px;
                    padding: 20px;
                    height: 340px;
                }
                .right-b {
                    background: #ffffff;
                    padding: 20px;
                    height: 340px;
                }
            }
        }
    }
}
</style>
