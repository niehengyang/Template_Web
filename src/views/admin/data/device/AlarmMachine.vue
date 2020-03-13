<template>
    <div>
        <el-card class="box-card">
            <el-row>
                <el-col>
                    <p>{{$t('lang.alarm-statistics')}}</p>
                    <div>
                        <ve-line :data="chartData2" :settings="chartSettings2"></ve-line>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        this.chartSettings2 = {
            labelMap: {
                告警类型: this.$t("lang.alarm-type"),
                故障告警: this.$t("lang.fault-alarm"),
                数据告警: this.$t("lang.alarm-data"),
                离线告警: this.$t('lang.alarm-offline')
            }
        };
        return {

            chartData2: {
                columns: ["告警类型", "故障告警", "数据告警", "离线告警"],
                rows: []
            }
        };
    },
    created(){
        this.getList()
    },
    methods: {
        getList(){
            this.$api.restfulApi.list('statistical/deviceTypeToFaultNum').then(res => {
                console.log(res)
                res.forEach(item => {
                    this.chartData2.rows.push({
                        告警类型: item.typeName,
                        故障告警: item.faultAlarmTotal,
                        数据告警: item.dataAlarmTotal,
                        离线告警: item.onfflineAlarmTotal
                    })
                })
            })
        }
    }
};
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