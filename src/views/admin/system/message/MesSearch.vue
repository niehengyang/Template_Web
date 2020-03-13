<template>
    <div class="msg-search-group">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="label">{{$t('lang.msg-name')}}：</div>
                <el-input
                    size="medium"
                    v-model="searchForm.name"
                    clearable
                    :placeholder="$t('lang.hint-Msgtitle')"
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.device-fault')}}：</div>
                <el-input
                    size="medium"
                    v-model="searchForm.serialno"
                    :placeholder="$t('lang.hint-device')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.msg-type')}}：</div>
                <el-select
                    size="medium"
                    v-model="searchForm.type"
                    :placeholder="$t('lang.hint-Msgtype')"
                    clearable
                >
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:25px">
            <el-col :span="8">
                <div class="label">{{$t('lang.receive-time')}}：</div>
                <el-date-picker
                    size="medium"
                    v-model="searchForm.time"
                    :placeholder="$t('lang.hint-time')"
                    value-format="yyyy-MM-dd"
                    clearable
                ></el-date-picker>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.msg-status')}}：</div>
                <el-select
                    size="medium"
                    v-model="searchForm.status"
                    :placeholder="$t('lang.hint-status')"
                    clearable
                >
                    <el-option
                        v-for="item in statusArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
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
            typeOptions: [
                { label: this.$t('lang.alarm-msg'), value: "0" },
                { label: this.$t('lang.msg-inter'), value: "1" }
            ],
            statusArray: [
                { label: this.$t('lang.un-see'), value: "0" },
                { label: this.$t('lang.see'), value: "1" }
            ]
        };
    },
    created() {},
    components: {},
    methods: {
        search() {
            console.log(this.searchForm)
            this.$emit('search', this.searchForm)
        },
        //取消查询
        cancelQuery(){
            this.$emit('closeQuery')
        },
    }
};
</script>

<style lang="scss" scoped>
.msg-search-group {
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
            .el-input--prefix .el-input__inner {
                height: 36px;
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