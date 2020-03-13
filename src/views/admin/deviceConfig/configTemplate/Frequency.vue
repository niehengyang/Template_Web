<template>
    <div>
        <div>
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-input
                                size="medium"
                                :placeholder="$t('lang.hint-Cname')"
                                onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                v-model="searchKeyValue"
                                class="input-with-select"
                            >
                                <i
                                    slot="suffix"
                                    class="el-input__icon el-icon-search"
                                    @click="query"
                                ></i>
                            </el-input>
                        </div>
                        <div class="search-btn-group">
                            <el-button
                                type="primary"
                                size="medium"
                                @click="addVisible = true"
                                ref="ruleForm"
                            >{{$t('lang.collect-add')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%" current-row-key>
                        <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column prop="collect_name" :label="$t('lang.collect-name')"></el-table-column>
                        <el-table-column :label="$t('lang.collect-cycle')">
                            <template
                                slot-scope="props"
                            >{{props.row.collect_num}}&nbsp;{{props.row.collect_unit}}/{{$t('lang.time-num')}}</template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.collect-param')"></el-table-column>
                        <el-table-column :label="$t('lang.operate')">
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
                                        @click="deleteItem(scope.row.collect_id)"
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
                :get-dataflow="getDataflow"
                :dm-id="dt_id"
                @refresh="refresh"
                @dialog-close="addVisible=false"
            ></create>
            <!-- 编辑-->
            <edit
                :dialog-visible="editVisible"
                :form-data="editForm"
                :get-dataflow="getDataflow"
                :dm-id="dt_id"
                @refresh="refresh"
                @dialog-close="editVisible=false"
            ></edit>
        </div>
    </div>
</template>

<script>
import Create from "./FrequencyCreate";
import Edit from "./FrequencyEdit";

export default {
    data() {
        return {
            searchKeyValue: "",
            tableLoading: false,
            addVisible: false,
            editVisible: false,
            editForm: {
                dataflows: []
            },
            dt_id: "",
            tableData: [
                {
                    collect_name:'123'
                }
            ],
            pageSize: 20,
            currentPage: 1,
            totalNum: 0
        };
    },
    created() {
        this.dt_id = this.$route.params.dt_id;
        // this.getList();
    },
    components: {
        create: Create,
        edit: Edit
    },
    methods: {
        //获取数据列表
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
                    this.tableLoading = false;
            });
        },
        //点击编辑
        openEdit(index) {
            this.editVisible = true;
            this.editForm = this.tableData[index];
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
        //查询
        query() {
            let param;
            if (this.searchKeyValue === "") {
                param = {};
            } else {
                param = {
                    ["collectName"]: this.searchKeyValue
                };
            }
            this.getList(param);
        },
        //获取应用数据
        getDataflow(callback) {
            let params = {
                dt_id: this.dt_id,
                isCollect: "collect"
            };
            this.$api.restfulApi.list("", params).then(res => {
                console.log(res);
                let data = [];
                res.data.forEach((item, index) => {
                    data.push({
                        label: item.df_displayname,
                        key: item.df_id
                    });
                });
                this.useData = data;
                callback(data);
            });
        },
        //刷新
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

<style lang="sass" rel="stylesheet/sass">
</style>