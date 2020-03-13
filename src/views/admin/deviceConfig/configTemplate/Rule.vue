<template>
    <div>
        <!-- 搜索、按钮行 -->
        <el-row class="search-row">
            <el-col :span="24">
                <div class="search-row">
                    <div class="search-input-group">
                        <el-input
                            size="medium"
                            :placeholder="$t('lang.hint-Aname')"
                            onkeyup="this.value=this.value.replace(/\s+/g,'')"
                            v-model="searchKey"
                            clearable
                        >
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div class="search-btn-group">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="addVisible=true"
                            class="add-btn"
                        >
                            <img src="@/assets/images/icon/add.png" />
                            {{$t('lang.alarm-add')}}
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- table -->
        <el-row class="table-row" v-loading="tableLoading">
            <el-col :span="24">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                    <el-table-column prop="alarm_name" :label="$t('lang.alarm-name')"></el-table-column>
                    <el-table-column prop="rule_condition" :label="$t('lang.alarm-condition')"></el-table-column>
                    <el-table-column
                        :label="$t('lang.grade')"
                        :filters="[{text:$t('lang.serious'),value:'0'},{text:$t('lang.matter'),value:'1'},{text:$t('lang.common'),value:'2'},{text:$t('lang.lesser'),value:'3'}]"
                        :filter-method="levelFilter"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.level == '0'">{{$t('lang.serious')}}</div>
                            <div v-if="scope.row.level == '1'">{{$t('lang.matter')}}</div>
                            <div v-if="scope.row.level == '2'">{{$t('lang.common')}}</div>
                            <div v-if="scope.row.level == '3'">{{$t('lang.lesser')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.alarm-way')">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.alarm_way" :key="index">{{item}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('lang.status')"
                        :filters="[{text:$t('lang.enable'),value:'1'},{text:$t('lang.disable'),value:'0'}]"
                        :filter-method="statusFilter"
                    >
                        <template slot-scope="scope">
                            <div
                                v-if="scope.row.status == '1'"
                                class="color-green"
                            >{{$t('lang.enable')}}</div>
                            <div v-else class="color-danger">{{$t('lang.disable')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.operate')">
                        <template slot-scope="scope">
                            <div class="table-icon-group">
                                <img
                                    v-if="scope.row.status==1"
                                    src="@/assets/images/icon/enabled.png"
                                    :title="$t('lang.disable')"
                                    @click="changeDisable(scope.row)"
                                />
                                <img
                                    v-if="scope.row.status==0"
                                    src="@/assets/images/icon/disabled.png"
                                    :title="$t('lang.enable')"
                                    @click="changeDisable(scope.row)"
                                />
                                <img
                                    src="@/assets/images/icon/edit.png"
                                    :title="$t('lang.edit')"
                                    @click="openEdit(scope.$index)"
                                />
                                <img
                                    src="@/assets/images/icon/delete.png"
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
        <create :dialog-visible="addVisible" @refresh="refresh" @dialog-close="addVisible=false"></create>
        <!-- 编辑-->
        <edit
            :dialog-visible="editVisible"
            :form-data="editForm"
            @refresh="refresh"
            @dialog-close="editVisible=false"
        ></edit>
    </div>
</template>

<script>
import Create from "./RuleCreate";
import Edit from "./RuleEdit";

export default {
    data() {
        return {
            searchKey: "",
            tableData: [
                {
                    alarm_name: "超温告警",
                    rule_condition: "主机TH1的温度超过30°",
                    level: "2",
                    alarm_way: ["短信", "邮件"],
                    status: "0"
                }
            ],
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
        create: Create,
        edit: Edit
    },
    methods: {
        //获取规则列表
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
        //停用启用
        changeDisable(item) {
            this.$confirm(
                item.status == 1
                    ? this.$t("lang.affirm-disabled")
                    : this.$t("lang.affirm-enabled"),
                this.$t("lang.tip"),
                {
                    confirmButtonText: this.$t("lang.submit"),
                    cancelButtonText: this.$t("lang.cancel"),
                    type: "warning"
                }
            ).then(() => {
                item.status =
                    item.status == 1 ? (item.status = 0) : (item.status = 1);
                this.$message.success(
                    item.status == 1
                        ? this.$t("lang.enabled-success")
                        : this.$t("lang.disabled-success")
                );
            });
        },
        //根据状态查询
        statusFilter(value, row, column) {
            return row.status === value;
        },
        //根据等级查询
        levelFilter(value, row, column) {
            return row.level === value;
        },
        //刷新table
        refresh() {
            this.addVisible = false;
            this.editVisible = false;
            this.getList();
        },
        //打开编辑
        openEdit(index) {
            this.editVisible = true;
            this.editForm = _.clone(this.tableData[index]);
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
.add-btn {
    position: relative;
    padding-left: 30px;
    img {
        position: absolute;
        left: 5px;
        height: 20px;
        width: 20px;
        top: 8px;
    }
}
</style>