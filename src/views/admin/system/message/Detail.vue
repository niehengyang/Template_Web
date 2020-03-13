<template>
    <div>
        <bread-crumb :crumb-array="[{name:$t('lang.MSconfig')}, {name:$t('lang.msg-center')}, {name:$t('lang.info-detail')}]"></bread-crumb>
        <main-content>
            <el-row v-if="loginType == '4'">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="">{{$t('lang.maintain')}}</el-button>
                            <el-button type="primary" size="medium" @click="">{{$t('lang.misreport')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-card class="card">
                <h3 class="type">{{data.alarm.name}}</h3>
                <p><span>{{$t('lang.device-address')}}：</span><span>{{address}}</span></p>
                <p><span>{{$t('lang.device-belongP')}}：</span><span>{{data.device.belongto.username}}</span></p>
                <p><span>{{$t('lang.alarm-problem')}}：</span><span>{{data.alarm.content}}</span></p>
                <p><span>{{$t('lang.alarm-time')}}：</span><span>{{data.alarm.updated_at}}</span></p>
                <p><span>{{$t('lang.alarm-level')}}：</span><span>{{level[data.alarm.level]}}</span></p>
                <p><span>{{$t('lang.device-id')}}：</span><span>{{data.device.serialno}}</span></p>
            </el-card>
        </main-content>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return {
                data: {},
                address: '',
                level: [this.$t('lang.serious'), this.$t('lang.matter'), this.$t('lang.common'), this.$t('lang.lesser')]
            }
        },
        created(){
            this.getList()
        },
        methods: {
            getList(){
                let id = this.$route.params.id
                console.log(id)
                this.$api.restfulApi.item('message', id).then(res => {
                    console.log('detail',res)
                    this.data = res
                    if(res.device.province_name == null){
                        this.address = this.$t('lang.blank-address')
                    }else{
                        this.address = res.device.province_name + res.device.city_name + res.device.county_name
                    }

                })
            }
        },
    }
</script>

<style lang="scss">
    .card{
        margin-bottom: 20px;
        .type{
            font-size:16px;
            color: #000;
            font-weight: 800;
        }
        p{
            margin-top: 10px;
            font-size: 14px;
            font-weight: 400;
            color: #333;
        }
    }

</style>