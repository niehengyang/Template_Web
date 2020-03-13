<template>
    <div>
        <!-- 添加dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.group-add')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="createForm"
                ref="createForm"
                :rules="formRules"
                label-position="right"
                label-width="100px"
                v-loading="loading"
                style="padding-left:100px" 
            >
                <el-form-item prop="name" :label="$t('lang.group-name')">
                    <el-input size="medium" v-model="createForm.name" :placeholder="$t('lang.hint-Gname')"></el-input>
                    <el-button plain style="font-size:13px;position:absolute;top:4px;height:36px;color:#6CAFFE;border-color:#6CAFFE;margin-left:10px;" @click="resetInName()">{{$t('lang.sync-INname')}}</el-button>
                </el-form-item>
                <el-form-item prop="device_list" :label="$t('lang.sel-device')" style="margin-top:20px;">
                    <div class="create-table">
                        <el-row class="table-row" v-loading="tableLoading">
                            <el-col :span="24">
                                <el-table
                                    :data="tableData"
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column type="selection"></el-table-column>
                                    <el-table-column prop="serialno" :label="$t('lang.device-serial')"></el-table-column>
                                    <el-table-column prop="type" :label="$t('lang.device-type')"></el-table-column>
                                    <el-table-column prop="model" :label="$t('lang.device-model')"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
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
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group">
                <el-button
                    class="white-btn"
                    size="medium"
                    @click="close"
                    :disabled="loading?true:false"
                >{{$t('lang.cancel')}}</el-button>
                <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="create"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible"],
    data() {
        return {
            visible: false,
            loading: false,
            createForm: {},
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入分组名称",
                        trigger: "blur"
                    }
                ],
                device_list:[
                    {
                        required: true,
                        message: "请选择至少一台设备",
                        trigger: "blur"
                    }
                ]
            },
            multipleSelection: [],
            tableLoading:false,
            tableData:[],
            currentPage: 1,
            totalNum: 0,
            pageSize: 20
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        }
    },
    created() {},
    components: {},
    methods: {
        //获取设备列表
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
        //添加分组
        create() {
            this.$refs["createForm"].validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.create("", this.createForm).then(res => {
                    this.$message.success("");
                    this.loading = false;
                    this.$emit("refresh");
                }).catch(err => {
                    this.loading = false
                })
            });
        },
        //重置内机名称
        resetInName(){
            if(this.multipleSelection.length==0) {
                this.$message.warning("还没有选择设备");
                return;
            }
        },
        //table多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        //关闭
        close() {
            this.resetForm("createForm");
            this.$emit("dialog-close");
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
.create-table {
    border: 1px solid rgb(228, 228, 228);
    padding: 20px;
    width: 440px;
    .table-row {
        width: 400px;
    }
    .paginate-row {
        .el-pagination__sizes {
            .el-input {
                width: 100px;
            }
        }
        .el-input {
            width: 50px;
        }
    }
}
</style>
