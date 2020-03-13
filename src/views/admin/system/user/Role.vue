<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-input-group">
                            <el-input size="medium"
                                      :placeholder="$t('lang.query-Rname')"
                                      v-model="searchKey"
                                      class="input-with-select"
                                      onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                      @blur="searchRole"
                                      @change="searchRole">
                                <i slot="suffix" class="el-input__icon el-icon-search" @click="searchRole"></i>
                            </el-input>
                        </div>
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="addRole">{{$t('lang.role-add')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                        <el-table-column prop="name" :label="$t('lang.role-name')"></el-table-column>
                        <el-table-column prop="account_num" :label="$t('lang.role-num')"></el-table-column>
                        <el-table-column prop="describe" :label="$t('lang.role-desc')"></el-table-column>
                        <el-table-column :label="$t('lang.operate')" fixed="right">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img src="@/assets/images/icon/edit.png" :title="$t('lang.edit')" @click="openEdit(scope.$index)">
                                    <img src="@/assets/images/icon/delete.png" :title="$t('lang.delete')" @click="handleDel(scope.row.id)">
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!-- 添加角色 -->
            <el-dialog class="dialog-form" :title="$t('lang.role-add')" :visible.sync="dialogAddVisible">
                <role-create @closeCreate="dialogClose" @create="createHandle"></role-create>
            </el-dialog>

            <!-- 编辑角色 -->
            <el-dialog class="dialog-form" :title="$t('lang.role-edit')" :visible.sync="dialogEditVisible">
                <role-edit :edit-data="editData" @closeEdit="closeEdit" @edit="editConfirm"></role-edit>
            </el-dialog>

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

        </div>
    </div>
</template>

<script>
    import RoleCreate from './RoleCreate'
    import RoleEdit from './RoleEdit'
    export default {
        data() {
            return {
                searchKey: '',
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                totalNumber: 0,
                dialogAddVisible: false,
                dialogEditVisible: false,
                tableLoading: false,
                editData: {}
            }
        },
        created() {
            this.initData()
        },
        components: {
            "role-create": RoleCreate,
            "role-edit": RoleEdit
        },
        methods: {
            initData(params){
                this.tableLoading = true
                let baseParams = {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
                this.$api.restfulApi.list('role', Object.assign(baseParams, params))
                    .then((response)=>{
                        console.log(response)
                        this.tableData = response.data
                        this.tableLoading = false;
                        this.currentPage = response.meta.pagination.current_page;
                        this.totalNumber = response.meta.pagination.total;
                    }).catch(err => {
                        this.tableLoading = false
                })
            },
            //搜索
            searchRole(val){
                let params = {};
                if (this.searchKey != "") {
                    params = {searchKey: this.searchKey}
                }
                this.initData(params)
            },
            //添加角色
            addRole() {
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
            // 关闭编辑弹窗
            closeEdit() {
                this.dialogEditVisible = false;
            },
            // 编辑后更新数据
            editConfirm() {
                this.dialogEditVisible = false;
                this.initData();
            },
            //编辑
            openEdit(index){
                this.dialogEditVisible = true;
                this.editData = _.clone(this.tableData[index]);
            },
            //删除
            handleDel(id){
                this.$confirm(this.$t('lang.hint-delete'), this.$t('lang.tip'), {
                    confirmButtonText: this.$t('lang.confirm'),
                    cancelButtonText: this.$t('lang.cancel'),
                    type: 'warning'
                }).then(() => {
                    this.$api.restfulApi.delete('role', id)
                        .then(()=>{
                            this.$message({
                                message: this.$t('lang.delete-success'),
                                type: 'success'
                            })
                            this.initData()
                        })
                })
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

<style lang="sass" rel="stylesheet/sass" scoped>

</style>