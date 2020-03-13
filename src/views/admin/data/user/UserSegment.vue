<template>
    <div>
        <el-row>
            <el-col>
                <el-card class="box-card">
                    <p>{{$t('lang.nationwide-user')}}</p>
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
            // label: false
            labelMap: {
                位置: this.$t("lang.position"),
                用户: this.$t("lang.user")
            }
        };
        this.chartExtend = {
            series: {
                nameMap: county
            }
        };
        return {
            chartData: {
                columns: ["位置", "用户"],
                rows: []
            }
        };
    },
    created(){
        this.getList()
    },
    methods: {
        getList(){
            this.$api.restfulApi.list("statistical/adminCounty").then(res => {
                console.log('map', res)
                res.forEach(item => {
                    this.chartData.rows.push({
                        位置: item.regin_name,
                        用户: item.airConUser
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