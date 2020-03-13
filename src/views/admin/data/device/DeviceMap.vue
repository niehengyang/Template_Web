<template>
    <div>
        <el-row>
            <el-col>
                <el-card class="box-card">
                    <p>{{$t('lang.device-map')}}</p>
                    <div>
                        <ve-map :data="chartData" :extend="chartExtend" :settings="chartSettings"></ve-map>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import county from "@/utils/county";
export default {
    data() {
        this.chartSettings = {
            position: "china",
            label: false,
            labelMap:{
                位置:this.$t('lang.position'),
                设备在线总数:this.$t('lang.device-onlineN'),
                设备故障总数:this.$t('lang.device-faultN')
            }
        };
        this.chartExtend = {
            series: {
                nameMap: county
            }
        };
        return {
            chartData: {
                columns: ["位置", "设备在线总数", "设备故障总数"],
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
                .list("statistical/countryToDeviceNum")
                .then(res => {
                    //console.log(res)
                    res.forEach(item => {
                        this.chartData.rows.push({
                            位置: item.region_name,
                            设备在线总数: item.deviceTotal,
                            设备故障总数: item.deviceStatusFault
                        });
                    });
                });
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