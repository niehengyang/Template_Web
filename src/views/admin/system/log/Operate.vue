<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group" style="margin-right: 10px;">
                            <el-input size="medium" :placeholder="$t('lang.hint-name')" v-model="searchKey" class="input-with-select" @change="searchLog">
                                <i slot="suffix" class="el-input__icon el-icon-search" @click="searchLog"></i>
                            </el-input>
                        </div>
                        <div class="search-input-group">
                            <el-date-picker
                                    v-model="timeValue"
                                    size="medium"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    :range-separator="$t('lang.to')"
                                    :start-placeholder="$t('lang.startT')"
                                    :end-placeholder="$t('lang.endT')">
                            </el-date-picker>
                        </div>
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="logExport">{{$t('lang.export-log')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column prop="admin_name" :label="$t('lang.operate-name')"></el-table-column>
                        <el-table-column :label="$t('lang.operate-con')" prop="content"></el-table-column>
                        <el-table-column :label="$t('lang.operate-ip')" prop="ip"></el-table-column>
                        <el-table-column :label="$t('lang.operate-time')" prop="created_at"></el-table-column>
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
                timeValue: [],
                searchKey: ''
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
                this.$api.restfulApi.list('oplog', Object.assign(params, search))
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
            searchLog(){
                let search = {searchKey: this.searchKey}
                this.initData(search)
            },
            //导出日志
            logExport(){
                //console.log(this.timeValue)
                let search = {searchDate: this.timeValue}
                this.$api.restfulApi.list('oplog/export', search).then(res => {
                    console.log(res)
                    let path = location.host
                    let url = path + res.base_path
                    console.log(url)
                    window.location.assign('http://' + url)
                })
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