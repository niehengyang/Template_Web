<template>
    <div class="stats-card">
        <p class="title">{{$t('lang.device-stats')}}</p>
        <div class="stats-num">
            <el-row>
                <el-col :span="8">
                    <p class="num">{{total}}</p>
                    <p class="text">{{$t('lang.device-all')}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="num">{{normal}}</p>
                    <p class="text">{{$t('lang.device-normal')}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="num">{{offline}}</p>
                    <p class="text">{{$t('lang.device-offline')}}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props:['total','normal','offline'],
    data() {
        return {};
    },
    created() {
    },
    methods: {
        
    }
};
</script>

<style lang="scss">
</style>
