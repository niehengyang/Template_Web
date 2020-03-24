<template>
    <div class="line-box">
        <el-select v-model="searchKey" :placeholder="$t('lang.cycle')">
            <el-option
                v-for="item in selArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <ve-histogram :data="chartData" height="300px" :settings="chartSettings"></ve-histogram>
        <!-- <div class="check-box">
            <el-checkbox-group v-model="checkList" @change="changeSel">
                <el-checkbox :label="$t('lang.fault-alarm')" checked></el-checkbox>
                <el-checkbox :label="$t('lang.alarm-data')"></el-checkbox>
                <el-checkbox :label="$t('lang.alarm-offline')"></el-checkbox>
            </el-checkbox-group>
        </div> -->
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        let self = this;
        this.chartSettings = {
            // labelMap: {
            //     类型: this.$t("lang.type"),
            //     故障告警: this.$t("lang.fault-alarm"),
            //     // 数据告警:$t('lang.alarm-data'),
            //     // 离线告警:$t('lang.alarm-offline')
            // }
        };
        return {
            selArr: [
                { value: "01", label: this.$t("lang.week") },
                { value: "02", label: this.$t("lang.month") },
                { value: "03", label: this.$t("lang.season") },
                { value: "04", label: this.$t("lang.year") }
            ],
            searchKey: "",
            chartData: {
                columns: ["type", "fault"],
                rows: [
                    { type: "类型1", fault: 11 },
                    { type: "类型2", fault: 17 },
                    { type: "类型3", fault: 1 }
                ]
            },
            checkList: []
        };
    },
    created() {},
    components: {},
    methods: {
        changeSel(val) {
            console.log(val);
            // for (let i = 1; i < val.length + 1; i++) {
            //     this.chartData.column[i] = val[i];
            // } 
            this.chartData.columns[0] = "type";
            this.chartData.rows[0].type = "类型0";
            for (let i = 0; i < val.length; i++) {
                let j = i + 1;
                
                if (val[i] == this.$t("lang.fault-alarm")) {
                    console.log('fault',this.chartData)
                    this.chartData.columns[j] = "fault";
                    this.chartData.rows[0].fault = i+9;
                }
                if (val[i] == this.$t("lang.alarm-data")) {
                    console.log('data',this.chartData)

                    this.chartData.columns[j] = "data";
                    this.chartData.row[0].data = i+10;
                }
                if (val[i] == this.$t("lang.alarm-offline")) {
                    console.log('offline',this.chartData)

                    this.chartData.columns[j] = "offline";
                    this.chartData.row[0].offline =i+11;
                }
            }
            // console.log(this.chartData)
        }
    }
};
</script>

<style lang="scss">
.line-box {
    position: relative;
    .el-select {
        width: 100px;
        float: right;
        position: absolute;
        right: 0;
        top: -45px;
    }
    .check-box {
        position: absolute;
        bottom: 30px;
        display: flex;
        justify-content: center;
        width: 100%;
        .el-checkbox__label {
            font-size: 12px;
        }
    }
}
</style>
