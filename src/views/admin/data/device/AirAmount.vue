<template>
    <div>
        <el-row v-loading="airLoading">
            <el-col :span="6">
                <el-card class="card">
                    <p class="mount">{{deviceTotal.base}}</p>
                    <p class="title" :title="$t('lang.air-amount')">{{$t('lang.air-amount')}}</p>
                    <div class="number clearfix">
                        <div class="left">
                            <p class="bottom_num">{{deviceTotal.internal}}</p>
                            <p class="bottom_tit">{{$t('lang.inside-machine')}}</p>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="right">
                            <p class="bottom_num">{{deviceTotal.external}}</p>
                            <p class="bottom_tit">{{$t('lang.outdoor-machine')}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="card">
                    <p class="mount">{{onlineDevices.base}}</p>
                    <p class="title" :title="$t('lang.air-online')">{{$t('lang.air-online')}}</p>
                    <div class="number clearfix">
                        <div class="left">
                            <p class="bottom_num">{{onlineDevices.internal}}</p>
                            <p class="bottom_tit">{{$t('lang.inside-machine')}}</p>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="right">
                            <p class="bottom_num">{{onlineDevices.external}}</p>
                            <p class="bottom_tit">{{$t('lang.outdoor-machine')}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="card">
                    <p class="mount">{{offlineDevices.base}}</p>
                    <p class="title" :title="$t('lang.air-offline')">{{$t('lang.air-offline')}}</p>
                    <div class="number clearfix">
                        <div class="left">
                            <p class="bottom_num">{{offlineDevices.internal}}</p>
                            <p class="bottom_tit">{{$t('lang.inside-machine')}}</p>
                        </div>
                        <div class="right">
                            <p class="bottom_num">{{offlineDevices.external}}</p>
                            <p class="bottom_tit">{{$t('lang.outdoor-machine')}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="card" style="margin-right: 0">
                    <p class="mount">{{faultDevices.base}}</p>
                    <p class="title" :title="$t('lang.alarm-total')">{{$t('lang.alarm-total')}}</p>
                    <div class="number clearfix">
                        <div class="left">
                            <p class="bottom_num">{{faultDevices.internal}}</p>
                            <p class="bottom_tit">{{$t('lang.inside-machine')}}</p>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="right">
                            <p class="bottom_num">{{faultDevices.external}}</p>
                            <p class="bottom_tit">{{$t('lang.outdoor-machine')}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "AirAmount",
        data(){
            return {
                airLoading: false,
                deviceTotal: {},
                onlineDevices: {},
                offlineDevices: {},
                faultDevices: {}
            }
        },
        created(){
            this.getList()
        },
        methods: {
           //处理数据三位加一个逗号
            commafy(num){
                return num && num.toString()
                    .replace(/(\d)(?=(\d{3})+\.)/g, ($1, $2) => $2 + ',')
            },
            //获取空调数据
            getList(){
                this.airLoading = true
                this.$api.restfulApi.list('statistical/deviceStatusToNum')
                    .then(res => {
                        console.log('top',res)
                        this.deviceTotal = res.deviceTotal
                        this.onlineDevices = res.onlineDevices
                        this.offlineDevices = res.offlineDevices
                        this.faultDevices = res.alarmDevices
                        this.airLoading = false
                        //console.log(this.deviceTotal)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .card{
        height: 201px;
        text-align: center;
        margin-right: 10px;
        background: #fff;
        .title{
            font-size: 18px;
            font-weight: bold;
            color: #666;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .mount{
            padding-bottom: 10px;
            font-size: 40px;
            font-weight: bold;
            color: #6CAFFE;
        }
        .number{
            .left{
                width: 50%;
                float: left;
                border-right: 1px solid #E4E4E4;
            }
            .right{
                width: 49%;
                float: right;
            }
            .bottom_num{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 22px;
                font-weight: bold;
                color: #999;
            }
            .bottom_tit{
                font-size: 14px;
                font-weight: 400;
                color: #666;
            }
        }
    }
</style>