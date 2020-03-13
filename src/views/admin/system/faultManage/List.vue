<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="[{name:$t('lang.MSconfig')}, {name:$t('lang.fault-manage')}]"></bread-crumb>

        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-input
                                size="medium"
                                :placeholder="$t('lang.hint-Fname')"
                                v-model="searchValue"
                                class="input-with-select"
                                suffix-icon="el-icon-search"
                                @clear="query"
                                @change="query"
                                clearable
                            ></el-input>
                        </div>
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="addVisible=true">{{$t('lang.fault-add')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column :label="$t('lang.fault-num')" prop="code"></el-table-column>
                        <el-table-column :label="$t('lang.fault-name')" prop="name"></el-table-column>
                        <el-table-column :label="$t('lang.fault-see')">
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.user_visible==0"
                                    style="color:#F56C6C"
                                >{{$t('lang.dis-see')}}</span>
                                <span v-else style="color:#67C23A">{{$t('lang.en-see')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/delete.png"
                                        @click="deleteItem(scope.row.id)"
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
                        :total="totalNum"
                    ></el-pagination>
                </el-col>
            </el-row>

            <!-- 添加-->
            <create
                :dialog-visible="addVisible"
                @refresh="refresh"
                @dialog-close="addVisible=false"
            ></create>
        </main-content>
    </div>
</template>

<script>
import Create from "./Create";

export default {
    data() {
        return {
            searchValue: "",
            tableData: [],
            tableLoading: false,
            addVisible: false,
            editVisible: false,
            editForm: {},
            currentPage: 1,
            totalNum: 0,
            pageSize: 20
        };
    },
    created() {},
    components: {
        create: Create
    },
    methods: {
        //获取企业客户列表
        getList(params) {
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            this.tableLoading = true;
            this.$api.restfulApi
                .list("", Object.assign(baseParams, params))
                .then(res => {
                    console.log(res);
                    this.tableData = res.data;
                    this.totalNum = res.meta.pagination.total;
                    this.currentPage = res.meta.pagination.current_page;
                    this.tableLoading = false;
                }).catch(err => {
                    this.tableLoading = false
            })
        },
        //刷新table
        refresh() {
            this.addVisible = false;
            this.getList();
        },
        //搜索
        query() {
            let param;
            if (this.searchValue === "") {
                param = {};
            } else {
                param = { searchKey: this.searchValue };
            }
            this.getList(param);
        },
        //删除
        deleteItem(id) {
            this.$confirm(this.$t("lang.affirm-delete"), this.$t("lang.tip"), {
                confirmButtonText: this.$t("lang.submit"),
                cancelButtonText: this.$t("lang.cancel"),
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("", id).then(res => {
                    this.$message.success(this.$t("lang.delete-success"));
                    this.getList();
                });
            });
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

<style lang="scss" scoped>
</style>