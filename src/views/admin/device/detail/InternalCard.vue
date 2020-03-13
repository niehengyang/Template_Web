<template>
    <div class="internal-card" @click="goMonitor">
        <el-row>
            <el-col :span="9">
                <img src="@/assets/images/icon/internal.png" />
                <div class="status" v-if="internal.status=='0'">{{$t('lang.offline')}}</div>
                <div class="status" v-if="internal.status=='1'">{{$t('lang.normal')}}</div>
                <div class="status" v-if="internal.status=='2'">{{$t('lang.alarm')}}</div>
                <div class="status" v-if="internal.status=='3'">{{$t('lang.fault')}}</div>
            </el-col>
            <el-col :span="15" class="info">
                <el-row>
                    <el-col :span="10" class="name">{{internal.name}}</el-col>
                    <el-col :span="14" class="icon">
                        <img src="@/assets/images/icon/onOff.png" />
                        <img v-if="internal.isClock" src="@/assets/images/icon/clock.png" />
                        <img v-if="internal.lock" src="@/assets/images/icon/lock.png" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" v-if="runModeValue!=''">
                        <div>{{$t('lang.pattern')}}</div>
                        <div>{{runModeValue}}</div>
                    </el-col>
                    <el-col :span="8" v-if="windValue!=''">
                        <div>{{$t('lang.speed')}}</div>
                        <div>{{windValue}}</div>
                    </el-col>
                    <el-col :span="8">
                        <div>{{$t('lang.bai-wind')}}</div>
                        <div>{{internal.p_wind}}</div>
                    </el-col>
                </el-row>
                <div class="time">{{internal.timing}}min</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ["internal"],
    data() {
        return {
            runModeValue:'',
            windValue:'',
        };
    },
    watch:{
        internal:function(){
            if(this.internal.runMode!=undefined){
                Object.keys(this.internal.runMode).forEach(key=>{
                    if(key!='power'){
                        if(this.internal.runMode[key]==1){
                            this.runModeValue=this.$t("lang.mode-" + key + "")
                        }
                    }
                })
            }
            if(this.internal.windStatus.level!=undefined){
                if(this.internal.windStatus.level==1){
                    this.windValue=this.$t('lang.hight')
                }else if(this.internal.windStatus.level==2){
                    this.windValue=this.$t('lang.middle')
                }else if(this.internal.windStatus.level==4){
                    this.windValue=this.$t('lang.low')
                }else if(this.internal.windStatus.level==8){
                    this.windValue=this.$t('lang.wind-auto')
                }
            }
        }
    },
    methods:{
        goMonitor(){
             this.$router.push("/monitor/" + this.internal.device_id+"/?inId="+this.internal.id);
        }
    }
};
</script>
<style scoped lang="scss">
.internal-card {
    width: 250px;
    padding: 10px 20px;
    border: 1px solid rgb(228, 228, 228);
    cursor: pointer;
    .el-row {
        .info {
            padding-left: 10px;
            img {
                width: 16px;
                height: 16px;
                float: right;
            }
            .el-row {
                margin-bottom: 10px;
            }
        }
        .name {
            font-size: 16px;
        }
        .icon {
            img {
                margin-left: 5px;
            }
        }
        .el-col {
            .status {
                text-align: center;
                color: #30b19b;
            }
            .time {
                margin-bottom: 0px;
                text-align: right;
            }
        }
    }
}
</style>