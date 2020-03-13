<template>
    <div>
        <!-- 编辑dialog弹窗 + form表单 -->
        <el-dialog
            class="dialog-form"
            :title="$t('lang.group-edit')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :model="editForm"
                ref="editForm"
                :rules="formRules"
                label-position="right"
                label-width="150px"
                v-loading="loading"
            >
                <el-form-item prop="name" :label="$t('lang.group-name')">
                    <el-input size="medium" v-model="editForm.name" :placeholder="$t('lang.hint-Gname')"></el-input>
                    <span style="color:#30b19b;padding-left:10px;cursor: pointer;" @click="resetInName()">{{$t('lang.sync-INname')}}</span>
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
                    @click="edit"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible", "formData"],
    data() {
        return {
            visible: false,
            loading: false,
            editForm: {},
            multipleSelection: [],
            tableLoading:false,
            tableData:[],
            currentPage: 1,
            totalNum: 0,
            pageSize: 20,
            formRules: {
                name: [
                    {
                        required: true,
                        message: this.$t('lang.hint-Gname'),
                        trigger: "blur"
                    }
                ],
                device_list:[
                    {
                        required: true,
                        message: this.$t('lang.hint-SelD'),
                        trigger: "blur"
                    }
                ]
            },
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        },
        formData: function(newVal, oldVal) {
            this.editForm = newVal;
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
        //编辑
        edit() {
            this.$refs.editForm.validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi.edit("").then(res => {
                    this.$message.success(this.$t('lang.edit-success'));
                    this.loading = false;
                    this.$emit("refresh");
                }).catch(err => {
                    this.loading = false;
                });
            });
        },
        //重置内机名称
        resetInName(){
            if(this.multipleSelection.length==0) {
                this.$message.warning(this.$t('lang.hint-SelD'));
                return;
            }
        },
        //table多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        close() {
            this.resetForm("editForm");
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

<style scoped lang="scss">
</style>
