<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-btn-group">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="dialogAddVisible = true"
                        >{{$t('lang.user-add')}}</el-button>
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
                <search-group @query="query" @cancel-query="cancelQuery"></search-group>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table class="scrollbar-common" :data="userTableData" style="width: 100%">
                        <el-table-column fixed type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column fixed :label="$t('lang.user-account')" prop="loginname"></el-table-column>
                        <el-table-column :label="$t('lang.user-name')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.username == null">-</span>
                                <span v-else>{{scope.row.username}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('lang.user-level')"
                            :filters="userLevel"
                            :filter-method="handleFilter"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.role_id == '0'">{{$t('lang.admin')}}</div>
                                <div v-if="scope.row.role_id == '-1'">{{$t('lang.artisan')}}</div>
                                <div v-if="scope.row.role_id == '-2'">{{$t('lang.air-child')}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cellphone" :label="$t('lang.cellphone')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cellphone == null">-</span>
                                <span v-else>{{scope.row.cellphone}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.email')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.email == null">-</span>
                                <span v-else>{{scope.row.email}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.role')" :filters="roleLevel" :filter-method="handleRoleFilter">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == '0'">{{$t('lang.vendor-admin')}}</span>
                                <span v-if="scope.row.type == '1'">{{$t('lang.factory-tec')}}</span>
                                <span v-if="scope.row.type == '2'">{{$t('lang.customer-manager')}}</span>
                                <span v-if="scope.row.type == '3'">{{$t('lang.serviceman')}}</span>
                                <span v-if="scope.row.type == '4'">{{$t('lang.client')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_name" :label="$t('lang.area')"></el-table-column>
                        <el-table-column
                            :label="$t('lang.status')"
                            :filters="[{text:$t('lang.enable'),value:'1'},{text:$t('lang.disable'),value:'0'}]"
                            :filter-method="handleFilterStatus"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == '1'">
                                    <span class="dot-green dot-circle"></span>
                                    {{$t('lang.enable')}}
                                </div>
                                <div v-else>
                                    <span class="dot-red dot-circle"></span>
                                    {{$t('lang.disable')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" width="150" :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/disabled.png"
                                        :title="$t('lang.disable')"
                                        v-if="scope.row.status == 1"
                                        @click="triggerStatus(scope.row)"
                                    />
                                    <img src="@/assets/images/icon/enabled.png"
                                         v-else
                                         :title="$t('lang.enable')"
                                         @click="triggerStatus(scope.row)"
                                         alt="">
                                    <img
                                        src="@/assets/images/icon/edit.png"
                                        @click="handleEditClick(scope.$index)"
                                        :title="$t('lang.edit')"
                                    />
<!--                                    <img-->
<!--                                        src="@/assets/images/icon/detail.png"-->
<!--                                        :title="$t('lang.see-detail')"-->
<!--                                        @click="goDetail()"-->
<!--                                    />-->
                                    <img
                                        src="@/assets/images/icon/delete.png"
                                        @click="handleUserDelete(scope.row.id)"
                                        :title="$t('lang.delete')"
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
                        :total="totalNumber"
                    ></el-pagination>
                </el-col>
            </el-row>

            <el-dialog
                class="dialog-form"
                :title="$t('lang.user-add')"
                :visible.sync="dialogAddVisible"
            >
                <user-create @closeCreate="dialogClose" @create="createHandle"></user-create>
            </el-dialog>

            <!-- 编辑用户 -->
            <el-dialog
                class="dialog-form"
                :title="$t('lang.user-edit')"
                :visible.sync="dialogEditVisible"
            >
                <user-edit :edit-data="editData" @closeEdit="closeEdit" @edit="editConfirm"></user-edit>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import UserCreate from "./Create";
import UserEdit from "./Edit";
import searchGroup from "./UserSearch";

export default {
    data() {
        return {
            userTableData: [],
            currentPage: 1,
            pageSize: 20,
            totalNumber: 0,
            tableLoading: false,
            dialogAddVisible: false,
            dialogEditVisible: false,
            userObj: {},
            editData: {},
            isSearch: false,
            userLevel: [
                { text: this.$t('lang.admin'), value: "0" },
                { text: this.$t('lang.artisan'), value: "-1" },
                { text: this.$t('lang.air-child'), value: "-2" }
            ],
            roleLevel: [
                {text: this.$t('lang.vendor-admin'), value: '0'},
                {text: this.$t('lang.factory-tec'), value: '1'},
                {text: this.$t('lang.customer-manager'), value: '2'},
                {text: this.$t('lang.serviceman'), value: '3'},
                {text: this.$t('lang.client'), value: '4'}
            ]
        };
    },
    created() {},
    mounted() {
        this.getUserList();
    },
    updated() {},
    components: {
        "user-create": UserCreate,
        "user-edit": UserEdit,
        "search-group": searchGroup
    },
    methods: {
        //获取用户列表
        getUserList(params) {
            this.tableLoading = true;
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };

            this.$api.restfulApi
                .list("admin", Object.assign(baseParams, params))
                .then(res => {
                    console.log("userList", res);
                    this.userTableData = res.data;
                    this.tableLoading = false;
                    this.currentPage = res.meta.pagination.current_page;
                    this.totalNumber = res.meta.pagination.total;
                }).catch(err => {
                this.tableLoading = false;
            })
        },
        //查询
        query(params) {
            this.getUserList(params);
        },
        //取消查询
        cancelQuery(params) {
            this.isSearch = false;
            this.getUserList(params);
        },
        //点击编辑按钮
        handleEditClick(index) {
            this.dialogEditVisible = true;
            this.editData = _.clone(this.userTableData[index]);
            //this.editData.area_id = this.editData.current_area.area_id;
            console.log(this.editData);
        },
        //关闭创建弹窗
        dialogClose() {
            this.dialogAddVisible = false;
        },
        // 确认后更新数据
        createHandle() {
            this.dialogAddVisible = false;
            this.getUserList();
        },
        // 关闭编辑弹窗
        closeEdit() {
            this.dialogEditVisible = false;
        },
        // 编辑后更新数据
        editConfirm() {
            this.dialogEditVisible = false;
            this.getUserList();
        },
        //删除用户
        handleUserDelete(id) {
            console.log(id);
            this.$confirm(this.$t('lang.hint-delete'), this.$t('lang.tip'), {
                confirmButtonText: this.$t('lang.confirm'),
                cancelButtonText: this.$t('lang.cancel'),
                type: "warning"
            }).then(() => {
                this.tableLoading = true;
                this.$api.restfulApi.delete("admin", id).then(res => {
                    this.$message.success(this.$t('lang.delete-success'));
                    this.getUserList();
                    this.tableLoading = false;
                }).catch(err => {
                    this.tableLoading = false;
                })
            });
        },
        //状态切换
        triggerStatus(row) {
            let statusTip = ''
            if(row.status == 1){
                statusTip = this.$t('lang.hint-disabled')
            }else{
                statusTip = this.$t('lang.hint-enabled')
            }
            this.$confirm(statusTip, this.$t('lang.tip'), {
                confirmButtonText: this.$t('lang.confirm'),
                cancelButtonText: this.$t('lang.cancel'),
                type: "warning"
            }).then(() => {
                this.tableLoading = true;
                this.$api.restfulApi.changeStatus("admin/toogle", {id: row.id}).then(res => {
                    this.$message.success(this.$t('lang.change-tip'));
                    this.getUserList();
                    this.tableLoading = false;
                }).catch(err => {
                    this.tableLoading = false;
                })
            })
        },

        //根据用户级别查询
        handleFilter(value, row) {
            return row.role_id == value;
        },
        // 根据角色查询
        handleRoleFilter(value, row){
            return row.type == value
        },
        //根据用户状态查询
        handleFilterStatus(value, row) {
            return row.status === value;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList();
        }
    }
};
</script>

<style lang="sass" rel="stylesheet/sass">


</style>