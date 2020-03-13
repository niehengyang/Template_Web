<template>
    <div>
        <el-row>
            <el-col>
                <p>{{$t('lang.type-stats')}}</p>
                <div>
                    <ve-bar :settings="chartSettings" :data="chartData"></ve-bar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            this.chartSettings = {
                labelMap: {
                    '类型': this.$t('lang.type'),
                    '数量': this.$t('lang.amount')
                }
            }
            return {
                chartData: {
                    columns: ['类型', '数量'],
                    rows: []
                }
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                this.$api.restfulApi.list('statistical/deviceTypeToFaultNum')
                    .then(res => {
                        //console.log(res)
                        res.forEach(item => {
                            this.chartData.rows.push({'类型': item.typeName, '数量': item.deviceTotal})
                        })
                    })
            }
        }
    }
</script>

<style scoped>

</style>