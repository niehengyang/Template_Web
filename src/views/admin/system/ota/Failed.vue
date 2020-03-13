<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <h1 class="title">{{$t('lang.device-list')}}</h1>
<!--            <el-row class="search-row">-->
<!--                <el-col :span="24">-->
<!--                    <div class="search-row">-->
<!--                        <div class="search-input-group" style="margin-right: 10px;">-->
<!--                            <el-input size="medium" :placeholder="$t('lang.hint-firmware')" v-model="searchKey" class="input-with-select" @change="search">-->
<!--                                <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>-->
<!--                            </el-input>-->
<!--                        </div>-->
<!--                        <div class="search-btn-group">-->
<!--                            <el-button type="primary" size="medium" @click="batchDelete">{{$t('lang.batch-upgrade')}}</el-button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="device.serialno" :label="$t('lang.device-serial')" fixed="left"></el-table-column>
                        <el-table-column prop="device.deviceattach.name" :label="$t('lang.device-name')"></el-table-column>
                        <el-table-column :label="$t('lang.mac-address')" prop="gateway.mac"></el-table-column>
                        <el-table-column prop="device.type.name" :label="$t('lang.device-type')"></el-table-column>
                        <el-table-column prop="version" :label="$t('lang.current-version')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.version == null">--</span>
                                <span v-else>{{scope.row.version}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" :label="$t('lang.gateway-status')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == '1'">
                                    <span class="dot-green dot-circle"></span>
                                    {{$t('lang.online')}}
                                </div>
                                <div v-else>
                                    <span class="dot-red dot-circle"></span>
                                    {{$t('lang.offline')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cause" :label="$t('lang.cause')"></el-table-column>
                        <el-table-column fixed="right" width="150" :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                            src="@/assets/images/icon/upgrade.png"
                                            :title="$t('lang.reupgrade')"
                                            @click="reupgrade(scope.row)"
                                    />
<!--                                    <img src="@/assets/images/icon/delete.png"-->
<!--                                         :title="$t('lang.delete-upgrade')"-->
<!--                                         @click="delete(scope.row)"-->
<!--                                         alt="">-->
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
        name: "Upgrade",
        data(){
            return {
                searchKey: '',
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                totalNumber: 0,
                tableLoading: false,
            }
        },
        created() {
            this.initData()
        },
        methods: {
            //初始化数据
            initData(){
                let baseParams = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                };
                let params = {
                    firmware_id: this.$route.params.ota_id,
                    type: 4
                }
                this.tableLoading = true;
                this.$api.restfulApi
                    .post("ota/details",Object.assign(baseParams, params))
                    .then(res => {
                        console.log('failed',res);
                        this.tableData = res.data;
                        this.totalNumber = res.meta.pagination.total;
                        this.currentPage = res.meta.pagination.current_page;
                        this.tableLoading = false;
                    });
            },
            search(){

            },
            //批量删除升级
            batchDelete(){

            },
            //重新升级
            reupgrade(data){
                //console.log(data)
                let params = {
                    gateway_id: data.gateway_id,
                    firmware_id: this.$route.params.ota_id
                }
                this.tableLoading = true
                this.$api.restfulApi.post('ota/upgrade', params).then(res => {
                    this.$message.success(this.$t('lang.upgrade-success'))
                    this.initData()
                    this.tableLoading = false
                }).catch(err => {
                    this.tableLoading = false
                })
            },
            //删除升级
            // delete(){
            //
            // },
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

<style scoped lang="scss">
    .title{
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: bold;
    }
</style>