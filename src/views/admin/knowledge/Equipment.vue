<template>
    <div>
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <bread-crumb
                    :crumb-array="[{name:$t('lang.knowledge')}, {name:$t('lang.device-data')}]"
                ></bread-crumb>
            </el-col>
            <el-col :span="12">
                <div class="btn-goup">
                    <el-button
                        type="text"
                        v-if="loginType == '0' || loginType == '1'"
                        @click="dialogAddVisible = true"
                    >{{$t('lang.upload')}}</el-button>
                    <el-button type="text" @click="downloadBat">{{$t('lang.batch-download')}}</el-button>
                    <!--                   <el-button type="text" @click="dialogAllotVisible = true">{{$t('lang.power-allot')}}</el-button>-->
                </div>
            </el-col>
        </el-row>

        <main-content>
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-btn-group">
                            <el-button type="primary" size="medium" @click="isSearch=!isSearch">
                                {{$t('lang.more-queries')}}
                                <i
                                    v-if="isSearch"
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                                <i v-if="!isSearch" class="el-icon-arrow-up el-icon--right"></i>
                            </el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="isSearch">
                <search-group @closeQuery="closeQuery" @search="search"></search-group>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="original_name" :label="$t('lang.word-name')"></el-table-column>
                        <el-table-column prop="type" :label="$t('lang.word-type')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == '2'">{{$t('lang.air-data')}}</span>
                                <span v-if="scope.row.type == '1'">{{$t('lang.internal-data')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" :label="$t('lang.upload-time')"></el-table-column>
                        <el-table-column prop="dt_id" :label="$t('lang.device-type')">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == '1'">-</span>
                                <span v-else>{{scope.row.device_type.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/download.png"
                                        :title="$t('lang.download')"
                                        @click="download(scope.row.id)"
                                    />
                                    <img
                                        src="@/assets/images/icon/edit.png"
                                        v-if="loginType == '0' || loginType == '1'"
                                        :title="$t('lang.edit')"
                                        @click="edit(scope.$index)"
                                    />
                                    <img
                                        src="@/assets/images/icon/delete.png"
                                        v-if="loginType == '0' || loginType == '1'"
                                        :title="$t('lang.delete')"
                                        @click="deleteFile(scope.row.id)"
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

            <!-- 文件上传 -->
            <el-dialog
                class="dialog-form"
                :title="$t('lang.know-upload')"
                :visible.sync="dialogAddVisible"
            >
                <upload @closeCreate="dialogClose" @create="createHandle"></upload>
            </el-dialog>

            <!-- 编辑 -->
            <el-dialog
                class="dialog-form"
                :title="$t('lang.know-edit')"
                :visible.sync="editVisible"
            >
                <edit
                    :edit-data="editData"
                    :options="options"
                    @closeEdit="editClose"
                    @handleEdit="editHandle"
                ></edit>
            </el-dialog>
            <!-- 权限分配 -->
            <el-dialog :title="$t('lang.power-allot')" :visible.sync="dialogAllotVisible">
                <Jurisdiction @closeJuris="closeJuris"></Jurisdiction>
            </el-dialog>
        </main-content>
    </div>
</template>

<script>
import SearchGroup from "./SearchGroup";
import upload from "./Upload";
import Jurisdiction from "./Jurisdiction";
import EquipEdit from "./EquipEdit";
export default {
    name: "Equipment",
    data() {
        return {
            tableData: [],
            tableLoading: false,
            isSearch: false,
            dialogAddVisible: false,
            dialogAllotVisible: false,
            editVisible: false,
            editData: "",
            allotData: [],
            //分页
            currentPage: 1,
            totalNum: 0,
            pageSize: 20,
            multipleSelection: [],
            options: [
                {
                    value: "0",
                    label: this.$t('lang.vendor'),
                    children: []
                },
                {
                    value: "1",
                    label: this.$t('lang.customer-manager'),
                    children: []
                },
                {
                    value: "2",
                    label: this.$t('lang.client'),
                    children: []
                }
            ]
        };
    },
    created() {
        this.getList();
    },
    components: {
        "search-group": SearchGroup,
        upload,
        Jurisdiction,
        edit: EquipEdit
    },
    methods: {
        //获取数据
        getList(params) {
            this.tableLoading = true;
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };

            this.$api.restfulApi
                .list("devicefile", Object.assign(baseParams, params))
                .then(res => {
                    console.log("device", res);
                    this.tableData = res.data;
                    this.tableLoading = false;
                    this.currentPage = res.meta.pagination.current_page;
                    this.totalNum = res.meta.pagination.total;
                }).catch(err => {
                    this.tableLoading = false
            })
        },
        //查询
        search(params) {
            this.getList(params);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        // 批量下载
        downloadBat() {
            //console.log(this.multipleSelection)
            if (this.multipleSelection.length == 0) {
                this.$message.error(this.$t('lang.check-document'));
                return;
            }
            let array = [];
            this.multipleSelection.forEach(item => {
                array.push(item.id);
            });
            let params = { ids: array };
            this.$api.restfulApi
                .list("devicefile/subdownloadfile", params)
                .then(res => {
                    console.log(res);
                    let url = res.base_path;
                    let btn = document.createElement("a");
                    btn.setAttribute('download','');
                    btn.setAttribute('href',url);
                    btn.click();
                    btn.remove();
                    // window.location.assign(url)
                });
        },
        //下载
        download(id) {
            console.log(id);
            this.$api.restfulApi
                .list("devicefile/downloadfile", { id: id })
                .then(res => {
                    console.log(res);
                    let url = res.base_path;
                    let btn = document.createElement("a");
                    btn.setAttribute('download',res.file_name);
                    btn.setAttribute('href',url);
                    btn.click();
                    btn.remove();
                    // window.location.assign(url)

               });
        },
        //点击编辑
        edit(index) {
            this.editVisible = true;
            this.editData = _.clone(this.tableData[index]);
            //获取权限列表
            this.options[0].children = [];
            this.options[1].children = [];
            this.options[2].children = [];
            let params = {
                type: this.editData.type,
                deviceType: this.editData.dt_id
            };
            this.$api.restfulApi
                .list("devicefile/filepermission", params)
                .then(res => {
                    console.log(res);
                    res.systemChigo.forEach(item => {
                        this.options[0].children.push({
                            value: item.id,
                            label: item.loginname
                        });
                    });
                    res.salesManager.forEach(item => {
                        this.options[1].children.push({
                            value: item.id,
                            label: item.loginname
                        });
                    });
                    res.airConUser.forEach(item => {
                        this.options[2].children.push({
                            value: item.id,
                            label: item.loginname
                        });
                    });
                });
        },
        //点击删除
        deleteFile(id) {
            console.log(id);
            this.$confirm(this.$t('lang.hint-delete'), this.$t('lang.tip'), {
                confirmButtonText: this.$t('lang.confirm'),
                cancelButtonText: this.$t('lang.cancel'),
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("devicefile", id).then(res => {
                    this.$message.success(this.$t('lang.delete-success'));
                    this.getList();
                });
            });
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
        //关闭编辑弹窗
        editClose() {
            this.editVisible = false;
        },
        editHandle() {
            this.editVisible = false;
            this.getList();
        },
        //关闭权限弹窗
        closeJuris() {
            this.dialogAllotVisible = false;
        },
        // 关闭查询
        closeQuery() {
            this.isSearch = false;
            this.getList();
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

<style scoped lang="scss">
.btn-goup {
    text-align: right;
    font-size: 18px;
    font-weight: bold;
}
</style>