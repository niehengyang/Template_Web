<template>
    <div class="search-group">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="label">{{$t('lang.device-serial')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.serialno"
                    :placeholder="$t('lang.hint-Dserial')"
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.device-name')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.deviceName"
                    :placeholder="$t('lang.hint-Dname')"
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.device-type')}}</div>
                <type-select v-model="searchForm.deviceType"></type-select>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:25px">
            <el-col :span="8">
                <!-- <div class="label">{{$t('lang.gatewayIMEI')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.iemi"
                    :placeholder="$t('lang.hint-IMEI')"
                    clearable
                ></el-input>-->
                <div class="label">{{$t('lang.device-status')}}</div>
                <el-select v-model="searchForm.deviceStatus" size="medium" clearable>
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <!-- <div class="label">{{$t('lang.device-belongto')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.belonger"
                    :placeholder="$t('lang.hint-Dbelong')"
                    clearable
                ></el-input>-->
            </el-col>
            <el-col :span="8">
                <div class="se-btn">
                    <el-button
                        size="medium"
                        class="button-plain-primary"
                        @click="cancelQuery"
                    >{{$t('lang.cancel')}}</el-button>
                    <el-button
                        size="medium"
                        class="button-plain-primary"
                        @click="search"
                        style="margin-right:10px;"
                    >{{$t('lang.query')}}</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchForm: {},
            typeOptions: [],
            typeLoading: false,
            statusList:[
                {
                    name:this.$t('lang.offline'),
                    value:'0'
                },{
                    name:this.$t('lang.online'),
                    value:'1'
                },{
                    name:this.$t('lang.unusual'),
                    value:'2'
                }
            ]
        };
    },
    created() {},
    components: {},
    methods: {
        //取消查询
        cancelQuery() {
            this.searchForm = {};
            this.$emit("cancel-query", {});
        },
        search() {
            this.$emit("query", this.searchForm);
        },
    }
};
</script>

<style lang="scss" scoped>
.search-group {
    max-width: 1019px;
    margin: 0 auto;
    .el-row {
        .el-col {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            position: relative;
            .label {
                min-width: 85px;
                text-align: right;
            }
            .el-input,
            .el-select {
                margin-left: 5px;
                width: 100%;
            }
            @media screen {
                .se-btn {
                    width: 100%;
                    .el-button {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>