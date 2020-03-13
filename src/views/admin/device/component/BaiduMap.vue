<template>
    <div class="baidu-map">
        <div class="icon-state">
            <div>
                <img :src="urlObj.fault" />
                <span>{{$t('lang.device-fault')}}</span>
            </div>
            <div>
                <img :src="urlObj.normal" />
                <span>{{$t('lang.device-normal')}}</span>
            </div>
        </div>
        <baidu-map
            class="map"
            :center="center"
            :zoom="zoom"
            scroll-wheel-zoom
            @ready="changeCenterAndZoom"
        >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bml-marker-clusterer :averageCenter="true">  <!--//dragging="true"拖动-->
                <bm-marker
                v-for="(item,index) in markers"
                :key="index"
                :position="item.position"
                
                :icon="item.icon"
                @click="infoWindowOpen(item)"
            >
                <bm-info-window
                    :show="item.show"
                    @close="infoWindowClose(item)"
                    @open="infoWindowOpen(item)"
                >
                    <div class="info-window">
                        <div>{{$t('lang.device')}} {{item.serialno}}</div>
                        <el-divider></el-divider>
                        <div style="margin-top:5px">
                            <span v-if="item.status==0">{{$t('lang.offline')}}</span>
                            <span v-if="item.status==1">{{$t('lang.online')}}</span>
                            <span v-if="item.status==2">{{$t('lang.alarm')}}</span>
                            <span v-if="item.status==3">{{$t('lang.fault')}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span v-if="item.status==1">{{$t("lang.normal")}}</span>
                            <span v-if="item.status!=1">{{$t("lang.unusual")}}</span>
                        </div>
                        <div>{{$t('lang.detail-site')}}:{{item.address}}</div>
                    </div>
                </bm-info-window>
            </bm-marker>
            </bml-marker-clusterer>
            
        </baidu-map>
    </div>
</template>
<script>
// <device-map :device-list="deviceList"></device-map> 引用例子
// deviceList 结构
//     this.deviceList=[
//     {
//       id:1,
//       serialno:'NG002',
//       longitude:'121.5273285',
//       latitude:'31.21515044',
//       address:'',
//       status:'online',
//       county_name:'',
//       province_name:'',
//       city_name:'',
//     },
//  ]
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
    name: "device-map",
    // props: {
    //     deviceList: Array
    // },

    data() {
        return {
            //状态图标
            urlObj: {
                fault: require("@/assets/images/map/fault.png"),
                normal: require("@/assets/images/map/normal.png")
                // offLine: require("@/assets/images/map/off-line.png"),
                // onLine: require("@/assets/images/map/on-line.png")
            },
            markers: [],
            center: { lng: 116.404, lat: 39.915 },
            zoom: 5,
            deviceList: [],
            show: false
        };
    },
    components: {
        'bml-marker-clusterer':BmlMarkerClusterer,
    },
    created() {},
    methods: {
        //添加标记
        addMarks(devices) {
            let self = this;
            let markers = [];
            let windows = [];
            console.log("999999999999");
            for (let i = 0; i < devices.length; i++) {
                if (!devices[i].longitude || !devices[i].latitude) {
                    continue;
                }
                let address = "";
                if (devices[i].county_name) {
                    address +=
                        devices[i].province_name +
                        " " +
                        devices[i].city_name +
                        " " +
                        devices[i].county_name;
                }
                if (devices[i].address) {
                    address += devices[i].address;
                }
                if (address == "") {
                    address = this.$t("lang.unknow");
                }
                //初始化标记点
                this.markers.push({
                    index: this.markers.length,
                    position: {
                        lng: devices[i].longitude,
                        lat: devices[i].latitude
                    },
                    icon: {
                        url: self.getMarkerContent(devices[i].status),
                        size: { width: 26, height: 26 }
                    },
                    address: address,
                    serialno: devices[i].serialno,
                    status: devices[i].status,
                    show: false
                });
            }
        },
        // 根据设备设备状态设置不同图标
        getMarkerContent(status) {
            if (status == "0" || status == "2" || status == "3") {
                const iconImg = this.urlObj.fault;
                return iconImg;
            } else if (status == "1") {
                const iconImg = this.urlObj.normal;
                return iconImg;
            }
        },
        //zoom center的改变,添加mark
        changeCenterAndZoom() {
            console.log("--------deviceMap---watch centerAndzoom-----");
            //单个设备的位置在地图中center
            let url;
            if (this.$route.query.id != undefined) {
                url = "device/" + this.$route.query.id; //单设备查询地址
            } else {
                url = "device"; //多设备查询地址
            }
            this.$api.restfulApi.list(url).then(res => {
                if (this.$route.query.id != undefined) {
                    this.deviceList[0] = res;
                } else {
                    this.deviceList = res.data;
                }
                console.log("map-devices", this.deviceList);
                this.addMarks(this.deviceList);
                if (this.deviceList.length == 1) {
                    if (
                        this.deviceList[0].longitude &&
                        this.deviceList[0].latitude
                    ) {
                        this.center = {
                            lng: this.deviceList[0].longitude,
                            lat: this.deviceList[0].latitude
                        };
                        this.zoom = 6;
                    } else {
                        this.$message({
                            type: "warning",
                            message: this.$t("lang.no-position"),
                            duration: 4000
                        });
                    }
                }
                //多设备的位置在地图中center
                else {
                    this.center = { lng: 116.404, lat: 39.915 };
                    this.zoom = 5;
                }
            });
        },
        infoWindowClose(marker) {
            this.markers[marker.index].show = false;
        },
        infoWindowOpen(marker) {
            this.markers[marker.index].show = true;
        }
    }
};
</script>
<style lang="scss">
.baidu-map {
    .map {
        height: 500px;
        .info-window {
            .el-divider--horizontal {
                margin: 10px 0;
            }
        }
    }
    .icon-state {
        height: 60px;
        padding: 10px 0;
        margin: 0 30px;
        display: flex;
        align-items: center;
        div {
            margin: 0 10px;
            display: flex;
            align-items: center;
            img {
                width: 20px;
                height: 20px;
            }
            span {
                display: inline-block;
            }
        }
    }
    .box-card {
        position: relative;
        .close {
            position: absolute;
            top: 0;
            right: 0;
        }
        .header,
        .item {
            font-size: 14px;
            padding: 0 10px;
        }

        .header {
            letter-spacing: 1px;
            text-align: center;
            background-color: #f2f5fa;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 35px;
        }

        .item {
            line-height: 25px;
            margin: 10px 0;
            p {
                margin-bottom: 0;
            }

            .item-label {
                display: inline-block;
                vertical-align: top;
            }

            .item-con {
                display: inline-block;
                width: 138px;
            }

            .item-address {
                color: #777;
            }
        }
    }
}
</style>