<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="[{name:$t('lang.MSconfig')}, {name:$t('lang.msg-center')}]"></bread-crumb>

        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row" v-if="loginType == '1' || loginType == '0'">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-btn-group">
<!--                            <el-button type="primary" size="medium" @click="dialogAddVisible = true">{{$t('lang.msg-send')}}</el-button>-->
                            <el-button type="primary" size="medium" @click="isSearch=!isSearch">
                                {{$t('lang.more-queries')}}
                                <i v-if="isSearch" class="el-icon-arrow-down el-icon--right"></i>
                                <i v-if="!isSearch" class="el-icon-arrow-up el-icon--right"></i>
                            </el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="search-row" v-if="loginType == '2' || loginType == '4'">
                <el-col :span="24">
                    <div class="search-input-group">
                        <el-input
                                style="width: 106%;"
                                size="medium"
                                :placeholder="$t('lang.hint-Msgtitle')"
                                v-model="searchKey"
                                class="input-with-select"
                        >
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="isSearch">
                <search-group @search="search" @closeQuery="closeQuery"></search-group>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column prop="name" :label="$t('lang.msg-name')"></el-table-column>
                        <el-table-column :label="$t('lang.fault-device')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == '1'">--</span>
                                <span v-else>{{scope.row.serialno}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.msg-type')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == '1'">{{$t('lang.msg-inter')}}</span>
                                <span v-else>{{$t('lang.alarm-msg')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updated_at" :label="$t('lang.receive-time')"></el-table-column>
                        <el-table-column prop="status" :label="$t('lang.msg-status')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == '1'">{{$t('lang.see')}}</span>
                                <span v-else>{{$t('lang.un-see')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.type == '0'" class="table-icon-group">
                                    <img src="@/assets/images/icon/detail.png" :title="$t('lang.see-detail')" @click="showDetail(scope.row)" alt="">
                                    <img src="@/assets/images/icon/send.png" :title="$t('lang.reply')" @click="againRemind(scope.row)" alt="">
                                </div>
                                <div v-if="scope.row.type == '1'" class="table-icon-group">
                                    <img src="@/assets/images/icon/detail.png" :title="$t('lang.see-detail')" @click="showDetail(scope.row)" alt="">
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

            <!-- 发布消息 -->
            <el-dialog class="dialog-form" :title="$t('lang.msg-send')" :visible.sync="dialogAddVisible">
                <create @closeCreate="dialogClose" @create="createHandle"></create>
            </el-dialog>
        </main-content>
    </div>
</template>

<script>
    import Create from "./Create";
    import searchGroup from "./MesSearch";

    export default {
        data() {
            return {
                searchKey: "",
                tableData: [
                    //{name: '告警消息', type: 0, created_at: '2019-12-11', status: 1}
                ],
                tableLoading: false,
                //分页
                currentPage: 1,
                totalNum: 0,
                pageSize: 20,
                addVisible: false,
                dialogAddVisible: false,
                isSearch: false,
            };
        },
        created() {
            this.getList();
        },
        components: {
            create: Create,
            "search-group": searchGroup
        },
        methods: {
            //获取消息列表
            getList(params) {
                let baseParams = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                };
                this.tableLoading = true;
                this.$api.restfulApi
                    .list("message",Object.assign(baseParams, params))
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data;
                        this.totalNum = res.meta.pagination.total;
                        this.currentPage = res.meta.pagination.current_page;
                        this.tableLoading = false;
                    });
            },
            //消息再提醒
            againRemind(row) {
                console.log(row)
                let params = {
                    alarm_id: row.alarm_id,
                }
                this.$api.restfulApi.post('againSend', params).then(res => {
                    this.$message.success(this.$t('lang.remind'))
                }).catch(err => {
                    this.$message.danger(this.$t('lang.remind-failed'))
                })
            },
            //关闭创建弹窗
            dialogClose() {
                this.dialogAddVisible = false;
            },
            // 确认后更新数据
            createHandle() {
                this.dialogAddVisible = false;
                this.getList();
            },
            //查看详情
            showDetail(row) {
                console.log(row)
                this.$api.restfulApi.changeMessage('message', row.id).then(res => {
                    console.log('状态修改成功')
                })
                if(row.type == '1'){ // 判断为会话消息
                    this.$router.push({name: 'msg_dialog', params: {uid: row.from}})
                }else {
                    this.$router.push({name: 'msg_detail', params: {id: row.id}})
                }
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
            //分页
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

<style lang="sass" rel="stylesheet/sass">

</style>