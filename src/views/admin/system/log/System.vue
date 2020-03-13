<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-date-picker
                                    v-model="timeValue"
                                    size="medium"
                                    type="daterange"
                                    :range-separator="$t('lang.to')"
                                    :start-placeholder="$t('lang.startT')"
                                    value-format="yyyy-MM-dd"
                                    :end-placeholder="$t('lang.endT')">
                            </el-date-picker>
                        </div>
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="logQuery">{{$t('lang.query')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column prop="log_time" :label="$t('lang.time')"></el-table-column>
                        <el-table-column :label="$t('lang.log-con')" prop="log_content"></el-table-column>
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
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNumber">
                    </el-pagination>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                totalNumber: 0,
                tableLoading: false,
                timeValue: ''
            }
        },
        created() {
            this.initData()
        },
        components: {

        },
        methods: {
            initData(search){
                this.tableLoading = true
                let params = {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
                this.$api.restfulApi.list('syslog', Object.assign(params, search))
                    .then((response)=>{
                        console.log(response)
                        this.tableData = response.data
                        this.tableLoading = false;
                        this.currentPage = response.meta.pagination.current_page;
                        this.totalNumber = response.meta.pagination.total;
                    }).catch(err => {
                        this.tableLoading = false
                })
            },
            //查询
            logQuery(){
                let search = {searchDate: this.timeValue}
                this.initData(search)
            },
            //分页操作
            handleSizeChange(val) {
                this.pageSize = val
                this.initData()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.initData()
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>