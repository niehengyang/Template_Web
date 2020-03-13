<template>
    <div>
        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-input
                                size="medium"
                                :placeholder="$t('lang.hint-Mname')"
                                v-model="searchValue"
                                class="input-with-select"
                                suffix-icon="el-icon-search"
                                @clear="query"
                                @change="query"
                                clearable
                            ></el-input>
                        </div>
                        <div class="search-btn-group">
                            <el-button
                                type="primary"
                                size="medium"
                                @click="addVisible=true"
                            >{{$t('lang.model-add')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table
                        ref="typeData"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;margin-top: 10px;"
                    >
                        <el-table-column :label="$t('lang.index')" fixed type="index" width="80"></el-table-column>
                        <el-table-column :label="$t('lang.model-name')" fixed prop="name"></el-table-column>
                        <el-table-column
                            :label="$t('lang.belongto-type')"
                            prop="type.name"
                        ></el-table-column>
                        <el-table-column :label="$t('lang.model-descript')" prop="describe"></el-table-column>
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
                                        @click="deleteItem(scope.row.id)"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-row class="paginate-row">
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNumber"
                    style="float:right;margin-top: 10px;"
                    v-if="tableData!=[]"
                ></el-pagination>
            </el-row>

            <!-- 创建类型-->
            <create
                :dialog-visible="addVisible"
                @refresh="refresh"
                @dialog-close="addVisible=false"
            ></create>
            <!-- 编辑类型--->
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
import Create from "./ModelCreate";
import Edit from "./ModelEdit";
export default {
    name: "ModelManager",
    data() {
        return {
            addVisible: false,
            editVisible: false,
            tableLoading: false,
            searchValue: "",
            currentPage: 1, //页码
            pageSize: 20, //分页数据条数
            totalNumber: 0, //数据总条数
            tableData: [],
            editForm: ""
        };
    },
    components: {
        create: Create,
        edit: Edit
    },

    created() {
        this.getList();
    },
    methods: {
        //初始加载
        getList(params) {
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            this.tableLoading = true;
            this.$api.restfulApi
                .list("devicemodel", Object.assign(baseParams, params))
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
        //搜索型号
        query() {
            let param;
            if (this.searchValue === "") {
                param = {};
            } else {
                param = { searchKey: this.searchValue };
            }
            this.getList(param);
        },
        //添加型号按钮
        addModelWay() {
            this.addVisible = true;
        },

        // 确认后更新数据
        refresh() {
            this.addVisible = false;
            this.editVisible = false;
            this.getList();
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
                this.$api.restfulApi.delete("devicemodel", id).then(() => {
                    this.$message({
                        message: this.$t("lang.delete-success"),
                        type: "success"
                    });
                    this.getList();
                });
            });
        },
        //分页操作
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        }
    }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>