<template>
    <div>
        <main-content>
            <el-timeline>
                <el-timeline-item :timestamp="$t('lang.userInfo')" placement="top" color="#0bbd87">
                    <el-card>
                        <div class="info">
                            <div class="left_info">
                                <ul>
                                    <li><span>{{$t('lang.user-account')}}：</span><span>zhigao001</span></li>
                                    <li><span>{{$t('lang.user-name')}}：</span><span>志高</span></li>
                                    <li><span>{{$t('lang.cellphone')}}：</span><span>159249879157</span></li>
                                    <li><span>{{$t('lang.user-level')}}：</span><span>厂商系统管理员</span></li>
                                </ul>
                            </div>
                            <div class="right_info">
                                <ul>
                                    <li><span>{{$t('lang.email')}}：</span><span>32423@chigao</span></li>
                                    <li><span>{{$t('lang.user-role')}}：</span><span>维修人员</span></li>
                                    <li><span>{{$t('lang.user-area')}}：</span><span>云南域</span></li>
                                    <li><span>{{$t('lang.user-status')}}：</span><span>启用</span></li>
                                </ul>
                            </div>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item :timestamp="$t('lang.user-device')" placement="top" color="#0bbd87">
                    <el-card>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="device_num" :label="$t('lang.device-number')"></el-table-column>
                            <el-table-column prop="device_type" :label="$t('lang.device-type')"></el-table-column>
                            <el-table-column prop="gateway" :label="$t('lang.gateway-IEMT')"></el-table-column>
                            <el-table-column prop="iot_card" :label="$t('lang.iot-card')"></el-table-column>
                            <el-table-column prop="device_status" :label="$t('lang.deviceStatus')"></el-table-column>
                        </el-table>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </main-content>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return{
                tableData: [
                    {
                        device_num: '2343SC0423',
                        device_type: '多联机',
                        gateway: '89765421',
                        iot_card: '123456789',
                        device_status: '离线'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .left_info{
        float: left;
    }
    .left_info li{
        margin-bottom: 8px;
    }
    .right_info{
        margin-left: 260px;
        flaot: right;
    }
    .right_info li{
       margin-bottom: 8px;
    }

</style>