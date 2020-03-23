<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="[{name:''}, {name:''}]"></bread-crumb>

        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-input
                                size="medium"
                                placeholder="请输入"
                                v-model="searchKey"
                                class="input-with-select"
                            >
                                <el-select
                                    class="input-select"
                                    v-model="searchKeySelect"
                                    slot="prepend"
                                    placeholder="请选择"
                                >
                                    <el-option label="用户名称" value="1"></el-option>
                                    <el-option label="手机号" value="2"></el-option>
                                    <el-option label="状态" value="3"></el-option>
                                </el-select>
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium">添加用户</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop label></el-table-column>
                        <el-table-column label>
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img src="/images/edit.png" title="编辑" />
                                    <img src="/images/delete.png" title="删除" />
                                    <img src="/images/more.png" title="查看更多" />
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
            <!-- 编辑-->
            <edit
                :dialog-visible="editVisible"
                :form-data="editForm"
                @refresh="refresh"
                @dialog-close="editVisible=false"
            ></edit>
        </main-content>
    </div>
</template>

<script>
// import Create from "./Create";
// import Edit from "./Edit";

export default {
    data() {
        return {
            searchKey: "",
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
        // create: Create,
        // edit: Edit
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
                });
        },
        //刷新table
        refresh() {
            this.addVisible = false;
            this.editVisible = false;
            this.getList();
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