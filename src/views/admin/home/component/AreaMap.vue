<template>
    <div class="map-box">
        <div class="vmap-box">
            <ve-map
                :data="chartData"
                :settings="chartSettings"
                :colors="chartColors"
                :events="chartEvents"
                :height="screenWidth<1280?'700px':'500px'"
                :extend="chartExtend"
            ></ve-map>
        </div>

        <div class="circle-box">
            <div class="circle">
                <p class="num blue">{{numSingle.internal}}</p>
                <p class="text">{{$t('lang.internal-num')}}</p>
            </div>
            <div class="circle">
                <p class="num blue">{{numSingle.external}}</p>
                <p class="text">{{$t('lang.external-num')}}</p>
            </div>
            <div class="circle">
                <p class="num red">{{numSingle.internalAlarmNum}}</p>
                <p class="text">{{$t('lang.internal-alarm')}}</p>
            </div>
            <div class="circle">
                <p class="num red">{{numSingle.externalAlarmNum}}</p>
                <p class="text">{{$t('lang.external-alarm')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import county from "@/utils/county";
export default {
    props: [],
    data() {
        this.chartColors = ["#00cc99", "#F56C6C"];
        this.chartSettings = {
            position: "china",
            label: false,
            itemStyle: {
                normal: {
                    borderColor: "#ffffff",
                    areaColor: "#99CCFF"
                }
            },
            labelMap: {
                位置: this.$t("lang.position"),
                设备在线总数: this.$t("lang.device-onlineN"),
                设备故障总数: this.$t("lang.device-faultN")
            }
        };
        this.chartExtend = {
            series: {
                nameMap: county
            }
        };
        const self = this;
        this.chartEvents = {
            MouseOver: function(e) {
                self.cityName = e.name;
            },
            MouseOut: function() {
                self.cityName = "";
            }
        };
        return {
            chartData: {
                columns: ["位置", "设备在线总数", "设备故障总数"],
                rows: []
            },
            screenWidth: "",
            cityName: "",
            numSingle: {
                region_name: "",
                internal: 0,
                external: 0,
                internalAlarmNum: 0,
                externalAlarmNum: 0
            },
            numArr: []
        };
    },
    mounted() {
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
            })();
        };
    },
    watch: {
        cityName: function(newVal) {
            for (let i = 0; i < this.numArr.length; i++) {
                if (this.numArr[i].region_name == newVal) {
                    this.numSingle = this.numArr[i];
                    // console.log(this.numSingle);
                    break;
                } else {
                    this.numSingle = {
                        region_name: "",
                        internal: 0,
                        external: 0,
                        internalAlarmNum: 0,
                        externalAlarmNum: 0
                    };
                }
            }
        }
    },
    created() {
        this.getData();
        console.log("000", this.screenWidth);
    },
    components: {},
    methods: {
        //按国家统计设备
        getData() {
            this.$api.restfulApi
                .list("statistical/countryToDeviceNum")
                .then(res => {
                    console.log("county", res);
                    for (let i = 0; i < res.length; i++) {
                        this.chartData.rows.push({
                            位置: res[i].region_name,
                            设备在线总数: res[i].deviceTotal,
                            设备故障总数: res[i].deviceStatusFault
                        });
                    }
                    this.numArr = res;
                });
        }
    }
};
</script>

<style lang="scss">
.map-box {
    .circle-box {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        .circle {
            @media (max-width: 1280px) {
                width: 120px;
            }
            text-align: center;
            width: 90px;
            height: 70px;
            border: 1px solid #e6e6e6;
            background: #ffffff;
            padding: 10px 10px;
            margin: 0 5px;
            .text {
                color: #999999;
                font-weight: 400;
            }
            .num {
                @media screen and (min-width: 1280) {
                    font-size: 30px;
                }
                font-size: 20px;
            }
            .blue {
                color: #add3ff;
            }
            .red {
                color: #ff6a6a;
            }
        }
    }
}
</style>
