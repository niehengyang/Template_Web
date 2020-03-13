<template>
    <div class="user-search-group">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="label">{{$t('lang.word-name')}}：</div>
                <el-input size="medium"
                          v-model="searchForm.searchKey"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          clearable
                          :placeholder="$t('lang.hint-wordName')"></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.word-type')}}：</div>
                <el-select size="medium" v-model="searchForm.dataType" clearable :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in typeArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.device-type')}}：</div>
                <type-select :disabled="isDisabled" v-model="searchForm.deviceType"></type-select>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:25px">
            <el-col :span="8">
                <div class="label">{{$t('lang.upload-time')}}：</div>
                <el-date-picker
                        v-model="searchForm.searchDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        clearable
                        :placeholder="$t('lang.hint-uploadTime')"></el-date-picker>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.faultCode')}}：</div>
                <el-select size="medium"
                           @visible-change="getFault"
                           :loading="faultLoading"
                           v-model="searchForm.faultType"
                           clearable
                           :placeholder="$t('lang.hint-wordType')">
                    <el-option v-for="item in faultArray" :key="item.id" :label="item.code" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <div class="se-btn">
                    <el-button size="medium" class="button-plain-primary" @click="cancelQuery">{{$t('lang.cancel')}}</el-button>
                    <el-button size="medium" class="button-plain-primary" @click="search" style="margin-right:10px;">{{$t('lang.query')}}</el-button>
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
                faultLoading: false,
                faultOptions: [],
                typeArray: [
                    {label: this.$t('lang.air-data'), value: '2'},
                    {label: this.$t('lang.internal-data'), value: '1'}
                ],
                faultArray: []
            };
        },
        computed: {
            isDisabled(){
                return this.searchForm.dataType === '2' ? false : true
            }
        },
        methods: {
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
            },
            cancelQuery(){
                this.$emit('closeQuery')
            }
        }
    };
</script>

<style lang="scss" scoped>
    .user-search-group {
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