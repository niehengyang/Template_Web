<template>
    <el-row>
        <el-col>
            <p>{{$t('lang.alarm-statistics')}}</p>
            <div class="pie-box">
                <type-select :title="$t('lang.hint-Dtype')" @change="getData" class="select"></type-select>
                <ve-pie :settings="chartSettings" :data="chartData"></ve-pie>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data () {
            this.chartSettings = {
                labelMap: {
                    '告警类型': this.$t('lang.alarm-type'),
                    '数量': this.$t('lang.amount')
                }
            }
            return {
                chartData: {
                    columns: ['告警类型', '数量'],
                    rows: [
                        { '告警类型': this.$t('lang.fault-alarm'), '数量': 0 },
                        { '告警类型': this.$t('lang.alarm-data'), '数量': 0 },
                        { '告警类型': this.$t('lang.offline'), '数量': 0 }
                    ]
                }
            }
        },
        methods: {
            getData(id){
                let params = {
                    type_id: id
                }
                this.$api.restfulApi.list('statistical/deviceTypeToAlarmNum', params)
                    .then(res => {
                        console.log(res)
                        this.chartData.rows[0]['数量'] = res.faultAlarmTotal
                        this.chartData.rows[1]['数量'] = res.dataAlarmTotal
                        this.chartData.rows[2]['数量'] = res.onfflineAlarmTotal
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .pie-box {
        position: relative;
        margin-top: 20px;
        .select{
            width: 100px;
            position: absolute;
            right: 0;
            top: -40px;
        }
    }
</style>