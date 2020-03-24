<template>
    <div class="bar-box">
        <ve-bar :data="chartData" :colors="chartColors" :settings="chartSettings" height="300px"></ve-bar>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        this.chartColors = ["#F56C6C", "#00cc99"];
        this.chartSettings = {
            labelMap: {
                类型: this.$t("lang.type"),
                故障数量: this.$t("lang.fault-count"),
                总数量:this.$t("lang.total-num")
            }
        };
        return {
            chartData: {
                columns: [],
                rows: []
            }
        };
    },
    watch: {},
    created() {
        this.getData();
    },
    components: {},
    methods: {
        //按设备类型统计故障数
        getData() {
            this.$api.restfulApi
                .list("statistical/deviceTypeToFaultNum")
                .then(res => {
                    console.log("Type-FaultNum", res);
                    this.chartData.columns = ["类型", "故障数量", "总数量"];
                    for (let i = 0; i < res.length; i++) {
                        this.chartData.rows[i] = {
                            类型: res[i].typeName,
                            故障数量: res[i].faultAlarmTotal,
                            总数量: res[i].deviceTotal
                        };
                    }
                    console.log(this.chartData);
                });
        }
    }
};
</script>

<style lang="scss">
</style>
