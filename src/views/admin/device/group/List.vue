<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb
            :crumb-array="[{name:$t('lang.device-manage')}, {name:$t('lang.device-group')}]"
        ></bread-crumb>

        <main-content>
            <!-- 搜索、按钮行 -->
            <el-row type="flex" justify="end" class="search-row">
                <el-button type="primary" size="medium" @click="addVisible=true" class="add-btn">
                    <img src="@/assets/images/icon/add.png" />
                    {{$t('lang.group-add')}}
                </el-button>
            </el-row>

            <!-- table -->
            <el-row class="table-row">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')" fixed></el-table-column>
                        <el-table-column prop="name" :label="$t('lang.group-name')" fixed></el-table-column>
                        <el-table-column prop="create_time" :label="$t('lang.create-time')"></el-table-column>
                        <el-table-column prop="create_people" :label="$t('lang.creator')"></el-table-column>
                        <el-table-column prop="num" :label="$t('lang.device-num')"></el-table-column>
                        <el-table-column prop="describe" :label="$t('lang.group-descript')"></el-table-column>
                        <el-table-column :label="$t('lang.operate')" fixed="right">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/assign.png"
                                        :title="$t('lang.assign')"
                                         @click="openAssign(scope.row.id)"
                                    />
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
            <!-- 分组设备分配 -->
            <group-assign
                :dialog-visible="assignVisible"
                :devices-id="group_id"
                @refresh="refresh"
                @dialog-close="assignVisible=false"
            ></group-assign>
        </main-content>
    </div>
</template>

<script>
import Create from "./Create";
import Edit from "./Edit";
import Assign from "@/views/admin/device/Assign";

export default {
    data() {
        return {
            searchKey: "",
            tableData: [
                {
                    id: "1",
                    name: "分组1",
                    create_time: "2019/03/25 14:09:06",
                    create_people: "Oscar",
                    num: 50,
                    describe: ""
                }
            ],
            tableLoading: false,
            //编辑、创建
            addVisible: false,
            editVisible: false,
            editForm: {},
            group_id: "",
            //设备分配
            assignVisible:false,
            //分页
            currentPage: 1,
            totalNum: 0,
            pageSize: 20
        };
    },
    created() {},
    components: {
        create: Create,
        edit: Edit,
        "group-assign":Assign,
    },
    methods: {
        //获取分组列表
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
        //删除
        deleteItem(id) {
            this.$confirm("确定删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("", id).then(res => {
                    this.$message.success("已成功删除");
                    this.getList();
                });
            });
        },
        //点击编辑
        openEdit(index) {
            this.editVisible = true;
            this.editForm = _.clone(this.tableData[index]);
        },
        
        //分组设备分配
        openAssign(id){
            this.assignVisible=true;
            this.group_id=id;
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

<style lang="scss">
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