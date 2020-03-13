<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="[{name:$t('lang.MSconfig')}, {name:$t('lang.ota')}]"></bread-crumb>
        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <!--                        <div class="search-input-group" style="margin-right: 10px;">-->
                        <!--                            <el-input size="medium" :placeholder="$t('lang.hint-firmware')" v-model="searchKey" class="input-with-select" @change="search">-->
                        <!--                                <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>-->
                        <!--                            </el-input>-->
                        <!--                        </div>-->
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="upload">{{$t('lang.version-upload')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')" fixed="left"></el-table-column>
                        <el-table-column prop="name" :label="$t('lang.firmware-name')"></el-table-column>
                        <el-table-column prop="version" :label="$t('lang.firmware-version')"></el-table-column>
                        <el-table-column :label="$t('lang.issuer')" prop="admin.username"></el-table-column>
                        <el-table-column prop="status" :label="$t('lang.verify-status')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == '2'">
                                    <span class="dot-green dot-circle"></span>
                                    {{$t('lang.success')}}
                                </div>
                                <div v-if="scope.row.status == '3'">
                                    <span class="dot-red dot-circle"></span>
                                    {{$t('lang.failed')}}
                                </div>
                                <div v-if="scope.row.status == '1'">
                                    <span class="dot-blue dot-circle"></span>
                                    {{$t('lang.loading')}}
                                </div>
                                <div v-if="scope.row.status == '0'">
                                    <span class="dot-info dot-circle"></span>
                                    {{$t('lang.unverified')}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" :label="$t('lang.issue-time')"></el-table-column>
                        <el-table-column prop="url" :label="$t('lang.update-address')"></el-table-column>
                        <el-table-column fixed="right" width="150" :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img src="@/assets/images/icon/batchup.png"
                                         :title="$t('lang.batch')"
                                         @click="showBatch(scope.row)"
                                         v-if="scope.row.status == '2'"
                                         alt="">
                                    <img src="@/assets/images/icon/verify.png"
                                         :title="$t('lang.verify')"
                                         @click="verify(scope.row)"
                                         alt="">
                                    <img src="@/assets/images/icon/detail.png"
                                         :title="$t('lang.detail-update')"
                                         v-if="scope.row.status == '2'"
                                         @click="detail(scope.row.id)"
                                         alt="">
                                    <img src="@/assets/images/icon/delete.png"
                                         :title="$t('lang.delete')"
                                         @click="handleDelete(scope.row.id)"
                                         alt="">
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

            <!-- 上传版本 -->
            <el-dialog class="dialog-form" :title="$t('lang.version-upload')" :visible.sync="dialogAddVisible">
                <Upload @closeCreate="dialogClose" @create="createHandle"></Upload>
            </el-dialog>

            <!-- 固件验证 -->
            <el-dialog class="dialog-form" :title="$t('lang.verify')" :visible.sync="dialogVerifyVisible">
                <Verify :verify-data="verifyData" @closeCreate="closeVerify" @create="verifyHandle"></Verify>
            </el-dialog>
            <!--      批量升级      -->
            <el-dialog :title="$t('lang.batch')" :visible.sync="dialogVisible" width="35%">
                <div v-loading="batchLoading">
                    <p><span>{{$t('lang.firmware-name')}}：</span><span>{{iotname}}</span></p>
                    <p style="margin-top: 14px;"><span>{{$t('lang.firmware-version')}}：</span><span>{{version}}</span></p>
                    <el-divider></el-divider>
                    <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
                        <el-button class="white-btn" size="medium" @click="dialogVisible = false" :disabled="batchLoading?true:false">{{$t('lang.cancel')}}</el-button>
                        <el-button class="blue-btn" size="medium" type="primary" @click="batch" :disabled="batchLoading?true:false">{{$t('lang.submit')}}</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--     固件验证成功       -->
            <el-dialog :title="$t('lang.verify')" :visible.sync="successVisible" width="50%">
                <el-table :data="updated" v-loading="verifyLoading">
                    <el-table-column fixed="left" property="gateway.mac" :label="$t('lang.gateway-mac')"></el-table-column>
                    <el-table-column property="status" :label="$t('lang.verify-status')">
                        <template slot-scope="scope">
                            <p v-if="scope.row.status == 2"><i class="el-icon-success" style="color: #67c23a;"></i> &nbsp;<span>{{$t('lang.success')}}</span></p>
                            <p v-if="scope.row.status == 1"><i class="el-icon-loading" style="color: #909399;"></i> &nbsp;<span>{{$t('lang.loading')}}</span></p>
                            <p v-if="scope.row.status == 3"><i class="el-icon-error" style="color: #F56C6C;"></i> &nbsp;<span>{{$t('lang.failed')}}</span></p>
                        </template>
                    </el-table-column>
                    <el-table-column property="desc" :label="$t('lang.cause-failed')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 3">{{scope.row.desc}}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="150" :label="$t('lang.operate')">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 3" class="table-icon-group">
                                <img style="width: 17px;height: 17px;cursor: pointer" src="@/assets/images/icon/verify.png"
                                     :title="$t('lang.reverify')"
                                     @click="upgrade(scope.row)"
                                />
                            </div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>

        </main-content>
    </div>
</template>

<script>
    import Upload from './Upload'
    import Verify from './Verify'
    export default {
        name: "Upgrade",
        components: {
            Upload,
            Verify
        },
        data(){
            return {
                searchKey: '',
                tableData: [],
                dialogVisible: false,
                dialogAddVisible: false,
                dialogVerifyVisible: false,
                successVisible: false,
                currentPage: 1,
                pageSize: 20,
                totalNumber: 0,
                tableLoading: false,
                version: '',
                iotname: '',
                verifyData: [],
                updated: [],
                batchLoading: false,
                batchId: '',
                verifyLoading: false
            }
        },
        components: {
            Upload,
            Verify
        },
        created() {
            this.initData()
        },
        methods: {
            //初始化数据
            initData(params) {
                let baseParams = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                };
                this.tableLoading = true;
                this.$api.restfulApi
                    .list("ota",Object.assign(baseParams, params))
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data;
                        this.totalNumber = res.meta.pagination.total;
                        this.currentPage = res.meta.pagination.current_page;
                        this.tableLoading = false;
                    });
            },
            //上传版本
            upload(){
                this.dialogAddVisible = true
            },
            //关闭创建弹窗
            dialogClose() {
                this.dialogAddVisible = false;
            },
            // 确认后更新数据
            createHandle() {
                this.dialogAddVisible = false;
                this.initData();
            },
            //关闭verify
            closeVerify(){
                this.dialogVerifyVisible = false
            },
            //固件验证后
            verifyHandle(){
                this.dialogVerifyVisible = false;
                this.initData();
            },
            //显示批量升级弹窗
            showBatch(data){
                console.log(data)
                this.dialogVisible = true
                this.version = data.version
                this.iotname = data.name
                this.batchId = data.id
            },
            //批量升级
            batch(){
                this.batchLoading = true
                let params = {firmware_id: this.batchId}
                this.$api.restfulApi.post('ota/batchupgrade', params).then(res => {
                    this.dialogVisible = false
                    this.batchLoading = false
                    this.$message.success(this.$t('lang.batch-success'))
                }).catch(err => {
                    this.batchLoading = false
                })
            },
            //固件验证
            verify(data){
                console.log(data)
                this.verifyData = data
                if(data.status == '0'){
                    this.dialogVerifyVisible = true
                }else{
                    this.verifyLoading = true
                    this.$api.restfulApi.list('ota/getresult', {firmware_id: data.id}).then(res => {
                        console.log(res)
                        this.updated = res.chigo_gwotas
                        this.successVisible = true
                        this.verifyLoading = false
                    }).catch(err => {
                        this.verifyLoading = false
                    })
                }
            },
            //重新验证
            upgrade(data){
                let params = {
                    firmware_id: data.firmware_id,
                    gateway_ids: [data.gateway_id]
                }
                this.verifyLoading = true
                this.$api.restfulApi.create('ota/firmwareverify', params).then(res => {
                    this.$message.success(this.$t('lang.verify-success'))
                    this.verifyLoading = false
                }).catch(err => {
                    this.$message.error(this.$t('lang.failed'))
                    this.verifyLoading = false
                })
            },
            //升级详情
            detail(id){
                this.$router.push({path: '/upgrade/toupgrade/'+id})
            },
            //删除升级
            handleDelete(id){
                console.log(id);
                this.$confirm(this.$t('lang.hint-delete'), this.$t('lang.tip'), {
                    confirmButtonText: this.$t('lang.confirm'),
                    cancelButtonText: this.$t('lang.cancel'),
                    type: "warning"
                }).then(() => {
                    this.tableLoading = true;
                    this.$api.restfulApi.delete("ota", id).then(res => {
                        this.$message.success(this.$t('lang.delete-success'));
                        this.initData();
                        this.tableLoading = false;
                    }).catch(err => {
                        this.tableLoading = false;
                    })
                });
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

<style  lang="scss">
    .el-dialog__body{
        padding-top: 12px;
    }
</style>
