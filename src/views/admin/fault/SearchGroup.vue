<template>
    <div class="alarm-search-group">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="label">{{$t('lang.alarm-name')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.alarmName"
                    :placeholder="$t('lang.hint-Aname')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.alarm-device')}}</div>
                <el-input
                    size="medium"
                    v-model="searchForm.serialno"
                    :placeholder="$t('lang.hint-Adevice')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.alarm-time')}}</div>
                <el-date-picker
                    size="medium"
                    v-model="searchForm.time"
                    value-format="yyyy-MM-dd"
                    :placeholder="$t('lang.hint-Atime')"
                    clearable
                ></el-date-picker>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:25px">
            <el-col :span="8">
                <div class="label">{{$t('lang.fault-code')}}</div>
                <el-select size="medium"
                           @visible-change="getFault"
                           :loading="faultLoading"
                           v-model="searchForm.code"
                           clearable
                           :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in faultArray" :key="item.id" :label="item.code" :value="item.code"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8"></el-col>
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
            faultArray: [],
            faultLoading: false
        };
    },
    created() {},
    components: {},
    methods: {
        //取消查询
        cancelQuery() {
            this.$emit('closeQuery')
        },
        search() {
            console.log(this.searchForm)
            this.$emit('search', this.searchForm)
        },
        // 获取故障代码
        getFault(){
            this.faultLoading = true
            this.$api.restfulApi.list('faultcode').then(res => {
                console.log(res)
                this.faultArray = res.data
                this.faultLoading = false
            }).catch(err => {
                this.faultLoading = false
            })
        }

    }
};
</script>

<style lang="scss">
.alarm-search-group {
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