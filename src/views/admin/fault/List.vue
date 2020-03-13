<template>
    <div>
        <bread-crumb :crumb-array="[{name:$t('lang.alarm-fault')},{name:$t('lang.fault-alarm')}]"></bread-crumb>
        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-btn-group">
                        <el-button type="primary" size="medium" @click="isSearch=!isSearch">
                            {{$t('lang.more-queries')}}
                            <i
                                v-if="isSearch"
                                class="el-icon-arrow-down el-icon--right"
                            ></i>
                            <i v-if="!isSearch" class="el-icon-arrow-up el-icon--right"></i>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="isSearch">
                <search-group @search="search" @closeQuery="closeQuery"></search-group>
            </el-row>
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table class="scrollbar-common" :data="tableData" style="width: 100%">
                        <el-table-column fixed type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column fixed :label="$t('lang.alarm-name')" prop="name"></el-table-column>
                        <el-table-column prop="faultcode" :label="$t('lang.fault-code')"></el-table-column>
                        <el-table-column prop="device_serialno" :label="$t('lang.alarm-device')"></el-table-column>
                        <el-table-column :label="$t('lang.alarm-msg')">
                            <template slot-scope="scope">
                                <div style="color:#F56C6C">{{scope.row.content}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('lang.grade')"
                            :filters="[{text:$t('lang.serious'),value:'0'},{text:$t('lang.matter'),value:'1'},{text:$t('lang.common'),value:'2'},{text:$t('lang.lesser'),value:'3'}]"
                            :filter-method="levelFilter"
                        >
                        <template slot-scope="scope">
                                <div v-if="scope.row.level == '1'">{{$t('lang.serious')}}</div>
                                <div v-if="scope.row.level == '2'">{{$t('lang.matter')}}</div>
                                <div v-if="scope.row.level == '3'">{{$t('lang.common')}}</div>
                                <div v-if="scope.row.level == '4'">{{$t('lang.lesser')}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" :label="$t('lang.alarm-first')"></el-table-column>
                        <el-table-column prop="lasttime" :label="$t('lang.alarm-lately')"></el-table-column>
                        <el-table-column prop="count" :label="$t('lang.alarm-mount')"></el-table-column>
                        <el-table-column
                            :label="$t('lang.status')"
                            :filters="[{text:$t('lang.processed'),value:'1'},{text:$t('lang.unprocessed'),value:'0'}]"
                            :filter-method="statusFilter"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == '1'" class="color-green">{{$t('lang.processed')}}</div>
                                <div v-else class="color-danger">{{$t('lang.unprocessed')}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" width="120" :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/faultTip.png"
                                        :title="$t('lang.fault-tip')"
                                        @click="faultSend(scope.row.id)"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!--  分页 -->
            <el-row class="paginate-row">
                <el-col :span="24">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20, 50, 100, 200]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalNum"
                    ></el-pagination>
                </el-col>
            </el-row>
        </main-content>
    </div>
</template>

<script>
import searchGroup from "./SearchGroup";

export default {
    name: "Warning",
    data() {
        return {
            tableLoading: false,
            tableData: [],
            isSearch: false,
            currentPage: 1,
            pageSize: 20,
            totalNum: 0
        };
    },
    created(){
        this.getList()
    },
    components: {
        "search-group": searchGroup
    },
    methods: {
        //获取数据
        getList(params){
            this.tableLoading = true;
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            this.$api.restfulApi
                .list("alarm", Object.assign(baseParams, params))
                .then(res => {
                    console.log("alarm", res);
                    this.tableData = res.data;
                    this.tableLoading = false;
                    this.currentPage = res.meta.pagination.current_page;
                    this.totalNum = res.meta.pagination.total;
                }).catch(err => {
                    this.tableLoading = false
            })
        },
        //查询
        search(params){
            console.log(params)
            this.getList(params)
        },
        // 关闭查询
        closeQuery() {
            this.isSearch = false;
            this.getList()
        },
        //故障提醒
        faultSend(id) {
            let params = {
                id: id
            }
            this.$api.restfulApi.post('warn', params).then(res => {
                this.$message.success(this.$t('lang.remind'))
            }).catch(err => {
                this.$message.danger(this.$t('lang.fault-failed'))
            })
        },
        //根据状态查询
        statusFilter(value, row, column) {
            return row.status === value;
        },
        //根据等级查询
        levelFilter(value,row,column){
          return row.level === value;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        }
    }
};
</script>

<style scoped>
</style>