<template>
    <div class="user-search-group">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="label">{{$t('lang.user-account')}}：</div>
                <el-input
                    size="medium"
                    v-model="searchForm.loginname"
                    :placeholder="$t('lang.login-account')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.cellphone')}}：</div>
                <el-input
                    size="medium"
                    v-model="searchForm.cellphone"
                    :placeholder="$t('lang.hint-phone')"
                    clearable
                ></el-input>
            </el-col>
            <el-col :span="8">
                <div class="label">{{$t('lang.area')}}：</div>
                <el-select size="medium" v-model="searchForm.area_id" :placeholder="$t('lang.hint-area')" @visible-change="getArea" :loading="areaLoading" clearable>
                    <el-tree default-expand-all :data="areaArray" :props="props" node-key="id" :expand-on-click-node="false" @node-click="selectChange">
                        <template slot-scope="{ node, data }">
                            <el-option :label="node.label" :value="data.id"></el-option>
                        </template>
                    </el-tree>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:25px">
            <el-col :span="8">
                <div class="label">{{$t('lang.user-name')}}：</div>
                <el-input
                    size="medium"
                    v-model="searchForm.username"
                    :placeholder="$t('lang.hint-Uname')"
                    clearable
                ></el-input>
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
            areaLoading: false,
            areaArray: [],
            props: {
                id: "id",
                label: "name",
                children: 'children',
            },
        };
    },
    created() {},
    components: {},
    methods: {
        search() {
            this.$emit('query',this.searchForm);
        },
        //取消查询
        cancelQuery() {
           this.searchForm={},
           this.$emit('cancel-query',{})
        },
        //点击树节点
        selectChange(data, node, self){
            console.log(data)
        },
        //获取管理域
        getArea() {
            if(this.areaArray.length!=0) return;
            this.areaLoading = true;
            this.$api.restfulApi.list("area").then(res => {
                console.log(res);
                this.areaArray = res.data;
                this.areaLoading = false;
            }).catch(err => {
                this.areaLoading = false
            })
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