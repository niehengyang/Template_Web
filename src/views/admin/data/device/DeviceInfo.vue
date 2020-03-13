<template>
    <div>
        <el-card class="box-card">
            <el-row>
                <el-col>
                    <p>{{$t('lang.alarm-inOut')}}</p>
                    <div>
                        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "DeviceInfo",
        data(){
            this.chartSettings = {
                labelMap: {
                    告警类型: this.$t("lang.alarm-type"),
                    内机告警数量: this.$t("lang.inAlarm-num"),
                    外机告警数量: this.$t("lang.exAlarm-num"),
                }
            };
            return {
                chartData: {
                    columns: ["告警类型", "内机告警数量", "外机告警数量"],
                    rows: []
                },
            }
        },
        created(){
            this.getInOut()
        },
        methods: {
            getInOut(){
                this.$api.restfulApi.list('statistical/alldeviceAlarm').then(res => {
                    console.log('inout',res)
                    this.chartData.rows.push({
                        告警类型: this.$t("lang.alarm-data"),
                        内机告警数量: res.internalAlarmNum.ruleAlarmNum,
                        外机告警数量: res.externalAlarmNum.ruleAlarmNum
                    },{
                        告警类型: this.$t("lang.fault-alarm"),
                        内机告警数量: res.internalAlarmNum.faultAlarmNum,
                        外机告警数量: res.externalAlarmNum.faultAlarmNum
                    },{
                        告警类型: this.$t("lang.alarm-offline"),
                        内机告警数量: res.internalAlarmNum.offlineAlarmNum,
                        外机告警数量: res.externalAlarmNum.offlineAlarmNum
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .box-card {
        background: #fff;
        p {
            font-size: 18px;
            font-weight: bold;
            color: #666666;
        }
    }
</style>