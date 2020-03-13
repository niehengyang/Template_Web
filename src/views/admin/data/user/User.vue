<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-card class="card">
                    <p class="title" :title="$t('lang.vendor-personnel')">{{$t('lang.vendor-personnel')}}</p>
                    <p class="mount">{{userData.systemChigo ? userData.systemChigo : '-'}}</p>
                    <p class="unit">{{$t('lang.people')}}</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card">
                    <p class="title" :title="$t('lang.customer-manager')">{{$t('lang.customer-manager')}}</p>
                    <p class="mount">{{userData.salesManager ? userData.salesManager : '-'}}</p>
                    <p class="unit">{{$t('lang.people')}}</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card" style="margin-right: 0">
                    <p class="title" :title="$t('lang.user-send')">{{$t('lang.user-send')}}</p>
                    <p class="mount">{{userData.airConUser ? userData.airConUser : '-'}}</p>
                    <p class="unit">{{$t('lang.people')}}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                userData: {}
            }
        },
        created(){
          this.getData()
        },
        methods: {
            getData(){
                this.$api.restfulApi.list('statistical/adminLevelCount')
                    .then(res => {
                        console.log(res)
                        this.userData = res
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .card{
        text-align: center;
        margin-right: 10px;
        background: #fff;
        height: 256px;
        .title{
            font-size: 22px;
            font-weight: bold;
            color: #666;
            margin-bottom: 20px;
            margin-top: 26px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .mount{
            padding-bottom: 22px;
            font-size: 40px;
            font-weight: bold;
            color: #6CAFFE;
            border-bottom: 1px solid #E4E4E4;
        }
        .unit{
            margin-top: 18px;
            font-size: 16px;
            font-weight: 400;
            color: #333;
        }
    }
</style>