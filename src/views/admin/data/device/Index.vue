<template>
    <div>
        <el-row>
            <air-amount></air-amount>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-card style="background: #fff">
                <el-col :span="12">
                    <type-statis></type-statis>
                </el-col>
                <el-col :span="1">
                    <div class="line"></div>
                </el-col>
                <el-col :span="11">
                    <alarm-statis></alarm-statis>
                </el-col>
            </el-card>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
                <device-map></device-map>
            </el-col>
            <el-col :span="12">
                <alarm-city></alarm-city>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px; margin-bottom: 30px">
            <el-col :span="14">
                <alarm-machine></alarm-machine>
            </el-col>
            <el-col :span="10">
                <device-info></device-info>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import AirAmount from './AirAmount'
import TypeStatis from './TypeStatis'
import AlarmStatis from './AlarmStatis'
import DeviceMap from './DeviceMap'
import AlarmCity from './AlarmCity'
import DeviceInfo from './DeviceInfo'
import AlarmMachine from './AlarmMachine'
export default {
    data() {
        return {
           
        };
    },
    created() {},
    components: {
        "air-amount": AirAmount,
        "type-statis": TypeStatis,
        "alarm-statis": AlarmStatis,
        "device-map": DeviceMap,
        "alarm-city": AlarmCity,
        "device-info": DeviceInfo,
        "alarm-machine": AlarmMachine
    },
    methods: {
       
    }
};
</script>

<style lang="scss" scoped>
    .line{
        height: 400px;
        width: 2px;
        background: #ccc;
    }
</style>