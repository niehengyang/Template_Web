<template>
    <div>
        <div class="main-content-box">
            <!-- 搜索、按钮行 -->
            <el-row class="search-row">
                <el-col :span="24">
                    <div class="search-row">
                        <div class="search-btn-group">
                            <el-button
                                type="primary"
                                size="medium"
                                @click="dialogAddVisible = true"
                            >{{$t('lang.version-upload')}}</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row class="table-row" v-loading="tableLoading">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="version" :label="$t('lang.version-num')"></el-table-column>
                        <el-table-column prop="name" :label="$t('lang.version-name')"></el-table-column>
                        <el-table-column prop="update" :label="$t('lang.renew-con')"></el-table-column>
                        <el-table-column :label="$t('lang.issuer')">
                            <template slot-scope="scope">{{scope.row.username}}</template>
                        </el-table-column>
                        <el-table-column prop="updated_at" :label="$t('lang.issue-time')"></el-table-column>
                        <el-table-column :label="$t('lang.operate')">
                            <template slot-scope="scope">
                                <div class="table-icon-group">
                                    <img
                                        src="@/assets/images/icon/download.png"
                                        :title="$t('lang.download')"
                                        @click="download(scope.row.id)"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <!-- 上传版本 -->
            <el-dialog
                class="dialog-form"
                :title="$t('lang.version-upload')"
                :visible.sync="dialogAddVisible"
            >
                <android-create @closeCreate="dialogClose" @create="createHandle"></android-create>
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
                        :total="totalNumber"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import AndroidCreate from "./Create";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            totalNumber: 0,
            tableLoading: false,
            dialogAddVisible: false
        };
    },
    created() {
        this.initData();
    },
    components: {
        "android-create": AndroidCreate
    },
    methods: {
        initData(id) {
            this.tableLoading = true;
            let params = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            this.$api.restfulApi.list("android", params).then(response => {
                console.log(response);
                this.tableData = response.data;
                this.tableLoading = false;
                this.currentPage = response.meta.pagination.current_page;
                this.totalNumber = response.meta.pagination.total;
            }).catch(err => {
                this.tableLoading = false
            })
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
        //下载
        download(id) {
            // console.log(id);
            this.$api.restfulApi.list('android/download', {id: id}).then(res => {
                console.log(res)
                let url = res.base_path
                let btn = document.createElement("a");
                    btn.setAttribute('download',res.file_name);
                    btn.setAttribute('href',url);
                    btn.click();
                    btn.remove();
            })
        },
        //分页操作
        handleSizeChange(val) {
            this.pageSize = val;
            this.initData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.initData();
        }
    }
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>