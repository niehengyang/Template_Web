<template>
    <div>
        <el-row>
            <el-col>
                <el-card class="box-card" style="background: #fff">
                    <p>{{$t('lang.alarm-city')}}</p>
                    <div>
                        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data: function() {
        this.chartSettings = {
            labelMap: {
                地市: this.$t("lang.county"),
                故障告警: this.$t("lang.fault-alarm"),
                数据告警: this.$t("lang.alarm-data"),
                离线告警:this.$t('lang.alarm-offline')
            }
        };
        return {
            chartData: {
                columns: ["地市", "故障告警", "数据告警", "离线告警"],
                rows: []
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$api.restfulApi
                .list("statistical/typeToCountryAlarmNum")
                .then(res => {
                    //console.log(res)
                    res.forEach(item => {
                        this.chartData.rows.push({
                            地市: item.region_name,
                            故障告警: item.faultAlarmTotal,
                            数据告警: item.dataAlarmTotal,
                            离线告警: item.onfflineAlarmTotal
                        });
                    });
                });
        }
    }
};
</script>

<style scoped>
</style>