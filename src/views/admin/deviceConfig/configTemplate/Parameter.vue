<template>
    <div>
        <div>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-btn-group">
                            <el-button
                                type="primary"
                                size="medium"
                                @click="addVisible=true"
                            >{{$t('lang.param-add')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
                        <el-table-column type="index" :label="$t('lang.index')" fixed></el-table-column>
                        <el-table-column prop="df_keyname" :label="$t('lang.data-name')" fixed></el-table-column>
                        <el-table-column prop="df_displayname" :label="$t('lang.show-name')"></el-table-column>
                        <el-table-column prop="df_datamap" :label="$t('lang.value-showset')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.df_type == '00'">--</div>
                                <div v-if="scope.row.df_type == '01'">
                                    <div
                                        v-for="(item,index) in scope.row.df_datamap"
                                        :key="index"
                                    >{{item.key}}/{{item.value}}</div>
                                </div>
                                <div v-if="scope.row.df_type == '02'">
                                    <div
                                        v-for="(item,index) in scope.row.df_datamap"
                                        :key="index"
                                    >{{item.key}}/{{item.value}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="df_unit" :label="$t('lang.unit')">
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.df_type == '00'"
                                >{{scope.row.df_unit? scope.row.df_unit: '--'}}</span>
                                <span v-else>--</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.operate')" fixed="right">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/edit.png"
                                        :title="$t('lang.edit')"
                                        @click="openEdit(scope.$index)"
                                    />
                                    <img
                                        src="@/assets/images/icon/delete.png"
                                        :title="$t('lang.delete')"
                                        @click="deleteItem(scope.row.df_id)"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!--  分页 -->
            <el-row class="paginate-row" v-if="tableData.length != 0">
                <el-col :span="24">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalNumber"
                    ></el-pagination>
                </el-col>
            </el-row>

            <!-- 添加-->
            <create
                :dialog-visible="addVisible"
                :dm-id="dt_id"
                @refresh="refresh"
                @dialog-close="addVisible=false"
            ></create>
            <!-- 编辑--->
            <edit
                :dialog-visible="editVisible"
                :form-data="editForm"
                @refresh="refresh"
                @dialog-close="editVisible=false"
            ></edit>
        </div>
    </div>
</template>

<script>
import Create from "./ParameterCreate";
import Edit from "./ParameterEdit";
export default {
    data() {
        return {
            searchKey: "",
            dt_id: "",
            tableData: [
                {
                    df_keyname: "12"
                }
            ],
            tableLoading: false,
            currentPage: 1,
            pageSize: 20,
            totalNumber: 0,
            addVisible: false,
            editForm: {},
            editVisible: false
        };
    },
    created() {
        this.dt_id = this.$route.params.dt_id;
        this.getList(this.$route.params.dt_id);
    },
    components: {
        create: Create,
        edit: Edit
    },
    methods: {
        //初始化数据
        getList(params) {
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            // this.tableLoading = true;
            // this.$api.restfulApi
            //     .list("", Object.assign(baseParams, params))
            //     .then(res => {
            //         console.log(res);
            //         this.tableData = res.data;
            //         this.totalNum = res.meta.pagination.total;
            //         this.currentPage = res.meta.pagination.current_page;
            //         this.tableLoading = false;
            //     }).catch(err => {
            //         this.tableLoading = false
            // })
        },
        //打开编辑
        openEdit(index) {
            this.editForm = _.clone(this.tableData[index]);
            this.editVisible = true;
        },
        //删除
        deleteItem(id) {
            this.$confirm(this.$t("lang.affirm-delete"), this.$t("lang.tip"), {
                confirmButtonText: this.$t("lang.submit"),
                cancelButtonText: this.$t("lang.cancel"),
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("", id).then(() => {
                    this.$message({
                        message: this.$t("lang.delete-success"),
                        type: "success"
                    });
                    this.getList();
                });
            });
        },
        //刷新
        refresh() {
            this.addVisible = false;
            this.getList();
        },
        //分页操作
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

<style lang="sass" rel="stylesheet/sass" scoped>

</style>